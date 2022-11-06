window.onload = () => {
    handleAuthorization()


    const realUpload = document.querySelector('.real-upload');
    const upload = document.querySelector('.upload');

    upload.addEventListener('click', () => realUpload.click());
}

function previewImage(targetObj) {
    var preview = document.getElementById("profile_image")//img id
    var ua = window.navigator.userAgent;

    if (ua.indexOf("MSIE") > -1) {
      //ie일때

      targetObj.select();

      try {
        var src = document.selection.createRange().text; // get file full path

        var img = document.getElementById("profile_image"); //이미지가 뿌려질 곳

        img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')"; //이미지 로딩, sizingMethod는 div에 맞춰서 사이즈를 자동조절 하는 역할
      } catch (e) {
        if (!document.getElementById("ie_preview_error_" + "profile_image")) {
          img.id = "ie_preview_error_" + "profile_image";
          img.innerHTML = "a";
          preview.insertBefore(info, null);
        }
      }
    } else {
      //ie가 아닐때
      var files = targetObj.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
        if (!file.type.match(imageType)) continue;

        var prevImg = document.getElementById("prev_" + "profile_image"); //이전에 미리보기가 있다면 삭제
        if (prevImg) {
          preview.removeChild(prevImg);
        }

        var img = document.getElementById("profile_image"); 
        img.file = file;

        if (window.FileReader) {
          // FireFox, Chrome, Opera 확인.
          var reader = new FileReader();
          reader.onloadend = (function (aImg) {
            return function (e) {
              aImg.src = e.target.result;
            };
          })(img);
          reader.readAsDataURL(file);
        } else {
          // safari is not supported FileReader
          //alert('not supported FileReader');
          if (!document.getElementById("sfr_preview_error_" + "profile_image")) {
            var image = document.getElementById("profile_image");
            image.innerHTML = "not supported FileReader";
            preview.insertBefore(info, null);
          }
        }
      }
    }
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
}

async function insertProfile() {
    const email = document.getElementById("email").value
    const bio = document.getElementById("bio").value
    const mbti = document.getElementById("mbti").value
    const profile_img = document.getElementById("profile_image").value

    const response = await fetch('http://127.0.0.1:8000/users/profile/', {
        headers: {
            'content-type': 'application/json',
            "authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "bio": bio,
            "mbti": mbti,
            "profile_img": profile_img
        })
    })
    alert("프로필 저장이 완료되었습니다!")
    console.log(response)
}