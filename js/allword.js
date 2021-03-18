let words;
let numberOfPage = 0;
let curPageNumber = 1;
const pageNav = $("#page-nav");
let lastClicked;

const changeLevel = (level) => {
  if (level !== "Chọn cấp độ Kanji") {
    $("#grid-container").html("");
    fetch(`json/${level}.json`)
      .then((res) => res.json())
      .then((data) => {
        // Reseting the global variable
        lastClicked = 1;
        numberOfPage = 0;
        curPageNumber = 1;
        start(data);
      });
  }
};

const showTheWord = (curPageNumber, words) => {
  $("#grid-container").html("");
  for (let i = (curPageNumber - 1) * 50 + 1; i <= curPageNumber * 50; i++) {
    if (i === words.length) break;
    $("#grid-container").append(
      `<div class='inside'><div class="right-after-inside"> <div>${words[i].kanji}</div><div>${words[i].hanViet}</div></div></div>`
    );
  }
  $("html, body").animate(
    {
      scrollTop: $("#grid-container").offset().top - 70,
    },
    "slow"
  );
};

const start = (words) => {
  numberOfPage = Math.round(words.length / 50);

  showTheWord(curPageNumber, words);

  pageNavInner = `<div class="nav-btn"><</div>`;
  for (i = 0; i < numberOfPage; i++) {
    pageNavInner += `<div class="nav-btn" id="btn-${i + 1}">${i + 1}</div>`;
  }
  pageNavInner += `<div class="nav-btn">></div>`;
  // Clear pageNav to prevent append issue
  pageNav.html("");
  pageNav.append(pageNavInner);
  changeColor(curPageNumber, lastClicked);

  $(".nav-btn").click(function () {
    let clicked = $(this).text();
    switch (clicked) {
      case "<":
        if (curPageNumber === 1) {
          break;
        }
        lastClicked = curPageNumber;
        curPageNumber--;

        showTheWord(curPageNumber, words);
        changeColor(curPageNumber, lastClicked);
        lastClicked = curPageNumber;
        break;
      case ">":
        if (curPageNumber === numberOfPage) {
          break;
        }
        lastClicked = curPageNumber;
        curPageNumber++;
        showTheWord(curPageNumber, words);

        changeColor(curPageNumber, lastClicked);
        lastClicked = curPageNumber;
        break;

      default:
        if ("123456789".includes(clicked)) {
          curPageNumber = Number(clicked);
          showTheWord(curPageNumber, words);
          changeColor(curPageNumber, lastClicked);
          lastClicked = clicked;
        }
        break;
    }
  });
};
const changeColor = (curPageNumber, lastClicked) => {
  $(`#btn-${lastClicked}`).removeClass("current-page");
  $(`#btn-${curPageNumber}`).addClass("current-page");
};
