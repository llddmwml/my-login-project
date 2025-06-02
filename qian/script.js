const form = document.querySelector(".login-form")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const emailError = document.getElementById("email-error")
const passwordError = document.getElementById("password-error")

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
// async function fetchLogin(email, password) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const fakeUser = {
//         email: "user@example.com",
//         password: "123456",
//       }

//       if (email === fakeUser.email && password === fakeUser.password) {
//         resolve({
//           success: true,
//           message: "登录成功！欢迎回来",
//         })
//       } else {
//         resolve({
//           success: false,
//           message: "邮箱或密码错误，请重试",
//         })
//       }
//     }, 1000)
//   })
// }

async function fetchLogin(email, password) {
  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const result = await res.json()
    return result
  } catch (err) {
    return {
      success: false,
      message: "网络错误，请稍后重试",
    }
  }

}

form.addEventListener("submit", async function (e) {
  e.preventDefault()

  let isVaild = true

  //验证邮箱
  if (!emailInput.value.trim()) {
    emailError.textContent = "邮箱不能为空"
    isVaild = false
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "邮箱格式不正确"
    isVaild = false
  } else {
    emailError.textContent = ""
  }


  //验证密码
  if (!passwordInput.value.trim()) {
    passwordError.textContent = "密码不能为空"
    isVaild = false
  } else if (passwordInput.value.trim().length < 6) {
    passwordError.textContent = "密码至少6位"
    isVaild = false
  } else {
    emailError.textContent = ""
  }

  // if (isVaild) {
  //   //验证通过，模拟提交或后续操作
  //   alert("登录成功")
  //   form.reset()
  // }

  if (!isVaild) return

  //验证通过后执行模拟fetch登录
  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()

  const result = await fetchLogin(email, password)

  if (result.success) {
    alert(result.message)
    form.reset()
    window.location.href = "http://localhost:3000/login"
  } else {
    alert(result.message)
  }

})


