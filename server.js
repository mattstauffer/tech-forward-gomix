// init project
const dotenv = require('dotenv')
dotenv.load()

const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');

app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const index = require('./src/controller/index')

app.get('/', index.index)

app.get('/add', function (request, response) {
  response.sendFile(__dirname + '/views/add-forms.html')
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
