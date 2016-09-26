/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
//alert("ok");
var aqiData = {};

var i = 0;
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	//用trim去两端空格,此trim非jQuery的!!!
	//用正则,替换非中英文字符成空格,结果全空格则是错误
	var cityValue = document.getElementById("aqi-city-input").value.trim().replace(/[\d]/g,'');
	if(cityValue == ""){
		alert("请输入城市,城市必须是中文或英文");
		return false;
	}
	//用trim去两端空格,此trim非jQuery的!!!
	//用正则,替换非中英文字符成空格,结果全空格则是错误
	var valueValue = document.getElementById("aqi-value-input").value.trim().replace(/\D/g,'');
	if(valueValue == ""){
		alert("请输入空气质量,空气质量必须是整数");
		return false;
	}
	//给aqiData的属性赋值
	aqiData.cityData = cityValue;
	aqiData.valueData = valueValue;
	return aqiData;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	//var aqiData = addAqiData();
	//建立tr节点
	var trNode = document.createElement("tr");
	//建立td节点
	var tdCityNode = document.createElement("td");
	var tdValueNode = document.createElement("td");
	var tdDelNode = document.createElement("td");
	//建立td节点的text节点
	var tdCityTextNode = document.createTextNode(aqiData.cityData);
	var tdValueTextNode = document.createTextNode(aqiData.valueData);
	var tdDelTextNode = document.createTextNode("删除");
	//将text节点赋给td节点
	tdCityNode.appendChild(tdCityTextNode);
	tdValueNode.appendChild(tdValueTextNode);
	tdDelNode.appendChild(tdDelTextNode);
	//把tr节点添加子节点td
	trNode.appendChild(tdCityNode);
	trNode.appendChild(tdValueNode);
	trNode.appendChild(tdDelNode);
	//同时,给tr节点的第[2]子节点添加事件监听
	trNode.childNodes[2].addEventListener("click",function(event) {delBtnHandle(event)});
	//获得table节点,把tr添加到table
	var tableNode = document.getElementById("aqi-table");
	tableNode.appendChild(trNode);
	//alert(aqiData.cityData + "," + aqiData.valueData);
	//tableNode.getElementsByTagName("tr")[i+1]/*.getElementsByTagName("td")[2]*/.setAttribute("id","new-tr" + i);
	//document.getElementById("new-tr" + i).addEventListener("click",function(event) {delBtnHandle(event)});
	//
	
	//document.getElementsByTagName("tr")[i+1]
	//tableNode.
	//alert(i);
	//i++;
	
	//alert()
	
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	var flag = addAqiData();
	if(flag){
		renderAqiList();
	}
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
	//do sth.
	//注意!!!event.currentTarget和event.target因为绑定监听事件的元素和目标元素一致,体现不出区别!
	var removeTr = event.currentTarget.parentNode;//.getAttribute("id");
	//alert(removeTr);
	var removeTable = event.currentTarget.parentNode.parentNode.removeChild(removeTr);
	//alert(removeTable);
	//renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").addEventListener("click",function() {addBtnHandle()});
	//var btnClick = document.getElementById("add-btn");
	//btnClick.onClick = renderAqiList();
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	
}

init();