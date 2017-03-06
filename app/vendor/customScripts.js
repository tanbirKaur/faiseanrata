
$(document).ready(function(){
	$(".tabs1").click(function(){

	var paramValue = getUrlParameter('param');
	console.log(paramValue);
	$('.nav-pills li').removeClass('active');
	$('#content div').removeClass('active');

	 if(paramValue==1){
	  $('#tnc').addClass('active');
	  $('#terms_n_cond').addClass('active').css("opacity","1");
	 } 
	 else if(paramValue==2){
	  $('#policy').addClass('active');
	  $('#privacy_policy').addClass('active').css("opacity","1");
	 } 
	 else if(paramValue==3){
	  $('#contact').addClass('active');
	  $('#contact_us').addClass('active').css("opacity","1");
	 }
	 else if(paramValue==4){
	  $('#aboutUs').addClass('active');
	  $('#about_us').addClass('active').css("opacity","1");
	 }
	 else if(paramValue==5){
	  $('#faq').addClass('active');
	  $('#f_a_q').addClass('active').css("opacity","1");
	 }
	});


});


  function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sParameterName = sPageURL.split('=');
        return sParameterName[1];
    };


function readUrl(input){
	if(input.files && input.files[0]){
	    var reader = new FileReader();

	    reader.onload = function (e) {
	        $('#profile-image')
	            .attr('src', e.target.result);
	    };

	    reader.readAsDataURL(input.files[0]);

	};
}