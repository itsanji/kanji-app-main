const card = $("#holder");

let curNum = 1;
let front = true;
let words;
function changeLevel(level) {
  curNum = 1;
  if (level !== "Choose level") {
    fetch("json/" + level + ".json")
      .then((res) => res.json())
      .then((data) => {
        $("#word").css("display", "block");
        $(".container").css("display", "block");
        words = data;
        showCard();
      });
  }
}
const showCard = () => {
  $("#word").html(`<p>${curNum} / ${words.length}</>`);
  showTheWord(curNum, front);
};

$(".flash-card").click(() => {
  if (words[curNum].kanji !== undefined) {
    if (front) {
      $(".flash-card").css("transform", "rotateX(180deg)");
    } else {
      $(".flash-card").css("transform", "rotateX(360deg)");
    }
    front = !front;
    card.html("");
    setTimeout(() => {
      showTheWord(curNum, front);
    }, 500);
  }
});

$("#left").click(() => {
  if (curNum > 1) {
    curNum--;
  }
  $("#word").html(`<p>${curNum} / ${words.length}</>`);
  showTheWord(curNum, front);
});

$("#right").click(() => {
  if (curNum <= words.length) {
    curNum++;
  }
  $("#word").html(`<p>${curNum} / ${words.length}</>`);
  showTheWord(curNum, front);
});

function showTheWord(curNum, front) {
  if (front) {
    card.html('<p class="normal-p">' + words[curNum].kanji + "</p>");
  } else {
    card.html(`<p class="rotated-p">${words[curNum].hanViet}</p>`);
  }
}
