const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.get('/weather', async (req, res) => {
  try {
    const response = await fetch('http://www.meteoromania.ro/wp-json/meteoapi/v2/starea-vremii')
    const responseContent = await response.json()
    if (req.query && req.query.city) {
      const result = responseContent.features.find(e => e.properties.nume.indexOf(req.query.city.toUpperCase()) !== -1)
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'not found' })
      }
    } else {
      res.status(200).json(responseContent)
    }
  } catch (err) {
    console.warn(err)
    res.status(500).json({ message: 'we had a problem' })
  }
})

app.listen(8080)