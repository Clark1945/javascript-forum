function login(){
    var _account = $("#account").val();
    var _password = $("#password").val();

    if(!_account || !_password){
        $('#errormsg').text('請輸入帳號密碼：');
    }
    else{
        $.post('/member/login',{'account':_account,'password':_password},function(res){
            if(res.status==1){
                $('errormsg').text(res.msg);
            }
            else{
                $.cookie('userName',res.data.name);//儲存在Cookie的名稱與值
                $.cookie('userID',res.data.account);//儲存在Cookie的名稱與值
                alert('登入成功!');
                location.href='/public/index.html';
            }
    });
}
}
function register(){
    location.href='/public/register.html';
}