if(!$.cookie('userID') || $.cookie('userID')=="null"){
    alert("請先登入會員！");
    location.href="/public/login.html";
}
function addArticle(){
    if($('#title').val()=="" || $('#title').val()==null){
        alert('標題未輸入');
        return;
    }
    if($('#content').val()=='' || $('#content').val()==null){
        alert('請輸入內文');
        return;
    }
    var postdata={
        title: $('#title').val(),
        type: $('#type').val(),
        content: $('#content').val().replace(/ /g,'&nbsp;').replace(/\n/g,"<br />"),  //空白換成&nbsp，html的空白 換行符號換成<br> g=找全部符合條件的字元
        account: $.cookie('userID'),
        name:$.cookie('username')
    };
    $.post("/blog/addArticle",postdata,function(res){
        if(res.status==0){
            alert("發佈成功");
            location.href='/public/blog.html';
        }
    });
}