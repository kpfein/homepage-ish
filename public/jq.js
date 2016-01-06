$(document).ready(function(){

	$('#tweet-content .tweet-compose').on('click', function(){
		$(this).css("height", "5em");
		$('#tweet-controls #tweet-submit, #tweet-controls #char-count').css("display", "inline-block");
	});

	$("#tweet-content .tweet-compose").keyup(function(){
		var max = 140;
		var length = $(this).val().length;
		var length = max - length;
		$("#char-count").text(length);
		if ((length <= 10) && (length > 0)){
			$("#char-count").css("color", "red");
			$('#tweet-controls #tweet-submit').prop('disabled', false);
		} else if (length < 0) {
			$("#char-count").css("color", "red");
			$('#tweet-controls #tweet-submit').prop('disabled', true);
		} else {
			$("#char-count").css("color", "#999");
			$('#tweet-controls #tweet-submit').prop('disabled', false);
		}
	});
});