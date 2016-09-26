/**
 * Created by SPACEY on 2016/9/10.
 */
var xmlHttp;

function ajaxForm(){
    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    }else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var userName = document.getElementById("user-name").value;
    var password0 = document.getElementById("password0").value;
    var sendData = "userName=" + userName + "&password0=" + password0;
    alert(sendData);
    xmlHttp.open("POST","http://localhost/PHPdemo0/PHPForm0/formHandle.php");
    //使用POST方法要setRequestHeadeer();
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.send(sendData);
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
            document.getElementById("showTr").innerHTML = xmlHttp.responseText;
            //alert(xmlHttp.responseText);
        }
    }
}

document.getElementById("ajax-btn").addEventListener("click",function(){
    //alert("ok");
    ajaxForm();
});