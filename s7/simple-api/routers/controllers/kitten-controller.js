
// /kittens?filter=abc&pageSize=10&pageNo=5
const getKittens = (req, res) => {
  let results = res.app.locals.kittens
  if (req.query.filter) {
    results = results.filter(e => e.name.indexOf(req.query.filter) !== -1)
  }
  let pageSize = 10
  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
  }
  if (req.query.pageNo) {
    let pageNo = parseInt(req.query.pageNo)
    // [start..finish)
    results = results.slice(pageSize * pageNo, pageSize * (pageNo + 1))
  }
  res.status(200).json(results)
}

const addKitten = (req, res) => {
  const id = parseInt(req.body.id)
  if (isNaN(id)) {
    res.status(400).json({ message: 'id was not a number' })
  } else {
    const existingKitten = res.app.locals.kittens.find(e => e.id === id)
    if (existingKitten) {
      res.status(400).json({ message: 'cannot add existing kitten' })
    } else {
      const kitten = {
        id: id,
        name : req.body.name,
        color: req.body.color,
        weight: parseInt(req.body.weight)
      }
      res.app.locals.kittens.push(kitten)
      res.status(201).json({ message: 'created' })
    }
  }
}

const getKitten = (req, res) => {
  const kitten = res.app.locals.kittens.find(e => e.id === parseInt(req.params.id))
  if (kitten) {
    res.status(200).json(kitten)
  } else {
    res.status(404).json({ message: 'not found' })
  }
}
const updateKitten = (req, res) => {
  const kittenIndex = res.app.locals.kittens.findIndex(e => e.id === parseInt(req.params.id))
  if (kittenIndex !== -1) {
    res.app.locals.kittens[kittenIndex].name = req.body.name
    res.app.locals.kittens[kittenIndex].color = req.body.color
    res.app.locals.kittens[kittenIndex].weight = req.body.weight
    res.status(202).json({ message: 'accepted' })
  } else {
    res.status(404).json({ message: 'not found' })
  }
}

const deleteKitten = (req, res) => {
  const kittenIndex = res.app.locals.kittens.findIndex(e => e.id === parseInt(req.params.id))
  if (kittenIndex !== -1) {
    res.app.locals.kittens.splice(kittenIndex, 1)
    res.status(202).json({ message: 'accepted' })
  } else {
    res.status(404).json({ message: 'not found' })
  }
}

module.exports = {
  getKittens,
  addKitten,
  getKitten,
  updateKitten,
  deleteKitten
}