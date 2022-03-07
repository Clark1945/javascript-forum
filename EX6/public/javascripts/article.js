const { $where } = require("../../models/memberModel");

function initArticle(data){

    var head="<h3>"+data.name+"(<a class='person' href='blog.html?accout="+data.account+"'>"+data.account+"</a>)"+"</h3>";
    $('#a_head').append(head);
}