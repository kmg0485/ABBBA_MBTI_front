window.onload = () => {
    handleAuthorization()
}



async function handleAuthorization(){
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)

    const response = await fetch("http://127.0.0.1:8000/users/profile/", {
        headers: {
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET'
    })

    response_json = await response.json()

    const mbti = document.getElementById("mbti")

    mbti.innerText = response_json.mbti

}