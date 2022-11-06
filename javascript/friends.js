window.onload = () => {
    handleAuthorization()
    handleRecommend()
}



async function handleAuthorization(){
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const greeting = document.getElementById("nickname")
    greeting.innerText = `${payload_parse.nickname}님, 반가워요!`
    const user = payload_parse.user_id

    const response = await fetch(`http://127.0.0.1:8000/users/${user}/profile/`,{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })

    response_json = await response.json()
    console.log(response_json)

    const bio =document.getElementById("bio")
    const email =document.getElementById("email")
    const mbti = document.getElementById("mbti")
    const image = document.getElementById("profile_image")
    
    bio.innerText = response_json.bio
    email.innerText = response_json.email
    mbti.innerText = response_json.mbti
    image.src = "/Users/lgb/Desktop/ABBBA_MBTI"+response_json.profile_img

    // 팔로워 목록 띄우기
    const people = document.getElementById("followers")

    response_json.followers.forEach(person => {
        const wrappingDiv = document.createElement("div")
        wrappingDiv.style.display = "flex";
        wrappingDiv.style.width = "90%";
        wrappingDiv.style.margin = "auto";
        wrappingDiv.style.justifyContent = "center";
        people.appendChild(wrappingDiv)

        const list = document.createElement("h3")
        list.style.width = "70%";
        list.style.marginLeft = "5%";
        wrappingDiv.appendChild(list)

        const spanOne = document.createElement("span")
        spanOne.innerText = person
        list.appendChild(spanOne)

        // make > define > append
        const unfollow = document.createElement("button")
        unfollow.type = "button";
        unfollow.classList.add("submit_btn");
        unfollow.innerHTML = "UNFOLLOW"
        unfollow.onclick = "unfollow()"
        wrappingDiv.appendChild(unfollow)
    })


}

async function handleRecommend(){
    const recommend_response = await fetch('http://127.0.0.1:8000/users/recommend/',{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })

    recommend_response_json = await recommend_response.json()

    const people = document.getElementById("recommend")

    recommend_response_json.forEach(person => {
        const wrappingDiv = document.createElement("div")
        wrappingDiv.style.display = "flex";
        wrappingDiv.style.width = "90%";
        wrappingDiv.style.margin = "auto";
        wrappingDiv.style.justifyContent = "center";
        people.appendChild(wrappingDiv)

        const image = document.createElement("img")
        image.src = "/Users/lgb/Desktop/ABBBA_MBTI"+person.profile_img
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
        spanTwo.innerText = ` ${person.mbti}`
        list.appendChild(spanTwo)

        // make > define > append
        const unfollow = document.createElement("button")
        unfollow.type = "button";
        unfollow.classList.add("submit_btn");
        unfollow.innerHTML = "FOLLOW"
        unfollow.onclick = "unfollow()"
        wrappingDiv.appendChild(unfollow)
    })
    
}
