if(!$.cookie('userID') || $.cookie('userID')=="null"){
    alert("請先登入會員。");
    location.href="/public/login.html";
}

function changePass(){
    var _oldPass=$('#oldPass').val();
    var _newPass=$('#newPass').val();

    if(!_oldPass || !_newPass){
        $('#errormsg').text('請輸入密碼。');
    }
    else{
        $.post('/member/changePass',{'account':$.cookie('userID'),'oldPass':_oldPass,'newPass':_newPass},function(res){
            if(res.status==1){
                $('#errormsg').text(res.msg);
            }
            else{
                alert('修改成功。');
                location.href="/public/login.html";
            }
        });
    }
}