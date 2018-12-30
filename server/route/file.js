const express = require("express");
const router = express.Router();

const schema = require("../modules/book");
const joi = require("joi");
const uuidv1 = require("uuid/v1");

router.get("/", (req, res) => {
  schema
    .find()
    .exec()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  schema
    .findById(id)
    .exec()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).send(err.message);
    });
});


router.delete("/:id", (req, res) => {
  schema
    .findOneAndRemove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(404).send(err.message);
    });
});


router.put("/:id", (req, res) => {
  const validating = validationSchema(req.body);
  //  If the validation fails
  if (validating.error) {
    res.status(400).send(validating.error.details[0].message);
  } else {
    var pdf = req.files.pdf;
    console.log("pdf:",pdf);
    
    var name = pdf.name;
    var FileUud = uuidv1();
    var Filepath = "./upfile/" + FileUud + name;
    var pdfdb = FileUud + name;
    pdf.mv(Filepath);
    var img = req.files.img;
    var name = img.name;
    var bookImgUud = uuidv1();
    var bookImgPath = "./upimg/" + bookImgUud + name;
    var imgdb = bookImgUud + name;
    img.mv(bookImgPath);

    schema
      .updateOne(
        { _id: req.params.id },
        {
          $set: {
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
          }
        }
      )
      .exec()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.status(400).send(err.message);
      });
  }
});
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

module.exports = router;
