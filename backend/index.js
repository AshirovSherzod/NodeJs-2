const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const Users = require("./router/users")
app.use("/", Users)


const PORT = 8000
app.listen(PORT, () => console.log(`${PORT} is listening`))