const card = $("#holder");

let curNum;
let front = true;
let curLevel;
let words;
function changeLevel(level) {
  curNum = 1;
  curLevel = level.split(" ")[1];
  if (level !== "Chọn cấp độ Kanji") {
    fetch("json/" + level + ".json")
      .then((res) => res.json())
      .then((data) => {
        $("#word").css("display", "block");
        $(".container").css("display", "block");
        // $("#comments").css("display", "block");
        $("#comments").fadeIn("slow");
        words = data;
        showCard();
      });
  }
}

const showCard = () => {
  $("#word").html(`<p>${curNum} / ${words.length}</>`);
  showTheWord(curNum, front);
  fetchComment(curLevel, curNum);
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
    $(".comments-container").html(
      "Loading... \n Có thể sẽ mất thời gian vào lần đầu tải"
    );
    fetchComment(curLevel, curNum);
    commentBtnFlag = true;
  } else {
    $(".comments-container").css("transform", "translate(100%)");
    commentBtnFlag = false;
  }
});

const showForm = () => {
  const commentForm = `
  <form id="post-comment-form">
  <input type="text" id="username"autocomplete="off" placeholder="Tên">
  <input type="text" id="comment" autocomplete="off" placeholder="Bình Luận">
  <input type="submit" class="btn cmt-btn" value="Bình Luận">
  <button id="back-btn" class="btn cmt-btn" onclick="goBack()"> Trở Lại </button>
  </form>
  `;
  $(".comments-container").html(commentForm);
  $("#post-comment-form").submit((e) => {
    e.preventDefault();
    postComment(curLevel, curNum, $("#username").val(), $("#comment").val());
  });
};

const goBack = () => {
  $(".comments-container").html(`Loading...`);
  fetchComment(curLevel, curNum);
};

const postComment = (curLevel, curNum, userName, comment) => {
  fetch(`https://stark-dusk-52543.herokuapp.com/api/comments/`, {
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
  }).then((res) => {
    if (res.status == 200) {
      setTimeout(fetchComment(curLevel, curNum), 3000);
    } else {
      console.log("Post Error");
    }
  });
};

const fetchComment = (curLevel, curNum) => {
  const table = $("<div id='comments-holder'></div>");
  fetch(
    `https://stark-dusk-52543.herokuapp.com/api/comments/${curLevel}/${curNum}`
  )
    .then((res) => res.json())
    .then((comments) => {
      console.log(comments);
      if (comments.length === 0) {
        $(".comments-container").html(
          `<div id="comments-holder">
          <div class="comment-box">
          <p class="user">Admin:</p>
          <p class="comment-word">Chưa có bình luận nào về chữ này. Hãy là người đầu tiên bình luận </p>
          </div>
          </div>
          <button id="post-comment" class="btn" onclick="showForm()"> Bình Luận </div>`
        );
        return;
      }

      comments.forEach((comment) => {
        table.append(`<div class="comment-box"><p class="user">${comment.user}:</p>
          <p class="comment-word">${comment.comment}</p>
          </div>`);
        $(".comments-container").html(
          `<button id="post-comment" class="btn" onclick="showForm()"> Bình Luận </div>`
        );
      });
      $(".comments-container").append(table);
    });
};
