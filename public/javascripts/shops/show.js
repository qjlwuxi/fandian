$(document).ready(function(){
	areaID = $.cookie("areaID");
	$('.back').attr('href',"/area/"+areaID);
});