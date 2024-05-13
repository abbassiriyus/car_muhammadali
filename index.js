const express = require('express')
const app = express()

const userRouter=require("./routes/usersRouter")
const carImageRouter=require("./routes/carImageRouter")
const carRouter=require("./routes/carRouter")
const categoryRouter=require("./routes/categoryRouter")
const contactRouter=require("./routes/contactRouter")
const subCategoryRouter=require("./routes/subCategoryRouter")


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


app.use('/auth/v1/',userRouter)
app.use('/api/v1/',carImageRouter)
app.use('/api/v1/',carRouter)
app.use('/api/v1/',categoryRouter)
app.use('/api/v1/',contactRouter)
app.use('/api/v1/',subCategoryRouter)




app.listen(4003, () => {
    console.log('Сервер запущен')
    console.log('server started')
  })
  




