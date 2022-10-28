var express = require('express');
var router = express.Router();
var Url = require('../models/urlModel');
var QRcode = require('qrcode');
var make = require('../models/makeid');
var _ = require('lodash');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/shorturl/', function(req, res, next) {

  let q = Url.where({domain: req.body.domain})
  q.findOne((err,data) => {
    if (data) {
      res.render('index',{short:data.short_url})
      
    } else {
      var doc = new Url(req.body)      
      doc.short_url = make.makeid(7)
      QRcode.toFile('public/images/'+ doc.short_url +'.png','http://localhost:3000/'+doc.short_url,(err) => {
        if (err) console.log(err)
      })
      doc.save((err, data) => {
       if(err) console.log(err);
       res.render('index',{short:doc.short_url})
      })
    }
  })  
 })


// router.get('/:short_url', function (req, res, next) {
//   let q = Url.where({short_url: req.params.short_url})
//   q.findOne((err,data) => {
//     if (data) res.redirect(data.domain)
//   })
// });


module.exports = router;



