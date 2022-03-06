function register(){
    var _account = $('#account').val();
    var __password=$('#password').val();
    var _confirmpsd=$('#confirmpsd').val();
    var _name=$('#name').val();

    if(!_account || !__password || !_confirmpsd || !_name){
        $('#errormsg').text('請輸入未填欄位');
    }
    else if (__password!=_confirmpsd){
        $('#errormsg').text('請再次確認密碼欄位');
    }
    else{
        $.post('/member/register',{'name':_name,'account':_account,'password':__password},function(res){
            if(res.status==0){
                location.href='/public/login.html';
            }
        });
    }
}