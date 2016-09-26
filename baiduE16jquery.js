$(document).ready(function() {
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	//使用jQuery的trim
	var cityValue = $.trim($("#aqi-city-input").val()).replace(/[\d]/g,'');
	if(cityValue == "") {
		alert("请输入城市,城市必须是中文或英文");
		return;
	}
	//使用jQuery的trim
	var valueValue = $.trim($("#aqi-value-input").val()).replace(/\D/g,'');
	if(valueValue == "") {
		alert("请输入空气质量,空气质量必须是整数");
		return;
	}
	//alert(cityValue + "," + valueValue);
	aqiData.cityData = cityValue;
	aqiData.valueData = valueValue;
	//alert(aqiData.cityData + "," + aqiData.valueData);
	return aqiData;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	//
	var trNode = document.createElement("tr");
	//
	var tdCityNode = document.createElement("td");
	var tdValueNode = document.createElement("td");
	var tdDelNode = document.createElement("td");
	//
	var tdBtnDelNode = document.createElement("button");
	//
	var tdCityTextNode = document.createTextNode(aqiData.cityData);
	var tdValueTextNode = document.createTextNode(aqiData.valueData);
	var tdDelTextNode = document.createTextNode("删除");
	//
	tdCityNode.appendChild(tdCityTextNode);
	tdValueNode.appendChild(tdValueTextNode);
	tdBtnDelNode.appendChild(tdDelTextNode);
	//
	tdDelNode.appendChild(tdBtnDelNode);
	//
	trNode.appendChild(tdCityNode);
	trNode.appendChild(tdValueNode);
	trNode.appendChild(tdDelNode);
	//
	trNode.childNodes[2].childNodes[0].addEventListener("click",function(event) {delBtnHandle(event)});
	//
	var tableNode = document.getElementById("aqi-table");
	tableNode.appendChild(trNode);
	//tableNode.append(trNode);
	// var trNode = "<tr><td>" + aqiData.cityData + "</td><td>" + aqiData.valueData + "</td><td><button>删除</button></td></tr>"
	// /*var trNode = */$("#aqi-table").append(trNode).on("click",function(event) {
	//   	delBtnHandle(event)
	//   });

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
	var removeTr = event.target.parentNode.parentNode;
	//var removeTr = event.target.parentNode;//.getAttribute("id");
	//alert(removeTr);
	removeTr.remove();
	//var removeTable = event.target.parentNode.parentNode.removeChild(removeTr);
	//alert(removeTable);
	//renderAqiList();
}



function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	$("#add-btn").bind("click",function() {
		addBtnHandle();
	});
	
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	
}

init();

});
//alert("ok");