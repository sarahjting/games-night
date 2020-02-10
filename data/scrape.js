const http = require("http");
const fs = require("fs");
const games = require("./json/games.json");

let count = 0;
for (i in games) {
  const imageUrl = games[i].imageUrl
    ? games[i].imageUrl.replace("https", "http")
    : "http://cf.geekdo-images.com/micro/img/QZDNfKAPYlXkZg265NxdjgShBXY=/fit-in/64x64/pic1657689.jpg";
  const file = fs.createWriteStream(`./dist/img/${Number(i) + 1}.jpg`);
  http.get(imageUrl, function(response) {
    response.pipe(file);
    console.log(`${count++} images saved`);
  });
}

// const games = [];
// try {
//     for (let i = 1; i <= 100; i++) {
//         const data = await fetch(`https://boardgamegeek.com/browse/boardgame/page/${i}`);
//         const parsedData = await data.text();
//         for(let j = 1; j <= 100; j++) {
//             const name = jQuery(`#results_objectname${j} a`, parsedData).text();
//             const url = jQuery(`#results_objectname${j} a`, parsedData).attr('href');
//             const imageUrl = jQuery('img', jQuery(`.collection_thumbnail`, parsedData)[j-1]).attr('src');
//             games.push({name, url, imageUrl});
//         }
//         console.log(`page ${i} loaded`);
//     }
// } catch(e) {
//     console.log("ERROR", e);
// }
