$(".answer-write input[type=submit]").click(addAnswer);
$(".link-delete-comment").click(deleteAnswer);
$(".link-modify-comment").click(answerForm);
$(".link-modify-comment-complete").click(modifyAnswer);

//.qna-comment-count
function answerForm(e) {
	e.preventDefault();
	
	var modifyBtn = $(this);
	var article = modifyBtn.closest("article");
	
	var writer = article.find(".article-author-name").text();
	var dateTime = article.find(".article-header-time").text();
	var comment = article.find(".comment-doc p").text();
	console.log(comment);
	var url = modifyBtn.attr("href");
	console.log("url : " + url);
	
	var modifyingAnswerTemplate = $("#modifyingAnswerTemplate").html();
	var template = modifyingAnswerTemplate.format(writer
			,dateTime
			,comment
			,url);
	article.replaceWith(template);
	
	$(".link-modify-comment-complete").click(modifyAnswer);
}


function modifyAnswer(e) {
	e.preventDefault();
	
	var modifyCompleteBtn = $(this);
	var url = modifyCompleteBtn.attr("href");
	var article = modifyCompleteBtn.closest("article");
	
	var queryString = article.find(".comment-doc textarea").serialize();
	console.log("url : " + url);
	
	$.ajax({
		type : "put",
		url : url,
		data : queryString,
		dataType : 'json',
		error : onError,
		success : onSuccess
	});
	
	
	function onError() {
		console.log("ajax error!!!");
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
		article.replaceWith(template);
		
		$(".answer-write textarea[name=content]").val("");
		$(".link-delete-comment").click(deleteAnswer);
		$(".link-modify-comment").click(answerForm);
	}
}

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
		window.location.replace("/users/loginForm");
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
		
		var cntComment = $(".qna-comment-count strong").text().trim();
		cntComment = parseInt(cntComment);
		cntComment += 1;
		$(".qna-comment-count strong").text(cntComment);
		$(".answer-write textarea[name=content]").val("");
		$(".link-delete-comment").click(deleteAnswer);
		$(".link-modify-comment").click(answerForm);
	}
}


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
				var cntComment = $(".qna-comment-count strong").text().trim();
				cntComment = parseInt(cntComment);
				cntComment -= 1;
				$(".qna-comment-count strong").text(cntComment);
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
