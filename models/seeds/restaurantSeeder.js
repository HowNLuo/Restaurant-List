const mongoose = require('mongoose')
const db = mongoose.connection

const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')

  restaurantList.forEach((restaurant) => {
    Restaurant.create({
      name: restaurant.name,
      category: restaurant.category,
      location: restaurant.location,
      phone: restaurant.phone,
      description: restaurant.description,
      image: restaurant.image
    })
  })
  console.log('done.')
})