const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const fakeUser = {
  email: "user@example.com",
  password: "123456",
}

app.post("/login", (req, res) => {
  const { email, password } = req.body

  if (email === fakeUser.email && password === fakeUser.password) {
    return res.json({ success: true, message: "登录成功" })
  }

  return res.json({ success: false, message: "邮箱或密码错误" })
})

app.listen(PORT, () => {
  console.log(`API server is running at http://localhost:${ PORT }`)
})