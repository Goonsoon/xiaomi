/**
 * Created by Zhichao Liu on 11/18/2015.
 */


window.onload = function () {

    /*banner切换*/
    (function(){
        var dotEl = document.querySelectorAll('.banner #dot li');
        var bannerPic= document.getElementsByClassName('banner-img');
        var elClick = false;
        var previousDispPic = bannerPic[0];
        var previousDispDot = dotEl[0];
        var count = 1;

        /*图片切换函数*/
        var switchPic = function(){
            if(count==5){count=0;}
            previousDispPic.setAttribute('class','banner-img');
            previousDispDot.removeAttribute('class');
            bannerPic[count].setAttribute('class','banner-img img-show');
            dotEl[count].setAttribute('class','active');
            previousDispPic = bannerPic[count];
            previousDispDot = dotEl[count];
            count++;
        };

        var timerID = setInterval(switchPic,5000);

        /*点击小圆点触发事件*/
        for(var i=0;i<dotEl.length;i++){
            dotEl[i].index = i;
            dotEl[i].onclick = function () {
                previousDispDot.removeAttribute('class');
                previousDispPic.setAttribute('class','banner-img');
                this.setAttribute('class','active');
                bannerPic[this.index].setAttribute('class','banner-img img-show');
                previousDispPic = bannerPic[this.index];
                previousDispDot = this;
                count = this.index+1;
                clearInterval(timerID);
                elClick = true;
            }
        }

        /*指针放在图片上触发事件*/
        for(i=0;i<bannerPic.length;i++){
            bannerPic[i].onmouseover = function(){
                clearInterval(timerID);
            };
            bannerPic[i].onmouseout = function(){
                if(!elClick){
                    timerID = setInterval(switchPic,5000);
                }
            };
        }


        /*事件委托---点击图片切换按钮触发事件*/
        document.getElementsByClassName('banner')[0].onclick = function (e) {
            if(e.target.getAttribute('class')=='content-switch prev iconfont'){
                if(count>1){count--;}else{count = 5;}
                previousDispDot.removeAttribute('class');
                previousDispPic.setAttribute('class','banner-img');
                dotEl[count-1].setAttribute('class','active');
                bannerPic[count-1].setAttribute('class','banner-img img-show');
                previousDispPic = bannerPic[count-1];
                previousDispDot = dotEl[count-1];
            }else if(e.target.getAttribute('class')=='content-switch next iconfont'){
                if(count==5){count=0;}
                previousDispDot.removeAttribute('class');
                previousDispPic.setAttribute('class','banner-img');
                dotEl[count].setAttribute('class','active');
                bannerPic[count].setAttribute('class','banner-img img-show');
                previousDispPic = bannerPic[count];
                previousDispDot = dotEl[count];
                count++;
            }else{
                return;
            }
            clearInterval(timerID);
            elClick = true;
        }
    })();


};

