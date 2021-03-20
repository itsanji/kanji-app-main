const card = $("#holder");

let curNum;
let front = true;
let curLevel;
let words;
function changeLevel(level) {
  curNum = 1;
  curLevel = level.split(" ")[1];
  console.log(curLevel);
  if (level !== "Chọn cấp độ Kanji") {
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

let commentBtnFlag = false;
$("#comments").click(() => {
  if (!commentBtnFlag) {
    $(".comments-container").css("transform", "translate(0%)");
    if (!curNum || !curLevel) {
      $(".comments-container").html("Choose a level or a word first");
    } else {
      $(".comments-container").html("Loading...");
      fetchComment(curLevel, curNum);
    }
    commentBtnFlag = true;
  } else {
    $(".comments-container").css("transform", "translate(100%)");
    commentBtnFlag = false;
  }
});

const fetchComment = (curLevel, curNum) => {
  const table = $("<div></div>");
  fetch(`http://localhost:5000/api/comments/${curLevel}/${curNum}`)
    .then((res) => res.json())
    .then((comments) => {
      console.log(comments);
      comments.forEach((comment) => {
        table.append(`<p id="user">${comment.user}:
          ${comment.comment}
        </p>`);
      });
      $(".comments-container").html(
        `<button id="post-comment" onclick="showForm()">Post Comment</div>`
      );
      $(".comments-container").append(table);
    });
};
const showForm = () => {
  $(".comments-container").html(`
      <form id="post-comment-form">
        <input type="text" id="username"placeholder="UserName">
        <input type="text" id="comment"placeholder="Comment">
        <input type="submit" value="Comment">
      </form>
    `);
  $("#post-comment-form").submit((e) => {
    e.preventDefault();
    postComment(curLevel, curNum, $("#username").val(), $("#comment").val());
  });
};

const postComment = (curLevel, curNum, userName, comment) => {
  console.log("I am called");
  fetch(`http://localhost:5000/api/comments/`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName,
      level: curLevel,
      curNum: curNum,
      comment: comment,
    }),
  })
    .then((res) => res.text())
    .then((text) => console.log(text));
};
