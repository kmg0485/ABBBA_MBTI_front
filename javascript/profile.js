window.onload = () => {
  handleAuthorization();
  handletapmenu();
};

async function handleAuthorization() {
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload);
  const nickname = document.getElementById("nickname");
  //   const nickname = payload_parse.nickname;
  const user = payload_parse.user_id;
  nickname.innerText = payload_parse.nickname;
  const response = await fetch(`http://127.0.0.1:8000/users/${user}/profile/`, {
    headers: {
      authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });

  const response_json = await response.json();
  console.log(response_json);

  const bio = document.getElementById("bio");
  const mbti = document.getElementById("mbti");
  const profile_img = document.getElementById("profile_img");

  bio.innerText = response_json.bio;
  mbti.innerText = response_json.mbti;
  profile_img.src = "http://127.0.0.1:8000" + response_json.profile_img;

  const movies = document.getElementById("item");
  console.log(movies);
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
  });

  //   const write_articles = document.getElementById("title_area");
  //   console.log(write_articles);
  //   response_json.write_articles.forEach((write_article) => {
  //     const article_set = document.createElement("div");
  //     write_articles.appendChild(article_set);

  //     const title = document.createElement("h5");
  //     title.classList.add("title");
  //     title.innerText = write_art.title;
  //     article_set.appendChild(title);

  //     const author = document.createElement("p");
  //     author.classList.add("user");
  //     article_set.appendChild(author);

  //     const content = document.createElement("p");
  //     content.classList.add("content");
  //     content.innerText = write_art.content;
  //   });
}

async function handletapmenu() {
  const tabList = document.querySelectorAll(".tab_menu .list li");
  const contents = document.querySelectorAll(".tab_menu .cont_area .cont");
  let activeCont = ""; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)

  for (var i = 0; i < tabList.length; i++) {
    tabList[i].querySelector(".btn").addEventListener("click", function (e) {
      e.preventDefault();
      for (var j = 0; j < tabList.length; j++) {
        // 나머지 버튼 클래스 제거
        tabList[j].classList.remove("is_on");

        // 나머지 컨텐츠 display:none 처리
        contents[j].style.display = "none";
      }

      // 버튼 관련 이벤트
      this.parentNode.classList.add("is_on");

      // 버튼 클릭시 컨텐츠 전환
      activeCont = this.getAttribute("href");
      document.querySelector(activeCont).style.display = "block";
    });
  }
}

function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");
  alert("로그아웃이 완료되었습니다.");
}
