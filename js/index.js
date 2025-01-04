// index.js
var moveNum = 0; //1씩 증가시킬 값
var autoCall; // setinterval 담을 변수
var slide_Width; // slide의 너비값을 담을 변수

var pageCount = 0; //현재 페이지
var totalPage; //총 페이지의 수
var state = 0; //이벤트 제어 변수 0-스크롤 허용 / 1- 스크롤 불허
var pageOffsetTop; //pagecount를 eq값으로 사용해 각 페이지가 떨어져있는 값을 담는 변수

var upcycleOffset;
var dailyOffset;
var nightOffset;

$(document).ready(function () {
    slideInitial();

    totalPage = $('.page').length;
    upcycleOffset = $('.upcycle').offset().top;
    dailyOffset = $('.daily').offset().top;
    nightOffset = $('.night').offset().top;
    //문서에서 마우스 스크롤 이벤트가 발생하면.
    $(document).on('mousewheel DOMMouseScroll', function () {
        if (state === 1) {
            return false;
        }
        state = 1;

        var evt = window.event;
        var ValueDelta = evt.wheelDelta ? evt.wheelDelta : evt.detail;
        if (/firefox/i.test(navigator.userAgent)) {
            ValueDelta = -evt.detail;
        }
        if (ValueDelta < 0) {
            pageCount++;
            if (pageCount === totalPage) {
                pageCount = totalPage - 1;
            }
        }
        else {
            pageCount--;
            if (pageCount === -1) {
                pageCount = 0
            }
        }
        pageOffsetTop = $('.page').eq(pageCount).offset().top;
        $('html, body').animate({
            scrollTop: pageOffsetTop + 'px'
        }, 800, function () {
            state = 0;
        });

        // 업사이클링 페이지에 도착하면
        if(upcycleOffset === pageOffsetTop){
            $('.l_content').animate({
                left : 0 + "%"
            },1500);
            $('.r_content').animate({
                right : 0 + "%"
            },1500);
        }

        // 데일리케어 슬라이드 페이지에 도착하면
        if(dailyOffset === pageOffsetTop){
            $('.daily .slide').find('.txtbox').stop().delay(800).animate({
                top : 49 + '%',
                opacity : 1
            },800);
        }
        // 나이트케어
        if(nightOffset === pageOffsetTop){
            $('.night .slide').find('.txtbox').stop().delay(800).animate({
                top : 49 + '%',
                opacity : 1
            },800);
        }
    });

    autoCall = setInterval(flowContent, 10);
    $('.sample_slide li').hover(function () {
        //mouseenter
        clearInterval(autoCall);
        $(this).css({
            backgroundColor: '#eee',
            boxShadow: '3px 3px 5px #ccc'
        })
    }, function () {
        //mouseleave
        autoCall = setInterval(flowContent, 10);
        $(this).css({
            backgroundColor: 'transparent',
            boxShadow: 'none'
        })
    });

    // daily의 next버튼 prev버튼
    $('.daily .next').click(dailyNextSlide);
    $('.daily .prev').click(dailyPrevSlide);
    // night의 next버튼 prev버튼
    $('.night .next').click(nightNextSlide);
    $('.night .prev').click(nightPrevSlide);

    // upcycle영역
    $('.artbox').hover(function () {
        //mouseenter
        $('> .cover', this).stop().fadeIn(400);
    }, function () {
        //mouseleave
        $('> .cover', this).stop().fadeOut(400);
    });

    //modal
    $('.sample_slide a').click(function(evt){
        evt.preventDefault();
        // 이미지의 각 정보 담는 변수
        let getAlt;
        let getTit;
        let getImgSrc;
        getAlt = $(this).find('img').attr('alt');
        getTit = $(this).find('img').attr('title');
        getImgSrc= $(this).find('img').attr('src');
        console.log('이미지의 alt : ' + getAlt);
        console.log('이미지의 tit : ' + getTit);
        console.log('이미지의 src : ' + getImgSrc);
        //이제 모달페이지 띄우고 내용 채워
        $('.modal_imgbox').find('img').attr('src',getImgSrc);
        $('.modal_txtbox').find('h2').html(getTit);
        $('.modal_txtbox').find('p').html(getAlt);
        $('.modal_bg_color').show();
        clearInterval(autoCall);
    });

    $('.modal_content .close').click(function(){
        $('.modal_bg_color').hide();
    });

});

// 스크롤 이벤트

// 함수
function flowContent() {
    moveNum++; //함수가 불릴때마다 1씩 값 증가
    let boxWidth = $('.sample_slide li').first().outerWidth(true);
    if (moveNum > boxWidth) {
        $('.sample_slide').append($('.sample_slide li').first());
        $('.sample_slide').css({
            left: 0 //
        });
        moveNum = 0;
    }
    else {
        $('.sample_slide').css({
            left: -moveNum + 'px'//함수가 불리고 if문을 통과 할 때마다 left의 좌표값을 1씩 이동
        });
    }
}

function slideInitial() {
    slide_Width = $('.slide').width();
    $('.slider').css({
        marginLeft: -slide_Width
    })
    $('.daily .slider .slide').last().prependTo('.daily .slider');
    $('.night .slider .slide').last().prependTo('.night .slider');
}

function dailyNextSlide(evt) {
    evt.preventDefault();
    $('.slider .txtbox').css({
        opacity : 0,
        top : 55 + '%',
    });
    $('.daily .slider').stop().animate({
        // > 버튼을 누르면 1920(미리당겨놓은값) + 1920 값 만큼 당깁니다.
        marginLeft: '-=' + slide_Width
    }, 800, function () {
        $('.slider .txtbox').css({
            opacity : 0,
            top : 55 + '%',
        });
        $(this).find('.txtbox').stop().animate({
            top : 49 + '%',
            opacity : 1
        },800);
        console.log(this);
        $('.daily .slider .slide').first().appendTo('.daily .slider');
        $('.daily .slider').css({
            marginLeft: -slide_Width
        });
    });
}

function dailyPrevSlide(evt) {
    evt.preventDefault();
    $('.slider .txtbox').css({
        opacity : 0,
        top : 55 + '%'
    })
    $('.daily .slider').stop().animate({
        marginLeft: '+=' + slide_Width //차이점
    }, 800, function () {
        $('.slider .txtbox').css({
            opacity : 0,
            top : 55 + '%',
        });
        $(this).find('.txtbox').stop().animate({
            top : 49 + '%',
            opacity : 1
        },800);
        $('.daily .slider .slide').last().prependTo('.daily .slider');
        $('.daily .slider').css({
            marginLeft: -slide_Width
        });
    });
}

function nightNextSlide(evt) {
    evt.preventDefault();
    $('.slider .txtbox').css({
        opacity : 0,
        top : 55 + '%',
    });
    $('.night .slider').stop().animate({
        marginLeft: '-=' + slide_Width
    }, 800, function () {
        $('.slider .txtbox').css({
            opacity : 0,
            top : 55 + '%',
        });
        $(this).find('.txtbox').stop().animate({
            top : 49 + '%',
            opacity : 1
        },800);
        console.log(this);
        $('.night .slider .slide').first().appendTo('.night .slider');
        $('.night .slider').css({
            marginLeft: -slide_Width
        });
    });
}

function nightPrevSlide(evt) {
    evt.preventDefault();
    $('.slider .txtbox').css({
        opacity : 0,
        top : 55 + '%',
    });
    $('.night .slider').stop().animate({
        marginLeft: '+=' + slide_Width
    }, 800, function () {
        $('.slider .txtbox').css({
            opacity : 0,
            top : 55 + '%',
        });
        $(this).find('.txtbox').stop().animate({
            top : 49 + '%',
            opacity : 1
        },800);
        console.log(this);
        $('.night .slider .slide').last().prependTo('.night .slider');
        $('.night .slider').css({
            marginLeft: -slide_Width
        });
    });
}