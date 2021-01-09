var app=new Vue({
    el:"#app",
    data:{
        box_bg:"background-image: url('img/待机背景.jpg')",
        person:"img/gif/idle2.gif",//默认
    },
    methods: {
        //弹出对话框
        open_dialog(){
            var that=this;
            //改变背景
            this.box_bg="background-image: url('img/互动背景.jpg')";

            //执行对话
            this.person="img/gif/greet.gif";
            //弹出对话框
            $(".dialog").fadeIn(800,function(){
                //显示对话信息
                $('.dialog h4').text("你好，又见到你了，有什么需要的尽管说吧。");
                $('.dialog h4').css({width:0}).animate({width:800},7000,function(){
                    $("#select").fadeIn(2000)
                    //动画回到默认
                    that.person="img/gif/idle.gif";
                });
            });
            
        },
        //产品选择
        openMsg(shop){
            var that=this;
            if(shop=='a')
            {
                $('.dialog h4').text("");
                //执行对话
                this.person="img/gif/a,presentation.gif";
                $("#select").hide();
                //显示对话信息
                $('.dialog h4').text("让超薄超轻的Reg book14或性价比超高的艾雪8让你工作更轻松吧。");
                $('.dialog h4').css({width:0,height:20}).animate({width:905},8120,function(){
                    $('.dialog h4').css({height:40})
                    $("#select").fadeIn(2000)
                    //动画回到默认
                    that.person="img/gif/idle.gif";
                });

            }else if(shop=='b')
            {
                $('.dialog h4').text("");
                //随机生成1-3
                var num = randomNum(0,2);
                var list=[
                    {img:"img/gif/b-1.gif",name:"让专为为游戏设计的炫猎7带给你惊喜吧。"},
                    {img:"img/gif/b-2.gif",name:"让Revo 9带给你最流畅的游戏体验吧。"},
                    {img:"img/gif/b-3.gif",name:"让性能超高的灵睿7陪伴你的工作和娱乐吧。"},
                ];
                //执行对话
                this.person=list[num].img;
                $("#select").hide();
                //显示对话信息
                $('.dialog h4').text(list[num].name);
                $('.dialog h4').css({width:0,height:20}).animate({width:905},6000,function(){
                    $("#select").fadeIn(2000)
                    //动画回到默认
                    that.person="img/gif/idle.gif";
                });

            }else if(shop=='c'){
                $('.dialog h4').text("");
                //执行对话
                this.person="img/gif/farewell.gif";
                $("#select").hide();
                //显示对话信息
                $('.dialog h4').text("见到你真开心，下次也一定要来找我玩哟。");
                $('.dialog h4').css({width:0,height:20}).animate({width:905},5800,function(){
                    // $("#select").fadeIn(2000)
                    //动画回到默认
                    // that.person="img/gif/idle.gif";
                    that.showhome();
                });
            }else{
                $('.dialog h4').text("");
                //执行对话
                this.person="img/gif/farewell.gif";
                $("#select").hide();
                //显示对话信息
                $('.dialog h4').text("见到你真开心，下次也一定要来找我玩哟。");
                $('.dialog h4').css({width:0,height:20}).animate({width:905},5800,function(){
                    // $("#select").fadeIn(2000)
                    //动画回到默认
                    // that.person="img/gif/idle.gif";
                    that.showhome();
                });
            }
        },
        //恢复默认
        showhome(){
            var that=this;
            //改变背景
            this.box_bg="background-image: url('img/待机背景.jpg')";
            this.person="img/gif/idle.gif";
            //
            $('.dialog h4').text("");
            $("#select").fadeOut("slow");
            $(".dialog").fadeOut("slow");
            
        },
        //产品详情介绍
        t1_enter(){
            $('#tem1').popover('show')
        },
        t1_leave(){
            $('#tem1').popover('hide')
        },
        t2_enter(){
            $('#tem2').popover('show')
        },
        t2_leave(){
            $('#tem2').popover('hide')
        },
        t3_enter(){
            $('#tem3').popover('show')
        },
        t3_leave(){
            $('#tem3').popover('hide')
        },
        t4_enter(){
            $('#tem4').popover('show')
        },
        t4_leave(){
            $('#tem4').popover('hide')
        },
        t5_enter(){
            $('#tem5').popover('show')
        },
        t5_leave(){
            $('#tem5').popover('hide')
        },
        t6_enter(){
            $('#tem6').popover('show')
        },
        t6_leave(){
            $('#tem6').popover('hide')
        },
    },
    mounted () {
        $('[data-toggle="popover"]').popover()
    }

})

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  } 