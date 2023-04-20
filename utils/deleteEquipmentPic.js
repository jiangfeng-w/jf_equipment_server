// 删除头像
const fs = require('fs')
const path = require('path')

const deleteAvatar = avatarURL => {
    const filename = avatarURL.substring(avatarURL.lastIndexOf('/') + 1)
    const filePath = path.join(__dirname, '../public/images/equipmentPics/', filename).replace(/\//g, '\\')
    fs.unlink(filePath, err => {
        if (err) throw err
        // console.log('删除成功')
    })
}

module.exports = deleteAvatar
