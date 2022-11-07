window.onload = () => {
   console.log("연결되었습니다!")
   handleAuthorization()
}
const buttons = document.getElementById("buttons")

async function handleAuthorization() {
    const payload = localStorage.getItem("payload");
    const payload_parse = JSON.parse(payload)
    const user_id = payload_parse.user_id
    console.log("함수연결")
   
    const response = await fetch ('http://127.0.0.1:8000/articles/',{
        headers : {
            "authorization" : "Bearer " + localStorage.getItem("access")
        },
        method : 'GET'
    })
   
    response_json = await response.json()
    console.log(response_json)

    for(let i = response_json.length -1; i >= 0; i--){

        const feed = document.createElement("div")
        feed.innerHTML=
        `<div class="card" id="card" style="width:60vw; border-radius : 25px; border-color:black;">
        
        <div class="card-header"id="title">${response_json[i].title}</div>
        <div class="card-body">
        <p class="card-text" id="context">${response_json[i].content}</p>
      
        <div style="text-align:end;" ><div style="display:flex;justify-content:end;">
     <div  id = "buttons${i}" >
        <a style="border-radius:20px;" onclick="to_edit_article(${response_json[i].id})" class="btn btn-outline-primary">${'수정'}</a>
        <a style="border-radius:20px; onclick="delete_post(${response_json[i].id})" class="btn btn-outline-primary">${'삭제'}</a></div>
        <div style="border-radius:20px; margin-left:5px;" onclick="to_article_detail(${response_json[i].id})" class="btn btn-outline-primary">${'자세히보기'}</div>
        </div></div>
        </div>`;
        document.querySelector(".row").append(feed)

        const abc = document.getElementById(`buttons${i}`);

        console.log(abc)

        if (user_id != response_json[i].user){
            abc.style.display='none';
          }
        
        
        console.log(response_json[i]);
        console.log(response_json[i].title);
        console.log(response_json[i].content);

        
    }
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
    window.location.reload()
}



