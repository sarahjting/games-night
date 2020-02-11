const http = require("http");
const fs = require("fs");
const images = require("./json/images.json");

let count = 0;
for (i of images) {
  const file = fs.createWriteStream(
    `./public/img/games/${Number(i.id) + 1}.jpg`
  );
  http.get(i.imageUrl.replace("https", "http"), function(response, err) {
    response.pipe(file);
    console.log(`${count++} images saved`);
  });
}

// const imageUrls = [];
// try {
//   for (let i = 1; i <= 1000; i++) {
//     const data = await fetch(`https://boardgamegeek.com${games[i].url}`);
//     const parsedData = await data.text();
//     const imageUrl = jQuery(`.game-header-image img`, parsedData).attr("src");
//     imageUrls.push({ id: i, imageUrl });
//     console.log(`image ${i} loaded`);
//   }
// } catch (e) {
//   console.log("ERROR", e);
// }
