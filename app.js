//引用套件
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//引用資源
const routes = require('./routes')
require('./config/mongoose')

//其他設定
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

//伺服器監聽器
app.listen(port, () => {
  console.log('App is running http://localhost:3000')
})