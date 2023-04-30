const nodemailer = require('nodemailer')
const crypto = require('crypto')
const SMTPModel = require('../models/SMTPModel')

let user
let pass
let transporter

const getEmail = async () => {
    const result = await SMTPModel.findOne({ where: { current: 1 } })
    return result
}

// 调用 getEmail 函数，获取 email 值
const saveEmail = async () => {
    const email = await getEmail()
    user = email.user
    pass = email.pass
    // 创建可重用的SMTP传输对象
    transporter = nodemailer.createTransport({
        host: email.host,
        port: email.port,
        secure: true,
        auth: {
            user: email.user,
            pass: email.pass,
        },
    })
}

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
                console.log(error)
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
    saveEmail,
}
