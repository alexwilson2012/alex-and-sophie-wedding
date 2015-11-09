(function(){
	var $initialMask = $('.initial-mask'),
		$whiteMask = $('.white-mask');

	// $('<img src="images/flower_circle_logo.png">')
	// 	.on('load', function(){


			setTimeout(function(){
				$whiteMask.addClass('hide');
				setTimeout(function(){
					$whiteMask.remove();
				}, 1000);
			}, 2000);
		// });
})();