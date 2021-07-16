const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const db = mongoose.connection

const Restaurant = require('./models/restaurant')


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

//瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//接收新增餐廳資料
app.post('/restaurants', (req, res) => {
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
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', restaurant))
    .catch((error) => console.error(error))
})

//接收編輯餐廳資料
app.post('/restaurants/:id/edit', (req, res) => {
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
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.error(error))
})

//刪除特定餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

//伺服器監聽器
app.listen(port, () => {
  console.log('App is running http://localhost:3000')
})