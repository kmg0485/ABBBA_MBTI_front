// 회원가입 페이지로 이동
function to_signup() {
    location.href ="signup.html"
}

// 로그인 페이지로 이동
function to_signin() {
    location.href = "signin.html"
}

// 영화 전체 리스트 페이지로 이동
function to_movie_list() {
    location.href = "movie_list.html"
}

// 영화 상세 페이지로 이동
function to_movie_detail() {
    location.href = "movie_detail.html"
}

// 게시글 전체 리스트 페이지로 이동
function to_articles() {
    location.href = "articles.html"
}

// 게시글 상세 페이지로 이동
function to_article_detail(id) {
    location.href = "detail_post.html"
    localStorage.setItem("article_id", id);
}

// 게시글 입력 페이지로 이동
function to_write_article() {
    location.href = "upload_post.html"
}

// 게시글 수정 페이지로 이동
function to_edit_article(id) {
    location.href = "edit_post.html"
    localStorage.setItem("article_id", id);
}

// 프로필 페이지로 이동
function to_profile() {
    location.href = "profile.html"
}

// MBTI 설명 페이지로 이동
// 16개의 mbti
function to_mbti_detail() {
    location.href = "mbti_detail.html"
}

// 프로필 입력창으로 이동
function to_insert_profile() {
    location.href = "insert_profile.html"
}

// 프로필 수정창으로 이동
function to_edit_profile() {
    location.href = "edit_profile.html"
}

// 친구 추천 페이지로 이동
function to_friends() {
    location.href = "friends.html"
}

// mbti 버튼 누르면 해당 mbti를 가진 작성자들이 쓴 게시글 리스트만 뜨는 페이지
function to_mbti_menu() {
    location.href = "mbti_menu.html"
}

// 커뮤니티로 이동
function to_community() {
    location.href = "articles.html"
}

// 추천된 영화 리스트 페이지로 이동
function to_recommended_movies() {
    location.href = "recommended_movie.html"
}

// 메인 페이지로 이동
function to_main() {
    location.href = "main.html"
}