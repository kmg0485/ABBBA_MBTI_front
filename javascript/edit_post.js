const article_id = localStorage.getItem("article_id");
window.onload = () => {
    post(article_id)
}
const title = document.getElementById("title")
const content = document.getElementById("content")

async function post(article_id) {
    
    const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/`,{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })

    response_json = await response.json()
    title.innerText = response_json.title;
    content.innerText = response_json.content;
}



async function EditPost(article_id) {
    const content = document.getElementById("content").value
    const title = document.getElementById("title").value
    const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/`,{
        headers:{
            'content-type':'application/json',
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method:'put',
        body: JSON.stringify({
            "title":title,
            "content":content,
        })
    })
}