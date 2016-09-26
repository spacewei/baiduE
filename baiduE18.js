/**
 * Created by SPACEY on 2016/8/23.
 */
    //获取父节点
var containerParent = document.getElementById("container");
var itemNum = 0;
//获取输入数字并验证
function textGet() {
    var textValue = document.getElementsByName("text-input")[0].value.replace(/\D/g,'');

    if(textValue == "" || textValue<10 || textValue>100){
        alert("请输入10到100的数字");
        return;
    }

    return textValue;
}
//获取现存的div数
function itemNumber() {
    itemNum = containerParent.getElementsByTagName("div").length;
    return itemNum;
}
//获取第一个元素
function firstItem(itemNum) {
    if(itemNum == 0)
        return;
    var firstItemNode = containerParent.getElementsByTagName("div")[0];
    return firstItemNode;
}
//获取最后元素
function lastItem(itemNum) {
    if(itemNum == 0)
        return;
    var lastItemNode = containerParent.getElementsByTagName("div")[itemNum-1];
    return lastItemNode;
};
//左侧入
function leftIn() {
    var itemText = textGet();
    if(itemText == undefined){
        return;
    };
    itemNum = itemNumber();
    if(itemNum == 0){
        //js添加元素
        //containerParent.innerHTML = "<div style='width: 50px;background-color: red;display: inline-block;margin-left: 5px;margin-right: 5px;text-align: center'>"
           // +itemText+"</div>";
        //jQuery添加元素
        $("<div style='width: 50px;background-color: red;display: inline-block;margin-left: 5px;margin-right: 5px;text-align: center;flex: none'>"
            +itemText+"</div>").appendTo(containerParent).css({'height':itemText}).addClass(itemText);
    }else{
        var firstItemNode = firstItem(itemNum);
        $("<div style='width: 50px;background-color: red;display: inline-block;margin-left: 5px;margin-right: 5px;text-align: center;flex: none'>"
            +itemText+"</div>").insertBefore(firstItemNode).css({'height':itemText}).addClass(itemText);
    }
}
//右侧入
function rightIn() {
    var itemText = textGet();
    if(itemText == undefined){
        return;
    }
    itemNum = itemNumber();
    if(itemNum == 0){
        //js添加元素
        //containerParent.innerHTML = "<div style='width: 50px;background-color: red;display: inline-block;margin-left: 5px;margin-right: 5px;text-align: center'>"
           // +itemText+"</div>";
        //jQuery添加元素
        $("<div style='width: 50px;background-color: red;display: inline-block;margin-left: 5px;margin-right: 5px;text-align: center;flex: none'>"
            +itemText+"</div>").appendTo(containerParent).css({'height':itemText}).addClass(itemText);
    }else{
        var lastItemNode = lastItem(itemNum);
        $("<div style='width: 50px;background-color: red;display: inline-block;margin-left: 5px;margin-right: 5px;text-align: center;flex: none'>"
            +itemText+"</div>").insertAfter(lastItemNode).css({'height':itemText}).addClass(itemText);
    }
}
//左侧出
function leftOut() {
    var itemNum = itemNumber();
    if(itemNum == 0)
        return;
    var firstItemNode = firstItem(itemNum);
    //js删除元素
    //firstItemNode.parentNode.removeChild(firstItemNode);
    //jquery删除元素
    $(firstItemNode).remove();
    itemNum--;
    alert(itemNum);
}
//右侧出
function rightOut() {
    var  itemNum = itemNumber();
    if(itemNum == 0)
        return;
    var lastItemNode = lastItem(itemNum);
    //js删除元素
    //lastItemNode.parentNode.removeChild(lastItemNode);
    //jquery删除元素
    $(lastItemNode).remove();
    itemNum--;
    alert(itemNum);
}
function bubbleSort() {
    var allItems = $("#container div");
    for(var i=0;i<allItems.length;i++){
        allItems[i].setAttribute("order",i);
        //alert(allItems[i].getAttribute("order"));
    }
    for(var i=0;i<allItems.length;i++){
        for(var j=i;j<allItems.length;j++) {
            if (parseInt(allItems[i].style.height) > parseInt(allItems[j].style.height)) {
                //alert(parseInt(allItems[i].style.height));
                var temp = allItems[i].style.height;
                allItems[i].style.height = allItems[j].style.height;
                allItems[j].style.height = temp;
                //;
                //delay(1000);
            }
        }
    }
}
//初始化
function init() {
    document.getElementsByName("left-in")[0].addEventListener("click",function() {
        leftIn();
    });
    document.getElementsByName("right-in")[0].addEventListener("click",function() {
        rightIn();
    });
    document.getElementsByName("left-out")[0].addEventListener("click",function() {
        leftOut();
    });
    document.getElementsByName("right-out")[0].addEventListener("click",function() {
        rightOut();
    });
    document.getElementsByName("sort")[0].addEventListener("click",function() {
        bubbleSort();
    });
}
init();