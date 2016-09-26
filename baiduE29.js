/**
 * Created by SPACEY on 2016/8/26.
 */
var password = "";
function validate() {
    //var countCode;
    var inputLength = 0;
    var formValue0 = document.getElementById("form00").value;
    //alert(formValue0);
    var alertLabel = document.getElementById("form-label0");
    if(formValue0 == ""){
        alertLabel.innerHTML = "名称不能为空";
    }else{
        for(var i=0;i<formValue0.length;i++){
            var countCode = formValue0.charCodeAt(i);
            //alert(countCode);
            if (countCode >= 0 && countCode <=128) {
                inputLength = inputLength + 1;
                //alert(inputLength);
            } else {
                inputLength = inputLength + 2;
            }
        }
        //alert(inputLength);
        if(inputLength >=4 && inputLength <=16){
            alertLabel.innerHTML = "格式正确";
            //alert("格式正确");
        }else{
            alertLabel.innerHTML = "字符长度要是4~16";
            //alert("字符长度是4~16");
        }
    }
}

function validate2(form,formMessage) {
    var inputLength = 0;
    var formValue0 = document.getElementById(form).value;
    //alert(formValue0);
    var alertLabel = document.getElementById(formMessage);
    if(formValue0 == ""){
        alertLabel.innerHTML = "名称不能为空";
        return false;
    }else{
        for(var i=0;i<formValue0.length;i++){
            var countCode = formValue0.charCodeAt(i);
            if (countCode >= 0 && countCode <=128) {
                inputLength = inputLength + 1;
            } else {
                inputLength = inputLength + 2;
            }
        }
        if(inputLength >=4 && inputLength <=16){
            alertLabel.innerHTML = "格式正确";
            return true;
        }else{
            alertLabel.innerHTML = "字符长度要是4~16";
            return false;
        }
    }
}

function showMessageName(formLabel) {
    //document.getElementById(formLabel).innerHTML = "字符长度要是4~16";
    document.getElementById(formLabel).innerHTML = "字符长度要是4~16";
}

function showMessagePassword(formLabel) {
    //document.getElementById(formLabel).innerHTML = "字符长度要是4~16";
    document.getElementById(formLabel).innerHTML = "密码必须是数字或字母,不区分大小写";
}

function validatePassword(passwordId,formLabel) {
    var passwordInput = document.getElementById(passwordId).value.replace(/[^\w\.\/]/ig,"");
    //alert(password);
    var formLabelNode = document.getElementById(formLabel);
    if(passwordInput == ""){
        //alert("密码必须是数字或字母,不区分大小写");
        //document.getElementById(passwordId).style.value = "";
        //alert(password);
        formLabelNode.innerHTML = "格式错误";
        return false;
    }else if(passwordInput.length >= 3) {
        //alert("密码格式正确");
        formLabelNode.innerHTML = "密码格式正确";
        password = passwordInput;
        return true;
    }else {
        formLabelNode.innerHTML = "位数不够或输入有非英文或数字";
        return false;
    }
}

function showMessagePassword2(formLabel) {
    document.getElementById(formLabel).innerHTML = "请再次输入密码";
}

function validatePassword2(formId,formLabel) {
    var passwordInput = document.getElementById(formId).value;
    var formLabelNode = document.getElementById(formLabel);
    if(passwordInput == ""){
        formLabelNode.innerHTML = "请再次输入密码!";
        return false;
    }else if(passwordInput == password) {
        //alert(passwordInput);
        formLabelNode.innerHTML = "密码相同";
        return true;
    }else{
        formLabelNode.innerHTML = "密码不相同";
        return false;
    }
}
function validateSubmit(form,form1Name,formPassword,formPassword2,formNameLabel,formPasswordLabel,formPassword2Label){
    var formAll = document.getElementById(form);
    var validateName = validate2(form1Name,formNameLabel);
    var validatePassword1Result = validatePassword(formPassword,formPasswordLabel);
    var validatePassword2Result = validatePassword2(formPassword2,formPassword2Label);
    alert("运行");
    if((validateName && validatePassword1Result && validatePassword2Result)){
        alert("全部提交正确");
        formAll.submit();
    }else{
        alert("填写有误");
    }
}

function init() {
    document.getElementById("form00-btn").addEventListener("click",function() {
        validate();
    });
    document.getElementById("form11").addEventListener("focus",function() {
        //alert("focus");
        showMessageName("form-label11");
        //validate2("form11","form-label11");
    });
    document.getElementById("form11").addEventListener("blur",function() {
        //alert("blur");
        validate2("form11","form-label11");
    });
    document.getElementById("form12").addEventListener("focus",function() {
        showMessagePassword("form-label12");
    });
    document.getElementById("form12").addEventListener("blur",function() {
        validatePassword("form12","form-label12");
        //alert(password);
    });
    document.getElementById("form13").addEventListener("focus",function() {
        showMessagePassword2("form-label13");
    });
    document.getElementById("form13").addEventListener("blur",function() {
        validatePassword2("form13","form-label13");
        //alert(password);
    });
    document.getElementById("form11-btn").addEventListener("click",function(e) {
        e.preventDefault();
        alert("提交触发");
        validateSubmit("form-all","form11","form12","form13","form-label11","form-label12","form-label13");
    });
}

init();