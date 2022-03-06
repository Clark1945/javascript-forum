if(!$.cookie('userID') || $.cookie('userID')=="null"){//偵測登入與未登入的按鈕顯示
    $('#login').show();
    $('#changePass').hide();
    $('#username').hide();
    $('#logout').hide();
}
else{
    $('#login').hide();
    $('#changePass').show();
    $('#username').show();
    $('#username').text("Username: "+$.cookie('userName'));
    $('#logout').show();
}

function logout(){
    $.removeCookie('userID');//清除Cookie
    $.removeCookie('userName');
    history.go(0);//刷新頁面
}