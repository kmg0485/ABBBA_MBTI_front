window.onload = () => {
    handleAuthorization()
    handleRecommend()
}



async function handleAuthorization() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const greeting = document.getElementById("nickname")
    greeting.innerText = `${payload_parse.nickname}님, 반가워요!`

    const response = await fetch("http://127.0.0.1:8000/users/profile/", {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET'
    })

    response_json = await response.json()

    const bio = document.getElementById("bio")
    const email = document.getElementById("email")
    const mbti = document.getElementById("mbti")
    const image = document.getElementById("profile_image")
    bio.innerText = response_json.bio
    email.innerText = response_json.email
    mbti.innerText = response_json.mbti
    image.src = "http://127.0.0.1:8000" + response_json.profile_img

    // 팔로워 목록 띄우기
    const people = document.getElementById("followings")

    response_json.followings.forEach(person => {
        const wrappingDiv = document.createElement("div")
        wrappingDiv.style.display = "flex";
        wrappingDiv.style.width = "90%";
        wrappingDiv.style.margin = "auto";
        wrappingDiv.style.justifyContent = "center";
        people.appendChild(wrappingDiv)

        wrappingDiv.innerHTML = `<img src="http://127.0.0.1:8000/${person.profile_img}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/847/847969.png'" class="follower_image">`

    
        const list = document.createElement("h3")
        list.style.width = "70%";
        list.style.marginLeft = "5%";
        wrappingDiv.appendChild(list)

        const spanOne = document.createElement("span")
        spanOne.innerText = `${person.nickname} :`
        list.appendChild(spanOne)

        const spanTwo = document.createElement("span")
        spanTwo.innerText = `${person.mbti}`
        list.appendChild(spanTwo)

        const unfollow = document.createElement("button")
        unfollow.type = "button";
        unfollow.classList.add("submit_btn");
        unfollow.innerHTML = "UNFOLLOW"
        unfollow.onclick = function () {

            const id = person.id
            fetch(`http://127.0.0.1:8000/users/follow/${id}/`, {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("access")
                },
                method: 'POST',
                body: {}
            })
            alert("언팔로우!")
            window.location.reload()
        }
        wrappingDiv.appendChild(unfollow)
    })


}

async function handleRecommend() {
    const recommend_response = await fetch('http://127.0.0.1:8000/users/recommend/', {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET'
    })

    recommend_response_json = await recommend_response.json()

    const people = document.getElementById("recommend")
    recommend_response_json.recommend_users.forEach(person => {
        const wrappingDiv = document.createElement("div")
        wrappingDiv.style.display = "flex";
        wrappingDiv.style.width = "90%";
        wrappingDiv.style.margin = "auto";
        wrappingDiv.style.justifyContent = "center";
        people.appendChild(wrappingDiv)

        const image = document.createElement("img")
        
        image.src = "http://127.0.0.1:8000/" + person.profile_img
        image.onerror = "this.src='https://cdn-icons-png.flaticon.com/512/847/847969.png'"
        image.style.margin = "auto";
        image.style.width = "10%";
        image.style.aspectRatio = "1/1";
        image.style.borderRadius = "50%";
        image.style.objectFit = "cover";
        wrappingDiv.appendChild(image)

        const list = document.createElement("h3")
        list.style.width = "70%";
        list.style.marginLeft = "5%";
        wrappingDiv.appendChild(list)


        const spanOne = document.createElement("span")
        spanOne.innerText = `${person.nickname} :`
        list.appendChild(spanOne)

        const spanTwo = document.createElement("span")
        spanTwo.innerText = `${person.mbti}`
        list.appendChild(spanTwo)

        const unfollow = document.createElement("button")
        unfollow.type = "button";
        unfollow.classList.add("submit_btn");
        unfollow.innerHTML = "FOLLOW"
        unfollow.onclick = function () {

            const id = person.id
            fetch(`http://127.0.0.1:8000/users/follow/${id}/`, {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("access")
                },
                method: 'POST',
                body: {}
            })
            alert("팔로우 성공!")
            window.location.reload()
        }
        wrappingDiv.appendChild(unfollow)
    })

}