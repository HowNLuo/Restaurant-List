const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//瀏覽全部餐廳
router.get('/', (req, res) => {
  const sort = req.query.sort
  Restaurant.find()
    .lean()
    .sort({ name: sort })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

//搜尋功能
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  Restaurant.find()
    .lean()
    .then((restaurantList) => {
      const restaurants = restaurantList.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(keyword.toLowerCase())
      )
      res.render('index', { restaurants })
    })
    .catch((error) => console.error(error))
})

module.exports = router