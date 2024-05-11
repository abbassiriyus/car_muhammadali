const express = require('express')
const app = express()



const cors = require('cors')
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
app.use(fileUpload())
app.use(bodyParser.json());
app.use(express.static('./uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors({origin: '*'}))







app.listen(4003, () => {
    console.log('Сервер запущен')
    console.log('server started')
  })
  




