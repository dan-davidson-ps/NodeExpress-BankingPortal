const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const public = path.join(__dirname, 'public');
app.use(express.static(public))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const accountData = fs.readFileSync(
  path.join(__dirname, 'json', 'accounts.json'), 'utf8'
)

const userData = fs.readFileSync(
  path.join(__dirname, 'json', 'users.json'), 'utf8'
)

const accounts = JSON.parse(accountData)
const users = JSON.parse(userData)

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts })
})

app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking })
})

app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings })
})

app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit })
})

app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] })
})

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!')
})

