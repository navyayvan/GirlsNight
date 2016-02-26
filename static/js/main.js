$(document).ready(function() {
		console.log("******inside document");
		$('.hobby').on('click', function(e){
			console.log("******inside hobby");
	    e.preventDefault();
	    var myUrl = $(this).attr('href');
	    $.ajax({
	        method:'DELETE',
	        url: myUrl
	    }).done(function(){
	    	console.log('PG13**************');
	    });
	});
});
