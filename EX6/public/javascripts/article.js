function initArticle(data){
    var editArticle="";
    var delArticle="";

    if(data.account==$.cookie('userID')){
        editArticle=`<a class="person" href="javascript:showArticlerow()">修改文章</a>`;
        delArticle=`<a class="person" href="javascript:delArticle()">刪除文章</a>`;
    }

    var head="<h3>"+data.name+"(<a class='person' href='blog.html?account="+data.account+
    "'>"+data.account+"</a>)"+editArticle+" "+delArticle+"</h3>";
    $('#a_head').append(head);
    var a_date=new Date(data.postdate);
    var date=(a_date.getMonth()+1)+"月"+a_date.getDate()+"日"+a_date.getHours()+":"+a_date.getMinutes();
    var content=`<h2 class="a_title">${data.title}</h2>
    <div class="a_head">
    <a class="a_type" href="blog.html?type=${data.type}">${data.type}</a>
    ${date}
    </div>
    <p>${data.content}</p>
    <div class="editRow" style="display:none"> 
    <label for="field6">
    <textarea class="textarea-field"></textarea>
    </label>
    </label>
    <input type="submit" onclick="editArticle()" value="送出">
    </label>
    </div>
    `;
    $('#a_content').append(content);
    $('#a_like_count').text(data.like.length);
    if(data.like.indexOf($.cookie('userID'))!=-1){
        $('#a_like').addClass('red_2');
        $('#a_like').removeClass('red');
    }else{
        $('#a_like').addClass('red');
        $('#a_like').removeClass('red_2');
    }
    var comment="";
    var i=1;
    data.comment.forEach(function(com){
        comment="";

        var commentdate=new Date(com.date);
        commentdate=(commentdate.getMonth()+1)+'月'+commentdate.getDate()+'日'+
        commentdate.getHours()+":"+commentdate.getMinutes();
        comment=`<div class="${com.id}">
        <div class="a_head"><h2>#${i}</h2></div>
        <div>
        <img src="images/icons/avatar-icons.png" width='50px' height='50px' style="float_left">
        </div>
        <h3 style="margin-bottom:0;margin-top:0;">
        ${com.name}
        (<a class="person" href="blog.html?account=${com.account}">
        ${com.account}</a>)
        </h3>${commentdate}</div>
        <div class="comRow" style="border-bottom: 1px solid #dfdfdf;padding="24px 0;">${com.message}</div>
        </div>`;
        $('#a_comment').append(comment);
        i++;
    });
};
function getUrlVal(val){
    var query=window.location.search.substring(1);
    var vars=query.split("&");
    for(var i =0;i<vars.length;i++){
        var pair=vars[i].split("=");
        if(pair[0]==val){
            return pair[1];//回傳值
        }
    }
    return (false);
}

getArticleById();
function getArticleById(){
    if(!getUrlVal('_id')){
        alert('無找到此文章');
        location.href='/public/blog.html';
        return;
    }
    $.get('/blog/getArticleById?_id='+getUrlVal('_id'),function(res,status){
        if(res.status!=0){
            location.href='/public/blog.html';
        }
        else{
            initArticle(res.data);
        }
    });
}

function showArticlerow(){
    $('#a_content p').css('display','none');
    $('#a_content .editRow').css('display','block');
    $('#a_content .textarea-field').val($('#a_content p').text());
}
function editArticle(){
    $.post("/blog/editArticle",{
        '_id':getUrlVal("_id"),
        'account':$.cookie('userID'),
        'content':$('#a_content .textarea-field').val()
    },function(res){
            if(res.status==0){
                $('#a_content p').text($('#a_content .textarea-field').val());
            }
        });
        $('#a_content p').css('display','block');
        $('#a_content .editRow').css('display','none');
}
function delArticle(_id) {
    $.post("/blog/delArticle", {
        '_id': getUrlVal("_id"),
        'account': $.cookie('userID')
    }, function (res) {
        if (res.status == 0) {
            alert('刪除成功!');
            location.href = '/public/blog.html';
        }
    });
}
$('#a_like').on('click',function(){
    if(!$.cookie('userID') || $.cookie('userID')=="null"){
        alert("請先登入會員。");
        location.href="/public/login.html";
        return;
    }
    if($('#a_like').attr('class')=='btn red_2'){
        $('#a_like').addClass('red');
        $('#a_like').removeClass('red_2');
    }
    else if($('#a_like').attr('class')=='btn_red'){
        $('#a_like').addClass('red_2');
        $('#a_like').removeClass('red');
    }
    $.post('/blog/pushlike',{
        '_id':getUrlVal("_id"),
        'account':$.cookie('userID')    
    },function(res){
        if(res.status==0){
            $('#a_like_count').text(res.like);
        }
    });
});
function showcomment(){
    if($('#commentform').css('display','none')){
        $('#commentform').css('display','block');
    }else{
        $('#commentform').css('display','none');
    }
}
function addComment(){
    if(!$.cookie('userID') || $.cookie('userID')=="null"){
        alert("請先登入會員。");
        location.href="/public/login.html";
        return;
    }
    var message=$('#content').val().replace(/ /g,'&nbsp;').replace(/\n/g,"<br />");
    $.post("/blog/addComment",{
        '_id':getUrlVal('_id'),
        'account':$.cookie('userID'),
        'name':$.cookie('username'),
        'message':message
    },function(res){
            if(res.status==0){
                alert('新增成功');
                history.go(0);
            }
        });
}