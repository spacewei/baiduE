/**
 * Created by SPACEY on 2016/9/4.
 */
function init(i,n) {
    var rootNode = document.getElementById("div0" );
    rootNode.innerHTML += randomString();
    var breadthArray = [rootNode];
    while (breadthArray.length != 0 && i<n){
        rootNode =breadthArray.shift();
        rootNode.innerHTML += "<div style='position: relative;z-index: "+ (i+1) +"' class='"+ (i+1) +"' id='div"+ (2*i+1) +"'>"+ randomString() +"</div>";
        rootNode.innerHTML += "<div style='position: relative;z-index: "+ (i+1) +"' class='"+ (i+1) +"' id='div"+ (2*i+2) +"'>"+ randomString() +"</div>";
        breadthArray.push(rootNode.childNodes[1]);
        breadthArray.push(rootNode.childNodes[2]);
        i++;
    }
}
//初始化给每个div添加点击监听事件
function initAddBtn() {
    var vNodes =document.getElementsByTagName("div");
    for(var i=0;i<vNodes.length;i++){
        (function (){
            //alert(vNodes[i].getAttribute("id").replace(/\D/g,""));
            var x = vNodes[i];
            x.addEventListener("click",function add(event){
                if(event.target.childNodes.length != 0){
                    if(event.target.childNodes.length < 4 && event.target.childNodes.length > 2){
                        var btnNum = (x.getAttribute("id")).replace(/\D/g,"");
                        event.target.innerHTML += "<button type='button' id='"+ btnNum +"' onclick='deleteTree(event)'>删除子树</button>";
                        event.stopPropagation();
                    }
                    if(event.target.childNodes.length > 0 && event.target.childNodes.length < 2){
                        var btnNum = (x.getAttribute("id")).replace(/\D/g,"");
                        event.target.innerHTML += "<button type='button' id='"+ btnNum +"' onclick='deleteTree(event)'>删除子树</button>";
                        event.stopPropagation();
                    }
                }
            });
        })()
    }
}
//给每个删除子树按键添加删除子树方法
function deleteTree(event) {
    var divParent = event.target.parentNode;
    var divGraparent = event.target.parentNode.parentNode;
    divGraparent.removeChild(divParent);
    if(divGraparent.childNodes.length == 1){
        divGraparent.parentNode.removeChild(divGraparent);
    }
}
//生成4位随机字符串
function randomString() {
    var characterRandom = "";
    var stringRandom = "";
    for(var i=0;i<4;i++){
        var num = Math.floor(26*Math.random());
        var flag = Math.round(1*Math.random()) + 1;
        //alert(flag);
        if(flag == 1){
            characterRandom = String.fromCharCode("a".charCodeAt(0) + num);
        }
        if(flag == 2){
            characterRandom = String.fromCharCode("A".charCodeAt(0) + num);
        }
        stringRandom += characterRandom;
    }
    return stringRandom;
}
function searchStar(typeS) {
    var searchStr = document.getElementById("search-input").value;
    var rootNode = document.getElementById("div0");
    switch (typeS){
        case 0:
            breadthFirst(searchStr);
            break;
        case 1:
            frontEN(rootNode,searchStr);
            break;
        case 2:
            inorderEN(rootNode,searchStr);
            break;
        case 3:
            backEN(rootNode,searchStr);
            break;
    }
}
function breadthFirst(searchStr){
    var vNode =document.getElementById("div0");
    var breadthArray = [];
    if(vNode != null){
        //把根节点加入队列
        breadthArray.push(vNode);
    }else{
        return;
    }
    while(breadthArray.length != 0) {
        //shift方法!!!取出第一个数,然后删除
        vNode = breadthArray.shift();
        if(searchStr == vNode.childNodes[0].nodeValue){
            vNode.style.backgroundColor = "blue";
            return;
        }
        if(vNode.childNodes[1] != null){
            breadthArray.push(vNode.childNodes[1]);
        }
        if(vNode.childNodes[2] != null){
            breadthArray.push(vNode.childNodes[2]);
        }
    }
}
function frontEN(vNode,searchStr) {
    if(vNode != null){
        if(searchStr == vNode.childNodes[0].nodeValue){
            vNode.style.backgroundColor = "blue";
            return;
        }
        frontEN(vNode.childNodes[1],searchStr);
        frontEN(vNode.childNodes[2],searchStr);
    }
}
//中序遍历
function inorderEN(vNode,searchStr) {
    if(vNode != null){
        inorderEN(vNode.childNodes[1],searchStr);
        if(searchStr == vNode.childNodes[0].nodeValue){
            vNode.style.backgroundColor = "blue";
            return;
        }
        inorderEN(vNode.childNodes[2],searchStr);
    }
}
//后序遍历
function backEN(vNode,searchStr) {
    if(vNode != null){
        backEN(vNode.childNodes[1],searchStr);
        backEN(vNode.childNodes[2],searchStr);
        if(searchStr == vNode.childNodes[0].nodeValue){
            vNode.style.backgroundColor = "blue";
            return;
        }
    }
}
//function addBtn(vNode) {
//    //alert(parseInt(vNode.getAttribute("id")));
//    var btnNum = (vNode.getAttribute("id")).replace(/\D/g,"");
//    vNode.innerHTML += "<button type='button' id='"+ btnNum +"'></button>";
//}
function clearSearchResult(){
    var vNodes =document.getElementsByTagName("div");
    for(var i=0;i<vNodes.length;i++){
        vNodes[i].style.backgroundColor = "white";
    }
}

init(0,7);
initAddBtn();
document.getElementById("search-breadth-btn").addEventListener("click",function(){
    searchStar(0);
});
document.getElementById("frontEN-btn").addEventListener("click",function(){
    searchStar(1);
});
document.getElementById("inorderEN-btn").addEventListener("click",function(){
    searchStar(2);
});
document.getElementById("backEN-btn").addEventListener("click",function(){
    searchStar(3);
});
document.getElementById("clear-btn").addEventListener("click",function(){
    clearSearchResult();
});