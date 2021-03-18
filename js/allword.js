let words;
let numberOfPage = 0;
let curPageNumber = 1;
const changeLevel = (level) => {
  if (level !== "Chọn cấp độ Kanji") {
    $("#grid-container").html("");
    fetch(`json/${level}.json`)
      .then((res) => res.json())
      .then((data) => callback(data));
  }
};

const callback = (words) => {
  numberOfPage = Math.round(words.length / 50);

  for (let i = curPageNumber * 1; i <= curPageNumber * 50; i++) {
    $("#grid-container").append(
      `<div class='inside'><div class="right-after-inside"> <div>${words[i].kanji}</div><div>${words[i].hanViet}</div></div></div>`
    );
  }
};
