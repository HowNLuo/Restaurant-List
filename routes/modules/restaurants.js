const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//接收新增餐廳資料
router.post('/', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  return Restaurant.create({ name, category, location, phone, description, image })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

//編輯餐廳頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', restaurant))
    .catch((error) => console.error(error))
})

//接收編輯餐廳資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const location = req.body.location
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

//瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.error(error))
})

//刪除特定餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

module.exports = router