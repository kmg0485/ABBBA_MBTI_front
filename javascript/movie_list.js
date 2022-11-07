window.onload = () => {
  handleAuthorization();
};


async function handleAuthorization() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const nickname = payload_parse.nickname
    const greeting = document.getElementById("greeting")
    greeting.innerText = `${nickname}님, 반가워요!`

    const response = await fetch('http://127.0.0.1:8000/movies/', {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET'
    })

    response_json = await response.json()

    console.log(response_json)
    
    const movies = document.getElementById("container")

    const empty_heart = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
    const full_heart = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png"

    response_json.forEach(element => {
        const movie_wrap = document.createElement("div")
        movie_wrap.style.display = "flex"
        movie_wrap.style.flexDirection = "column"
        movies.appendChild(movie_wrap)

        const movie_title = document.createElement("p")
        movie_title.innerText = element.title
        movie_title.style.textAlign = "center"
        movie_title.style.padding = 0
        movie_wrap.appendChild(movie_title)

        const movie_button = document.createElement("button")
        movie_button.style.border = 0
        movie_button.style.background = "none"
        movie_button.style.margin = 0
        movie_wrap.appendChild(movie_button)

        const newMovie = document.createElement("img")
        // newMovie.style.width = "100%"
        newMovie.src = element.poster
       
        newMovie.style.borderRadius = "10px"
        newMovie.style.height = "70%"
        newMovie.style.objectFit = "cover"
        movie_button.appendChild(newMovie)

        const like_button = document.createElement("button")
        like_button.style.border = 0
        like_button.style.background = "none"
        movie_wrap.appendChild(like_button)


        const like = document.createElement("img")
        like.style.width = "20px";
       
        like.classList.add("heart");
        like.style.margin = "auto"
        // console.log(`user : ${payload_parse.user_id}, likes=${element.likes}`)
        if (element.likes.includes(payload_parse.user_id)){
            like.src = full_heart}
        else {
            like.src = empty_heart
        }
        like_button.onclick = function () {
            if (document.querySelector(".heart").classList.contains("empty_heart")) {
                fetch(`http://127.0.0.1:8000/movies/${element.movie_id}/likes/`, {
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
                fetch(`http://127.0.0.1:8000/movies/${element.movie_id}/likes/`, {
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


    })
}

function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃이 완료되었습니다.")
}

