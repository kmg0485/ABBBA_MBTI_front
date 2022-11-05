window.onload = () => {
    handleAuthorization()
}


async function handleAuthorization(){
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const nickname = payload_parse.nickname
    const greeting = document.getElementById("greeting")
    greeting.innerText = `${nickname}님, 반가워요!`

    const response = await fetch('http://127.0.0.1:8000/movies/',{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })
    
    response_json = await response.json()
    console.log(response_json)
    const movies = document.getElementById("container")

    response_json.forEach(element => {
        console.log(element.poster)
        const newMovieLink = document.createElement("a")
        newMovieLink.href = "#"
        movies.appendChild(newMovieLink)
        const newMovie = document.createElement("img")
        newMovie.src = element.poster
        newMovieLink.appendChild(newMovie)


    })
}

function handleLogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
}