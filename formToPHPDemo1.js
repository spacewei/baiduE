/**
 * Created by SPACEY on 2016/9/11.
 */
var xmlHttp;
//var sendData = {};
function JSONPData(data){
    var sendData = {};
    sendData.userName = document.getElementById("user-name").value;
    sendData.password0 = document.getElementById("password0").value;
    document.getElementById("showTr").innerHTML = "<td>用户名:" + sendData.userName + "</td><td>密码:" + sendData.password0 + "</td><td>" + data + "</td>";
    return sendData;
}
function ajaxForm(){

    //var sendData = "userName=" + userName + "&password0" + password0;
    //JSONPData();
    var serverScript = document.createElement("script");
    serverScript.type = "text/javascript";
    serverScript.src = "http://localhost/PHPdemo0/PHPForm0/formHandle0.php?callback=JSONPData";
    document.getElementsByTagName("head")[0].appendChild(serverScript);
}

document.getElementById("ajax-btn").addEventListener("click",function(){
    //alert("ok");
    ajaxForm();
});