const express = require("express");
const https = require("https");
const app = express();
const port = 3000;

// 정적 파일 제공 설정
app.use(express.static("public"));
app.use(express.urlencoded())

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/quote", (req, res) => {
  const chat = req.query.chat
  console.log(chat)
  const url =
    `https://shopper-simulation-epinions-peas.trycloudflare.com/quote?chat=${chat}`;

  https
    .get(url, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        res.send(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
      res.send("An error occurred");
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
