require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

app.get(/(.*)/, (req, res) => {
  const uri = req.params[0] === "/" ? "/index.html" : req.params[0];
  res.sendFile(path.join(getPublicPath(uri)), err => {
    if (!err) {
      console.log(`200 🐑 ${uri}:`);
    } else {
      console.log(`${err.status} 🐐 ${uri}: ${err.message}`);
    }
  });
});
app.listen({ port: process.env.PORT }, () => {
  console.log(`🎲 Happy gaming! http://localhost:${process.env.PORT}`);
});

function getPublicPath(fileName) {
  return path.join(`${__dirname}/../dist/${fileName}`);
}
