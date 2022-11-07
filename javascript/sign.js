

async function handleSignup() {
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value
    const password_check = document.getElementById("password_check").value

    if (password == password_check) {
        const response = await fetch('http://127.0.0.1:8000/users/', {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "nickname": nickname,
                "password": password,
                "password_check": password_check
            })
        })
        console.log(response)
    }
}

async function handleLogin() {
    const nickname = document.getElementById("nickname").value
    const password = document.getElementById("password").value

    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "nickname": nickname,
            "password": password
        })
    })
    const response_json = await response.json()
    console.log(response_json)

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
    alert("로그인이 완료되었습니다!")

    console.log(jsonPayload)

    const Response = await fetch("http://127.0.0.1:8000/users/profile/", {
      headers: {
          "authorization": "Bearer " + localStorage.getItem("access")
      },
      method: 'GET'
    })
    json = await Response.json()
    console.log(json)
    


    if (json.mbti==""){
        location.href="insert_profile.html"
    } else{
        location.href="main.html"
    }


}

function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    alert("로그아웃이 완료되었습니다!")
}

