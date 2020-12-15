const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const cors = require('cors')

const sequelize = new Sequelize('sequelize_tests', 'app1', 'welcome123', {
  dialect: 'mysql'
})

const Plane = sequelize.define('plane', {
  maker: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 10]
    }
  },
  series: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 5]
    }
  },
  type: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['SMALL', 'MEDIUM', 'LARGE']
  },
  mass: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 50
    }
  },
  speed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 100
    }
  }
})

const CrewMember = sequelize.define('crewMember', {
  name : {    
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 10]
    }
  },
  role: {
    type: Sequelize.ENUM,
    allowNull: false,
    values: ['PILOT', 'COPILOT', 'NAVIGATOR']
  }
})

Plane.hasMany(CrewMember)

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true })
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

app.get('/planes', async (req, res, next) => {
  let pageSize = 10
  const query = {
    where: {}
  }

  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
  }

  if (req.query.filter) {
    query.where.maker = {
      [Op.like]: `%${req.query.filter}%`
    }
  }

  if (req.query.page) {
    query.offset = pageSize * parseInt(req.query.page)
    query.limit = pageSize
  }

  try {
    const planes = await Plane.findAll(query)
    res.status(200).json(planes)
  } catch (err) {
    next(err)
  }
})

app.post('/planes', async (req, res, next) => {
  try {
    await Plane.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (err) {
    next(err)
  }
})

app.get('/planes/:pid', async (req, res, next) => {
  try {
    const plane = await Plane.findByPk(req.params.pid)
    if (plane) {
      res.status(200).json(plane)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.put('/planes/:pid', async (req, res, next) => {
  try {
    const plane = await Plane.findByPk(req.params.pid)
    if (plane) {
      await plane.update(req.body)
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.delete('/planes/:pid', async (req, res, next) => {
  try {
    const plane = await Plane.findByPk(req.params.pid)
    if (plane) {
      await plane.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/planes/:pid/crew-members', async (req, res, next) => {
  try {
    const plane = await Plane.findByPk(req.params.pid, {
      include: [CrewMember]
    })
    if (plane) {
      res.status(200).json(plane.crewMembers)
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.post('/planes/:pid/crew-members', async (req, res, next) => {
  try {
    const plane = await Plane.findByPk(req.params.pid)
    if (plane) {
      const crewMember = new CrewMember(req.body)
      crewMember.planeId = plane.id
      await crewMember.save()
      res.status(201).json({ message: 'created' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  }
})

app.get('/planes/:pid/crew-members/:cmid', async (req, res, next) => {
  try {
    const plane = await Plane.findByPk(req.params.pid)
    if (plane) {
      const crewMembers = await plane.getCrewMembers({ id: req.params.cmid })
      const crewMember = crewMembers.shift()
      if (crewMember) {
        res.status(200).json(crewMember)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  } 
})

app.put('/planes/:pid/crew-members/:cmid', async (req, res, next) => {
  try {
    const plane = await Plane.findByPk(req.params.pid)
    if (plane) {
      const crewMembers = await plane.getCrewMembers({ id: req.params.cmid })
      const crewMember = crewMembers.shift()
      if (crewMember) {
        await crewMember.update(req.body)
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  } 
})

app.delete('/planes/:pid/crew-members/:cmid', async (req, res, next) => {
  try {
    const plane = await Plane.findByPk(req.params.pid)
    if (plane) {
      const crewMembers = await plane.getCrewMembers({ id: req.params.cmid })
      const crewMember = crewMembers.shift()
      if (crewMember) {
        await crewMember.destroy()
        res.status(202).json({ message: 'accepted' })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (err) {
    next(err)
  } 
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).json({ message: 'server error' })
})

app.listen(8080)