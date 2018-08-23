$(".answer-write input[type=submit]").click(addAnswer);

function addAnswer(e) {
	e.preventDefault();
	console.log("click me");
	
	var queryString = $(".answer-write").serialize();
	console.log("query : " + queryString);
	var url = $(".answer-write").attr("action");
	console.log("url : " + url);
	$.ajax({
			type : "post",
			url : url,
			data : queryString,
			dataType : 'json',
			error : onError,
			success : onSuccess
	});
	
	function onError() {
		console.log("ajax failed!!!");
	}

	function onSuccess(data, status) {
		console.log("ajax success!!!");
		console.log(data);
		var answerTemplate = $("#answerTemplate").html();
		var template = answerTemplate.format(data.writer.userId
				,data.formattedCreateDate
				,data.content
				,data.question.id
				,data.id);
		$(".answer-write").before(template);
		$(".answer-write textarea[name=content]").val("");
		$(".link-delete-article").click(deleteAnswer);
	}
}

$(".link-delete-article").click(deleteAnswer);

function deleteAnswer(e) {
	e.preventDefault();
	
	var deleteBtn = $(this);
	var url = deleteBtn.attr("href");
	console.log("url : " + url);
	$.ajax({
		type : 'delete',
		url : url,
		dataType : 'json',
		error : function (xhr, status) {
			console.log("error");
		},
		success : function (data, status) {
			console.log("success");
			console.log(data);
			if (data.valid) {
				deleteBtn.closest("article").remove();
			} else {
				alert(data.errorMessage);
			}
		}
	});
	
}

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};
