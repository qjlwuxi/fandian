$(document).ready(function(){
	url = location.href;
	arr = url.match(/\d+(\.\d+)?/g);
	areaID = arr[arr.length-1];
	areaName = $("#areaNameValue").attr("value");
	$.cookie('areaID', areaID, { expires: 7, path: '/' });
	$.cookie('areaName', areaName, { expires: 7, path: '/' });
});