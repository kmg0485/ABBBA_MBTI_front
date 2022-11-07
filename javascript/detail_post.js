const article_id = localStorage.getItem("article_id");
window.onload = () => {
    post(article_id)
 }

 async function post(article_id) {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const user_id = payload_parse.user_id
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    
    const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/`,{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })
    response_json = await response.json()
    title.innerText = response_json.title;
    content.innerText = response_json.content;
    const comment_set = response_json.comment_set;

    if (user_id != response_json.user){
        buttons.style.display='none';
      }
      
    for(let i = comment_set.length -1; i >= 0; i--){
        const feed = document.createElement("div")
        feed.innerHTML=
        `<div style="border-bottom:1px solid gray;  margin-top:5px;
        
        color: black;" class="card" id="card">
        <div style="display:flex; justify-content:space-between;">
        <p class="card-text" style="width:90%" id="context">&nbsp${comment_set[i].content}</p>
        <div class = "buttons${i}" style="width:20%;margin:auto;" id = "buttons${i}" >
        <button onclick="delete_comment(${comment_set[i].id})" class="button submit_btn">${'삭제'}</button>
        </div>
        </div>`;
        document.querySelector(".row").append(feed)
        const abc = document.getElementById(`buttons${i}`);
        console.log(abc)

        if (user_id != comment_set[i].user){
            abc.style.display='none';
          }
}
}

async function delete_comment(id) {

    comment_id = id
    const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/comment/${comment_id}/`,{
        headers:{
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'delete',
    })
    console.log(response)
    window.location.reload()
}

async function create_comment() {
    const content = document.getElementById(`comment_content`).value
    const response = await fetch(`http://127.0.0.1:8000/articles/${article_id}/comment/`,{
        headers:{
            'content-type':'application/json',
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'post',
        body: JSON.stringify({
            "content":content
        })
    })
    window.location.reload()
}

async function delete_post(id) {
    post_id = id
    const response = await fetch(`http://127.0.0.1:8000/articles/${post_id}/`,{
        headers:{
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        
        method:'delete',
    })
    console.log(response)
    location.href = "articles.html"
}


