const nodemailer = require('nodemailer')
const crypto = require('crypto')

// 3096690147@qq.com
// rawbyjhnyiqddfag

// 1832697406@qq.com
// xqceatjsbfbfejcc

// ankh3096690147@163.com
// IFOEMXTDVSLFMMST

const user = '1832697406@qq.com'
const pass = 'xqceatjsbfbfejcc'

// 创建可重用的SMTP传输对象
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
        user,
        pass,
    },
})

// 生成随机验证码
const generateVerificationCode = () => {
    return crypto.randomBytes(3).toString('hex').toUpperCase()
}

// 发送电子邮件
const sendVerificationCodeEmail = (recipientEmail, rightAuthCode) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: user,
            to: recipientEmail,
            subject: '重置密码验证码',
            text: `您的验证码是: ${rightAuthCode}`,
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info.response)
            }
        })
    })
}

module.exports = {
    generateVerificationCode,
    sendVerificationCodeEmail,
}
