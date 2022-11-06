console.log("call js!!")

window.onload = () => {
    handleAuthorization()
}



async function handleAuthorization(){
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const greeting = document.getElementById("nickname")
    greeting.innerText = payload_parse.nickname
    const user = payload_parse.user_id

    const response = await fetch(`http://127.0.0.1:8000/users/${user}/profile/`,{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })

    response_json = await response.json()
    console.log(response_json)

    const mbti = document.getElementById("mbti")

    mbti.innerText = response_json.mbti

}

