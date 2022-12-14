window.onload = () => {
  handleAuthorization();
  handletapmenu();
};

async function handleAuthorization() {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  const nickname = document.getElementById("nickname");
  nickname.innerText = payload_parse.nickname;
  const response = await fetch(`http://127.0.0.1:8000/users/profile/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });

  const response_json = await response.json();

  const bio = document.getElementById("bio");
  const mbti = document.getElementById("mbti");
  const profile_img = document.getElementById("profile_img");

  bio.innerText = response_json.bio;
  mbti.innerText = response_json.mbti;
  profile_img.src = "http://127.0.0.1:8000" + response_json.profile_img;

  const movies = document.getElementById("item");
  response_json.movie_set.forEach((movie) => {
    const movie_set = document.createElement("div");
    movies.appendChild(movie_set);

    const title = document.createElement("h5");
    title.classList.add("movie_title");
    title.innerText = movie.title;
    movie_set.appendChild(title);

    const poster = document.createElement("img");
    poster.src = movie.poster;
    poster.classList.add("rec_movie");
    movie_set.appendChild(poster);

    const like_button = document.createElement("button");
    like_button.style.border = 0;
    like_button.style.background = "none";
    movie_set.appendChild(like_button);

    const like = document.createElement("img");
    like.style.width = "20px";
    like.classList.add("heart");
    like.style.margin = "auto";
    like.src = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png";
    like_button.onclick = function () {
      fetch(`http://127.0.0.1:8000/movies/${movie.movie_id}/likes/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: {},
      });
      window.location.reload();
    };
    like_button.appendChild(like);
  });

  const onerror = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
  const follow = document.getElementById("tab4");
  const wrap = document.createElement("div");
  wrap.style.display = "flex";
  wrap.style.justifyContent = "space-evenly";
  wrap.style.margin = "auto";
  wrap.style.width = "90%";
  follow.appendChild(wrap);

  const left = document.getElementById("left");
  const right = document.getElementById("right");
  response_json.followings.forEach((following) => {
    // ????????? ?????? ????????? ??????

    const person = document.createElement("div");
    person.classList.add("person");
    left.appendChild(person);

    person.innerHTML = `<img style="width:7%;" src="http://127.0.0.1:8000${following.profile_img}" onerror="this.src='${onerror}'" >`;

    const name = document.createElement("p");
    name.innerText = following.nickname;
    person.appendChild(name);

    const mbti = document.createElement("p");
    mbti.innerText = `(${following.mbti})`;
    person.appendChild(mbti);

    const button = document.createElement("button");
    button.style.height = "80%";
    button.style.margin = "auto";
    button.style.width = "25%";
    button.innerText = "??????";
    button.onclick = function () {
      const id = following.id;
      fetch(`http://127.0.0.1:8000/users/follow/${id}/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: {},
      });
      alert("????????????!");
      window.location.reload();
    };
    person.appendChild(button);
  });

  response_json.followers.forEach((follower) => {
    // ????????? ????????? ??????

    const person = document.createElement("div");
    person.classList.add("person");
    right.appendChild(person);

    const image = document.createElement("img");
    image.style.width = "7%";
    image.src = "http://127.0.0.1:8000" + follower.profile_img;
    person.appendChild(image);
    person.innerHTML = `<img src="http://127.0.0.1:8000/${follower.profile_img}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/847/847969.png'" style="width:7%">`;

    const name = document.createElement("p");
    name.innerText = follower.nickname;
    person.appendChild(name);

    const mbti = document.createElement("p");
    mbti.innerText = `(${follower.mbti})`;
    person.appendChild(mbti);
  });

  //?????? ??? ????????? ??????
  const articles = document.getElementById("tab2");

  response_json.article_set.forEach((article) => {
    const article_box = document.createElement("div");
    article_box.classList.add("article_box");
    article_box.onclick = function () {
      const id = article.id;
      fetch(`http://127.0.0.1:8000/articles/${id}/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
        body: {},
      });
      to_article_detail(id);
    };
    articles.appendChild(article_box);
    articles.classList.add("link");

    const article_title = document.createElement("h5");
    article_title.innerText = article.title;
    article_box.appendChild(article_title);

    const article_content = document.createElement("p");
    article_content.innerText = article.content;
    article_box.appendChild(article_content);
  });

  //?????? ??? ????????? ??????
  const comments = document.getElementById("tab3");

  response_json.comment_set.forEach((comment) => {
    const comment_box = document.createElement("div");
    comment_box.classList.add("comment_box");
    comments.appendChild(comment_box);

    const article_link = document.createElement("a");
    article_link.href = "#";
    article_link.classList.add("link");
    article_link.onclick = function () {
      const id = comment.article;
      fetch(`http://127.0.0.1:8000/articles/${id}/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
        body: {},
      });
      to_article_detail(id);
    };
    comment_box.appendChild(article_link);

    const comment_content = document.createElement("p");
    comment_content.innerText = comment.content;
    article_link.appendChild(comment_content);
  });
}

async function handletapmenu() {
  const tabList = document.querySelectorAll(".tab_menu .list li");
  const contents = document.querySelectorAll(".tab_menu .cont_area .cont");
  let activeCont = ""; // ?????? ????????? ??? ????????? (??????:#tab1 ?????????)

  for (var i = 0; i < tabList.length; i++) {
    tabList[i].querySelector(".btn").addEventListener("click", function (e) {
      e.preventDefault();
      for (var j = 0; j < tabList.length; j++) {
        // ????????? ?????? ????????? ??????
        tabList[j].classList.remove("is_on");

        // ????????? ????????? display:none ??????
        contents[j].style.display = "none";
      }

      // ?????? ?????? ?????????
      this.parentNode.classList.add("is_on");

      // ?????? ????????? ????????? ??????
      activeCont = this.getAttribute("href");
      document.querySelector(activeCont).style.display = "block";
    });
  }
}

function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  alert("??????????????? ?????????????????????.");
}
