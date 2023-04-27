const JWT = require('./JWT')

function checkToken(req, res, next) {
    if (req.url.includes('/admin')) {
        // 如果还未登录，或者是重置密码请求，不用处理
        if (req.url === '/admin/user/login' || req.url === '/admin/resetPass' || req.url === '/admin/sendEmail') {
            next()
            return
        }

        // 已经登录，获取token
        const token = req.headers['authorization'].split(' ')[1]

        if (token) {
            const origin = JWT.verify(token)
            if (!origin) {
                // token过期
                res.status(401).send({ errCode: '-1', errorInfo: 'token过期' })
            } else {
                // token未过期
                // 生成新token
                const newToken = JWT.generate(
                    {
                        id: origin.id,
                        number: origin.number,
                        role: origin.role,
                    },
                    '1h'
                )

                // 1.如果是路由跳转
                if (req.url === '/admin/checkToken') {
                    res.status(200).header('Authorization', newToken).send({ message: 'token有效' })
                    next()
                    return
                }

                // 2.普通网络请求
                res.header('Authorization', newToken)
                next()
            }
        }
    } else {
        next()
    }
}

module.exports = checkToken
