var express = require("express");
var router = express.Router();
var Url = require("../models/urlModel");
var QRcode = require("qrcode");
var { generateRandomHash } = require("../utils/generateRandomHash");
var _ = require("lodash");

/* http request CRUD
    - GET: get all url 
    - GET: one url
    - POST: create url
    - PUT: update url
    - DELETE: delete url
*/

// FORM for crete a urls
router.get("/", async function (req, res) {
  // render html
  res.render("form", { title: "Generate URL" });
});

// GET history all
router.get("/history", async function (req, res) {
  try {
    // query(search) the database table urls with colum short_url and parameters - :short_url
    const data = await Url.find();

    // adjust the data

    // return the data
    if (data.length > 0) {
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Success",
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

// GET one
router.get("/:short_url", async function (req, res) {
  try {
    // query
    const short_url = req.params.short_url;
    const data = await Url.findOne({
      short_url: short_url,
    });

    // adjust the data
    await Url.updateOne(
      { short_url: short_url },
      { total_visit: data.total_visit + 1 }
    );

    // return the data or redirect
    // return res.status(200).json({ data: data });
    res.status(301).redirect(data.url);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

// POST
router.post("/", function (req, res) {
  try {
    // query

    // adjust the data
    const body = req.body;
    const url = body.url;
    const short_url = generateRandomHash(8);

    var doc = new Url({
      url: url,
      short_url: short_url,
    });

    doc.save();

    // return the data
    res.render("form", { title: "Generate URL", data: doc, host: "https://shrqrcoder.herokuapp.com" });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
});

// PUT
router.put("/:short_url", function (req, res) {
  return res.status(200).json("hello world");
});

// DELETE
router.delete("/:short_url", function (req, res) {
  return res.status(200).json("hello world");
});

module.exports = router;
