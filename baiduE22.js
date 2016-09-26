/**
 * Created by SPACEY on 2016/8/31.
 */
//构建储存遍历过节点的数组
var nodeArray = [];

//初始化建立节点div
function init(i,n) {
    var rootNode = document.getElementById("div"+ i);
    //alert(i);
    rootNode.innerHTML += "<div style='position: relative;z-index: "+ (i+1) +"' class='"+ (i+1) +"' id='div"+ (2*i+1) +"'></div>";
    rootNode.innerHTML += "<div style='position: relative;z-index: "+ (i+1) +"' class='"+ (i+1) +"' id='div"+ (2*i+2) +"'></div>";
    if(i>n){
        return
    }
    init(2*i+1,n);
    init(2*i+2,n);
}
//前序遍历
function frontEN(vNode) {
    if(vNode != null){
        nodeArray.push(vNode);
        frontEN(vNode.childNodes[0]);
        frontEN(vNode.childNodes[1]);
    }
}
//中序遍历
function inorderEN(vNode) {
    if(vNode != null){
        inorderEN(vNode.childNodes[0]);
        nodeArray.push(vNode);
        inorderEN(vNode.childNodes[1]);
    }
}
//后序遍历
function  backEN(vNode) {
    if(vNode != null){
        backEN(vNode.childNodes[0]);
        backEN(vNode.childNodes[1]);
        nodeArray.push(vNode);
    }
}
//广度遍历
//使用队列!!!
function breadthFirst(vNode) {
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
        nodeArray.push(vNode);
        if(vNode.childNodes[0] != null){
            breadthArray.push(vNode.childNodes[0]);
        }
        if(vNode.childNodes[1] != null){
            breadthArray.push(vNode.childNodes[1]);
        }
    }
}

//遍历改变背景,参数:节点数组,延迟时间,间隔时间
function changeBC(a,tDelay,tInterval){
    for (var i=0;i< a.length;i++){
        tDelay = tDelay + tInterval;
        //闭包!!!因为vNode和tDelay在外层函数有,直接访问
        //匿名函数定义方式!function(){}(),!使得函数转成表达式,不是声明
        !function(){
            var vNode = a[i];
            setTimeout(function(){
                vNode.style.backgroundColor = "yellow";
            },tDelay);
        }(/*tDelay*/);
    }
}
init(0,6);
randomString();

document.getElementById("front-btn").addEventListener("click",function() {
    frontEN(document.getElementById("div0"));
    changeBC(nodeArray,-500,500);
});
document.getElementById("inorder-btn").addEventListener("click",function() {
    inorderEN(document.getElementById("div0"));
    changeBC(nodeArray,-500,500);
});
document.getElementById("back-btn").addEventListener("click",function() {
    backEN(document.getElementById("div0"));
    changeBC(nodeArray,-500,500);
});
document.getElementById("breadth-btn").addEventListener("click",function() {
    breadthFirst(document.getElementById("div0"));
    changeBC(nodeArray,-500,500);
});