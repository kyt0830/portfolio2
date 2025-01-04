//header.js




$(document).ready(function(){
    //header에 사용되는 jq
    $('.gnb').mouseenter(function () {
        $('.lnb, .bgcolor').stop().slideDown(200);
    });
    $('nav').mouseleave(function () {
        $('.lnb, .bgcolor').stop().slideUp(200);
    });
    // searchbox 높이는 keywords의 높이값을 받아와서 늘어나도록
    // keywords 누르면 input으로 값 전달하고 제출까지 되도록
    $('.search').click(function () {
        $('.search-box').stop().slideToggle(200);
    });
});




