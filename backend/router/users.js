const { users } = require("../server")
const express = require("express")
const router = express.Router()

router.get("/users", (req, res) => {

    if (!users.length) {
        return res.status(400).json({
            msg: "Malumot Topilmadi",
            variant: "error",
            payload: null
        })
    }

    res.status(200).json({
        msg: "Barcha foydalanuvchilar",
        variant: "success",
        payload: users,
        total: users.length
    })

})

router.post("/users", (req, res) => {

    let existUser = users.find(user => user.username === req.body.username)
    if (existUser) {
        return res.status(400).json({
            msg: "Bunday foydalanuvchi yaratilgan",
            variant: "error",
            payload: null
        })
    }

    let newUser = {
        id: new Date().getTime(),
        fname: req.body.fname,
        username: req.body.username,
        password: req.body.password,
    }
    users.push(newUser)
    res.status(201).json({
        msg: "Foydalanuvchi yaratildi",
        variant: "success",
        payload: newUser,
    })

})

router.delete("/users/:id", (req, res) => {

    let existUser = users.findIndex(user => user.id === +req.params.id)
    if (existUser < 0) {
        return res.status(400).json({
            msg: "Bunday  foydalanuvchi topilmadi",
            variant: "error",
            payload: null
        })
    }

    users.splice(existUser, 1)
    res.status(201).json({
        msg: "Foydalanuvchi o'chirildi",
        variant: "success",
        payload: null,
    })

})

router.put("/users/:id", (req, res) => {


    let id = +req.params.id
    let userIndex = users.findIndex(user => user.id === id)
    if (userIndex < 0) {
        return res.status(400).json({
            msg: "Bunday  foydalanuvchi topilmadi",
            variant: "error",
            payload: null
        })
    }
    let newUser = {
        id: +req.params.id,
        fname: req.body.fname,
        username: req.body.username,
        password: req.body.password,
    }

    users.splice(userIndex, 1, newUser)
    res.status(200).json({
        msg: "Foydalanuvchi malumotlari o'zgartirildi",
        variant: "success",
        payload: newUser,
    })
})

module.exports = router