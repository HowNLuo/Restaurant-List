const db = require('../../config/mongoose')

const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json').results

db.once('open', () => {
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