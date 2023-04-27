var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const UserRouter = require('./routes/admin/UserRouter')
const EquipmentRouter = require('./routes/admin/EquipmentRouter')
const WebEquipmentRouter = require('./routes/web/EquipmentRouter')
const checkToken = require('./utils/checkToken')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// /admin: 后台管理接口
// /web: 前台页面接口

// 全局中间件，验证token是否过期
app.use(checkToken)

// 后台
app.use(UserRouter)
app.use(EquipmentRouter)
// 前台
app.use(WebEquipmentRouter)

// 全局中间件，在跳转路由时检查token是否过期
app.use('/admin/checkToken', () => {})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
