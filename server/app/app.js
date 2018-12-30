const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routeruser=require('../route/user')
const router = require("../route/file");
const fileupload = require("express-fileupload");
const schema = require("../modules/book");
const joi = require("joi");
var session=require('express-session')
const uuidv1 = require("uuid/v1");
var cookieparser=require('cookie-parser')
var passport=require('passport')
mongoose.connect(
  "mongodb://apissss:12345naba54321@ds031867.mlab.com:31867/try",
  { useNewUrlParser: true }
);

//  To Check if the connection works fine or not
mongoose.connection.on("connected", () => {
  console.log("\x1b[36m%s\x1b[0m", "mongo has been connected...");
});
app.use(cookieparser())
app.use(session({
secret:'secret',
saveUninitialized:true,
resave:true


}))


app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', function (req, res){
  res.sendFile(__dirname + '/main.html');
});
app.post("/", (req, res) => {
  const validating = validationSchema(req.body);
  //  If the validation fails
  if (validating.error) {
    res.status(400).send(validating.error.details[0].message);
  } else {
    var pdf = req.files.pdf;
    var name = pdf.name;
    var FileUud = uuidv1();
    var Filepath = "./upfile/" + FileUud + name;
    var pdfdb = FileUud + name;
    pdf.mv(Filepath);
    var img = req.files.img;
    var name1 = img.name;
    var bookImgUud = uuidv1();
    var bookImgPath = "./upimg/" + bookImgUud + name1;
    var imgdb = bookImgUud + name1;
    img.mv(bookImgPath);

    new schema({
      bookname: req.body.bookname,
      author: req.body.author,
      year: req.body.year,
      pages: req.body.pages,
      language: req.body.language,
      fileSize: req.body.fileSize,
      fileFormat: req.body.fileFormat,
      img: imgdb,
      pdf: pdfdb,
      description: req.body.description,
      publishAt: req.body.publishAt
    })
      .save()
      .then(result => {
        console.log(
          result
        );

        
        res.redirect('http://localhost:1234/');
      })
      .catch(err => {
        res.status(400).send(err.message);
      });
  }
});

app.use(express.static("./upimg"));
app.use(express.static("./upfile"));
app.use('/api/user',routeruser)
app.use('/book',router)
function validationSchema(result) {
  var schema = joi.object().keys({
    bookname: joi.string(),
    author: joi.string(),
    year: joi.number(),
    pages: joi.number(),
    language: joi.string(),
    fileSize: joi.string(),
    fileFormat: joi.string(),
    img: joi.string(),
    pdf: joi.string(),
    description: joi.string(),
    publishAt: joi.string()
  });
  return joi.validate(result, schema);
}

port =  process.env.PORT || 7000;
app.listen(port, () =>
  console.log(`the server connect on http://localhost:${port}`)
);

module.exports = app;
