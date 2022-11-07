window.onload = () => {
    handleAuthorization()
}


async function handleAuthorization() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const nickname = payload_parse.nickname
    const greeting = document.getElementById("greeting")
    greeting.innerText = `${nickname}님, 반가워요!`

    console.log(payload_parse)

    const response = await fetch(`http://127.0.0.1:8000/movies/extractlist/${payload_parse.user_id}/`, {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET'
    })
        .then(response => response.json())

    const movie_list = [];

    response.forEach(element => {
        movie_list.push(element)
    });
    console.log(movie_list)



    const container = document.getElementById("container")

    const empty_heart = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
    const full_heart = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png"

    for (const list of movie_list){
    const movie = await fetch(`http://127.0.0.1:8000/movies/${list}/`, {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET'
    })
    .then(movie => movie.json())
    console.log(movie)

    const movie_set = document.createElement("div")
    movie_set.style.display = "flex"
    movie_set.style.flexDirection = "column"
    container.appendChild(movie_set)

    const title = document.createElement("p")
    title.classList.add("movie_title")
    title.innerText = movie.title
    title.style.padding = 0
    movie_set.appendChild(title)

    const poster_link = document.createElement("button")
    poster_link.style.border = 0
    poster_link.style.background = "none"
    poster_link.style.margin = 0
    movie_set.appendChild(poster_link)

    const poster = document.createElement("img")
    poster.src = movie.poster
    poster.classList.add("rec_movie")
    poster.style.borderRadius = "10px"
    poster.style.objectFit = "cover"
    poster_link.appendChild(poster)

    const like_button = document.createElement("button")
    like_button.style.border = 0
    like_button.style.background = "none"
    movie_set.appendChild(like_button)

    const like = document.createElement("img")
    like.style.width = "20px";
    like.classList.add("heart");
    like.style.margin = "auto"
    if (movie.likes.includes(payload_parse.user_id)){
        like.src = full_heart
    }
    else{
        like.src = empty_heart
    }
    like_button.onclick = function(){
        if (document.querySelector(".heart").classList.contains("empty_heart")) {
            fetch(`http://127.0.0.1:8000/movies/${movie.movie_id}/likes/`, {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("access")
                },
                method: 'POST',
                body: {}
            })
            like.src = full_heart
            like.classList.replace("empty_heat", "full_heart")
            window.location.reload()
        }
        else {
            fetch(`http://127.0.0.1:8000/movies/${movie.movie_id}/likes/`, {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("access")
                },
                method: 'POST',
                body: {}
            })
            like.src = empty_heart
            like.classList.replace("full_heart","empty_heart")
            window.location.reload()
        }
    }
    like_button.appendChild(like)
}

}

function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃이 완료되었습니다.")
}