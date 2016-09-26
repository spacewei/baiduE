/**
 * Created by SPACEY on 2016/8/28.
 */
/*表单配置JSON*/
var inputConfigure = {
    textType:{
        label:"输入框",
        type:"text",
        validator: {},
        rules:"长度是4~16字符",
        styleSheet:["textStyle0","textStyle1"],
        successMessage:"输入框格式正确",
        failMessage:"长度不足或为空",
        formName:"",
        formStyle:"",
    },
    radioType:{
        label:"单选框",
        type:"radio",
        validator:function(){
            validateOptionNumber();
        },
        rules:"至少有两个选项",
        styleSheet:["radioStyle0","radioStyle1"],
        successMessage:"选项数量正确",
        failMessage:"选项数量不足或为空"
    },
    checkboxType:{
        label:"多选框",
        type:"checkbox",
        validator:function(){
            validateOptionNumber();
        },
        rules:"长度是4~16字符",
        styleSheet:["checkboxStyle0","checkboxStyle1"],
        successMessage:"选项数量正确",
        failMessage:"选项数量不足或为空"
    },
    selectType:{
        label:"下拉框",
        type:"select",
        validator:function(){
            validateOptionNumber();
        },
        rules:"长度是4~16字符",
        styleSheet:["selectStyle0","selectStyle1"],
        successMessage:"选项数量正确",
        failMessage:"选项数量不足或为空"
    },
    textareaType:{
        label:"文本域",
        type:"textarea",
        validator: {number:function(){
                                numberValidate();
                            },
                    letter:function(){
                                letterValidate();
                            }
                    },
        rules:"长度是4~16字符",
        styleSheet:["textareaStyle0","textareaStyle1"],
        successMessage:"文本域格式正确",
        failMessage:"长度不足或为空"
    },
};

/*遍历得到选择的type radio的value*/
function getTypeSelect(typeRadioArray) {
    var typeSelectResult;
    for(var i=0;i<typeRadioArray.length;i++){
        if(typeRadioArray[i].checked){
            //alert(i);
            typeSelectResult = typeRadioArray[i].value;
            //alert(typeSelectResult);
        }
    }
    return typeSelectResult;
}
/*依据type选择结果,调用inputConfigure渲染配置输入区和规则输入区*/
function getTypeConfigure(typeSelectResult) {
    var typeSelectJson;
    switch (typeSelectResult){
        case "text":
            typeSelectJson = inputConfigure.textType;
        break;
        case "radio":
            typeSelectJson = inputConfigure.radioType;
        break;
        case "checkbox":
            typeSelectJson = inputConfigure.checkboxType;
        break;
        case "select":
            typeSelectJson = inputConfigure.selectType;
        break;
        case "textarea":
            typeSelectJson = inputConfigure.textareaType;
        break;
    }
    //alert(typeSelectJson.label);
    return typeSelectJson;
}
function renderConfigureMenu(typeSelectJson) {
    var styleMenuNode = document.getElementById("input-style");
    var ruleRadioDivNode = document.getElementById("rule-configure");
    document.getElementById("input-name").value = typeSelectJson.label;
    //清空之前的样式选项
    styleMenuNode.innerHTML = "";
    //增加对应的样式选项
    for(var i=0;i<typeSelectJson.styleSheet.length;i++){
        styleMenuNode.innerHTML += "<option value='" + typeSelectJson.styleSheet[i] + "'>样式" + (i+1) + "</option>";
    }
    //alert(typeSelectJson.type == "text");
    if(typeSelectJson.type == "text" || typeSelectJson.type == "textarea"){
        ruleRadioDivNode.innerHTML = "";
        ruleRadioDivNode.innerHTML = "<input id='number-radio' name='input-rule-radio' type='radio' value='number' checked='checked'>" +
            "<label for='number-radio'>数字</label>" +
            "<input id='letter-radio' name='input-rule-radio' type='radio' value='letter'>" +
            "<label for='letter-radio'>字母</label>";
        ruleRadioDivNode.innerHTML += "<br><label for='input-text-number'>输入字数限制</label>";
        ruleRadioDivNode.innerHTML += "<input id='input-text-number' type='number'>"
    }
    if(typeSelectJson.type == "radio" || typeSelectJson.type == "checkbox" || typeSelectJson.type == "select"){
        ruleRadioDivNode.innerHTML = "";
        ruleRadioDivNode.innerHTML = "<label for='input-option' style='vertical-align: top'>请输入选项</label>" +
            "<textarea id='input-option' placeholder='输入选项用空格或回车隔开'></textarea>" +
            "<button id='option-btn' style='vertical-align: top'>提交选项</button>"
    }
}


/*
读取构建表单的配置总工厂
 */
function readFormConfigure(formNameId,formStyleId,formRuleId,renderJson) {
    //alert(renderJson.type);
    //声明读取的返回规则对象
    var rulesObj = {};
    //得到新表单的名字值
    rulesObj.formName = document.getElementById(formNameId).value;
    //得到新表单选定的样式
    rulesObj.formStyle = document.getElementById(formStyleId).value;
    //得到新表单的规则输入的父节点
    var formRuleNode = document.getElementById(formRuleId);
    //获取text输入类的rule
    if(renderJson.type == "text" || renderJson.type == "textarea"){
        //alert("text类获取规则");
        var textInputRuleArray = document.getElementsByName("input-rule-radio");
        for(var i=0;i<textInputRuleArray.length;i++){
            if(textInputRuleArray[i].checked){
                rulesObj.textInputRule = textInputRuleArray[i].value;
            }
        }
    }
    //获取选择类表单的rule
    //先声明数组??
    rulesObj.optionArray = [];
    var j=0;
    if(renderJson.type == "radio" || renderJson.type == "checkbox" || renderJson.type == "select"){
        //alert("选项类获取规则")
        var optionArrayOld = document.getElementById("input-option").value.split(/\n+|\s+/g);
        //alert(optionArrayOld);
        for(var i=0;i<optionArrayOld.length;i++){
            if(optionArrayOld[i] != ""){
                rulesObj.optionArray[j] = optionArrayOld[i];
                j++;
            }
        }
        //alert(rulesObj.optionArray);
    }
    return rulesObj;
}

/*
* 渲染总工厂
* */
function renderAddForm(rulesObj,addFormDivId,renderJson) {
    //获取新表单的父节点
    var addFormDiv = document.getElementById(addFormDivId);
    //正式渲染!!!
    renderText(rulesObj,addFormDiv,renderJson);
    renderTextarea(rulesObj,addFormDiv,renderJson);
    renderRadio(rulesObj,addFormDiv,renderJson);
    renderSelect(rulesObj,addFormDiv,renderJson);
}
/*
* text的渲染产线*/
function renderText(rulesObj,addFormDiv,renderJson){
    if(renderJson.type == "text"){
        //alert("渲染text");
        addFormDiv.innerHTML = "";
        addFormDiv.innerHTML = "<label for='new-input'>" + rulesObj.formName + "</label>" +
            "<input id='new-input' type='text'>";
        addFormDiv.innerHTML += "<button id='new-text-btn'>提交</button>";
    }
}
/*
textarea的渲染产线
 */
function renderTextarea(rulesObj,addFormDiv,renderJson){
    if(renderJson.type == "textarea"){
        //alert("渲染textarea");
        addFormDiv.innerHTML = "";
        addFormDiv.innerHTML = "<label for='new-input' style='vertical-align: top'>" + rulesObj.formName + "</label>" +
            "<textarea id='new-input'></textarea>";
        addFormDiv.innerHTML += "<button id='new-text-btn' style='vertical-align: top'>提交</button>";
    }
}
/*
radio的渲染产线
 */
function renderRadio(rulesObj,addFormDiv,renderJson){
    if(renderJson.type == "radio" || renderJson.type == "checkbox"){
        //alert("渲染选项");
        addFormDiv.innerHTML = "";
        for(var i=0;i<rulesObj.optionArray.length;i++){
            addFormDiv.innerHTML += "<input id='new-input" + i +
                "' name='new-input' type='" + renderJson.type +
                "' value='"+ rulesObj.optionArray[i] +"'>" + "<label for='new-input" + i + "'>" + rulesObj.optionArray[i] +
                "</label>";
        }
    }
}
/*
select的渲染产线
 */
function renderSelect(rulesObj,addFormDiv,renderJson){
    if(renderJson.type == "select"){
        addFormDiv.innerHTML = "";
        if(rulesObj.optionArray.length != 0)
            addFormDiv.innerHTML = "<select id='new-select' name='new-input'></select>";
        for(var i=0;i<rulesObj.optionArray.length;i++){
            document.getElementById("new-select").innerHTML += "<option value='"+ rulesObj.optionArray[i] +"'>"+ rulesObj.optionArray[i] +"</option>"
        }
    }
}
//初始化选择表单类型
function init(){
    var typeRadioArray = document.getElementsByName("type-all");
    var typeSelectResult;
    var typeSelectJson;
    for(var i=0;i<typeRadioArray.length;i++) {
        if (typeRadioArray[i].checked) {
            typeSelectResult = typeRadioArray[i].value;
            typeSelectJson = getTypeConfigure(typeSelectResult);
            renderConfigureMenu(typeSelectJson);
        }
    }
    return typeSelectJson;
}

function main() {
    var typeRadioArray = document.getElementsByName("type-all");
    var typeSelectResult;
    var typeSelectJson;
    var rulesObj;
    //初始化选择表单类型
    typeSelectJson = init();
    //给每个type radio添加Change事件监听
    for(var i=0;i<typeRadioArray.length;i++) {
        typeRadioArray[i].addEventListener("change", function () {
            typeSelectResult = getTypeSelect(typeRadioArray);
            typeSelectJson = getTypeConfigure(typeSelectResult);
            renderConfigureMenu(typeSelectJson);
            //alert("change");
        })
    }
    //add的点击事件,得到表单配置的参数,并生成表单
    document.getElementById("add-btn").addEventListener("click",function() {
        rulesObj = readFormConfigure("input-name","input-style","rule-configure",typeSelectJson);
        renderAddForm(rulesObj,"show-form",typeSelectJson);
    });

}
main();
