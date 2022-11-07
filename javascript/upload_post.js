async function post() {
    const content = document.getElementById("content").value
    const title = document.getElementById("title").value
    console.log(content)

    const response = await fetch('http://127.0.0.1:8000/articles/',{
        headers:{
            'content-type':'application/json',
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'post',

        body: JSON.stringify({
            "title":title,
            "content":content,
        })
    })
    console.log(response)
}



