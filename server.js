const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const storage = multer.memoryStorage();
var upload = multer({ storage: storage });
var type = upload.single('upl');

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', type, async function (req, res) {
   let blob = new Blob([req.file.buffer], {type: "video/webm"});
  
    console.log(blob);

    const buffer = Buffer.from(await blob.arrayBuffer());

    fs.writeFile("video.webm", buffer, () => console.log("video saved"));

    res.redirect("/");
});

app.listen(3000, () => {
    console.log("server listening on port 3000");
});