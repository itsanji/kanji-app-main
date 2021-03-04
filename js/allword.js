let words;
let numberOfPage = 0;
const changeLevel = async (level) => {
  if (level !== "Chọn cấp độ Kanji") {
    $("#grid-container").html("");
    let curPageNumber = 1;
    res = await fetch(`json/${level}.json`);
    data = await res.json();
    words = data;

    numberOfPage = Math.round(words.length / 50);

    for (let i = curPageNumber * 1; i <= curPageNumber * 50; i++) {
      $("#grid-container").append(
        `<div class='inside'><div class="right-after-inside"> <div>${words[i].kanji}</div><div>${words[i].hanViet}</div></div></div>`
      );
    }
  }
};
