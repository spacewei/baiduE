/**
 * Created by SPACEY on 2016/8/27.
 */
var schoolForRegion = {
    "beijing":[{nameS:"清华",val:"qinghua"},{nameS:"北大",val:"beida"},{nameS:"北航",val:"beihang"}],
    "shanghai":[{nameS:"复旦",val:"fudan"},{nameS:"上交大",val:"shangjiaoda"},{nameS:"上海大学",val:"shanghai-college"}],
    "guilin":[{nameS:"桂林电子科技大学",val:"guidian"},{nameS:"桂林理工大学",val:"guiligong"}]
};
var region;
var password;
function atSchoolSelected(radioIdentityStudent,radioIdentityWorker) {
    var radioStudent = document.getElementById(radioIdentityStudent).checked;
    var radioWorker = document.getElementById(radioIdentityWorker).checked;
    if(radioStudent){
        document.getElementById("form-details-student").style.display = "block";
        document.getElementById("form-details-worker").style.display = "none";
        region = document.getElementById("select-school-region").value;
        renderSchoolSelect(region,"select-school");
    }
    if(radioWorker){
        document.getElementById("form-details-worker").style.display = "block";
        document.getElementById("form-details-student").style.display = "none";
    }
}
function setSchoolSelect(regionSelectId,renderObj) {
    //alert(regin);
    region = document.getElementById(regionSelectId).value;
    //alert(region);
    renderSchoolSelect(region,renderObj);
}
function renderSchoolSelect(regionInput ,renderObj) {
    //alert(regionInput);
    //alert(renderObj);
    var renderObjNode = document.getElementById(renderObj);
    switch (regionInput){
        case "beijing" :
            renderObjNode.innerHTML = "";
            for(var i=0;i<schoolForRegion.beijing.length;i++){
                renderObjNode.innerHTML += "<option value='"+schoolForRegion.beijing[i].val+"'>"+schoolForRegion.beijing[i].nameS+"</option>";
            }
            break;
        case "shanghai" :
            renderObjNode.innerHTML = "";
            for(var i=0;i<schoolForRegion.shanghai.length;i++){
                renderObjNode.innerHTML += "<option value='"+schoolForRegion.shanghai[i].val+"'>"+schoolForRegion.shanghai[i].nameS+"</option>";
            }
            break;
        case "guilin" :
            renderObjNode.innerHTML = "";
            for(var i=0;i<schoolForRegion.guilin.length;i++){
                renderObjNode.innerHTML += "<option value='"+schoolForRegion.guilin[i].val+"'>"+schoolForRegion.guilin[i].nameS+"</option>";
            }
            break;
    }
}
function validateName(inputFormId,showId) {
    var inputName = document.getElementById(inputFormId).value.replace(/[^\u4e00-\u9fa5]/g,'');
    //alert(inputName);
    if(inputName == ""){
        showLabel("输入不能是空,且只能输入中文",showId);
        return false;
    }else{
        showLabel("输入正确",showId);
        return true;
    }

}
function validatePassword0(inputPasswordId,showId) {
    var getPassword = document.getElementById(inputPasswordId).value;
    var getPasswordRegular = getPassword.replace(/[^\w\.\/]/ig,"");
    //alert(getPasswordRegular);
    //alert(getPassword.length>=3);
    if(getPassword !== getPasswordRegular){
        showLabel("只能含数字和字母,至少有3位",showId);
        return false;
    }
    if(getPassword.length<3){
        showLabel("至少有3位",showId);
        return false;
    }
    if(getPassword === ""){
        showLabel("请输入密码!",showId);
        return false;
    }
    showLabel("格式正确",showId);
    password = getPassword;
    return true;
}
function validatePassword1(inputPasswordId,showId) {
    var getPassword = document.getElementById(inputPasswordId).value;
    if(getPassword === password){
        showLabel("密码相同",showId);
        return true;
    }else{
        showLabel("密码不相同",showId);
        return false;
    }
}
function validateSumbit() {
    var nameFlag = validateName("input-name","input-name-show");
    var password0Flag = validatePassword0("input-password-0","input-password-0-show");
    var password1Flag = validatePassword1("input-password-1","input-password-1-show");
    if(nameFlag && password0Flag && password1Flag){
        alert("全部提交正确");
        document.getElementById("form-identity").submit();
        document.getElementById("form-details-student").submit();
        document.getElementById("form-details-worker").submit();
        document.getElementById("form-details").submit();
    }else{
        alert("未完成填写");
    }
}
function showLabel(str,showId) {
    document.getElementById(showId).innerHTML = str;
}


function init(){
    document.getElementById("form-identity").addEventListener("click",function(){
        atSchoolSelected("radio-identity-student","radio-identity-worker");
    });
    document.getElementById("select-school-region").addEventListener("change",function(){
        setSchoolSelect("select-school-region","select-school");
    });
    document.getElementById("input-name").addEventListener("blur",function(){
        validateName("input-name","input-name-show");
    });
    document.getElementById("input-password-0").addEventListener("blur",function(){
        validatePassword0("input-password-0","input-password-0-show");
        //alert(x);
    });
    document.getElementById("input-password-1").addEventListener("blur",function(){
        validatePassword1("input-password-1","input-password-1-show");
        //alert(x);
    });
    document.getElementById("sumbit-btn").addEventListener("click",function(e){
        e.preventDefault();
        validateSumbit();
        //alert(x);
    });

}
//alert(document.getElementById("input-name").value);


init();