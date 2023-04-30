const JWT = require('./JWT')

// 不需要重新生成token的情况
const noTokenCheck = ['/admin/user/login', '/admin/resetPass', '/admin/sendEmail', '/web/user/login', '/web/sendEmail']

function checkToken(req, res, next) {
    // 不需要重新生成token
    if (noTokenCheck.includes(req.url)) {
        next()
        return
    }

    if (req.url.includes('/admin')) {
        // 已经登录，获取token
        const token = req.headers['authorization'].split(' ')[1]

        if (token) {
            const origin = JWT.verify(token)
            if (!origin) {
                // token过期
                res.status(401).send({ errCode: -1, errorInfo: 'token过期' })
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
        // 已经登录，获取token
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(' ')[1]
            if (token) {
                const origin = JWT.verify(token)
                if (!origin) {
                    // token过期
                    req.customData = {
                        code: -1,
                        message: 'token过期',
                    }
                    next()
                } else {
                    // token未过期
                    req.customData = {
                        code: 1,
                        message: 'token未过期',
                    }
                    // 生成新token
                    const newToken = JWT.generate(
                        {
                            id: origin.id,
                            number: origin.number,
                            role: origin.role,
                        },
                        '1h'
                    )
                    res.header('Authorization', newToken)
                    next()
                }
            }
        } else {
            // 未登录
            req.customData = {
                code: -1,
                message: 'token过期',
            }
            next()
        }
    }
}

module.exports = checkToken
