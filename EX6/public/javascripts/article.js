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
}
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
