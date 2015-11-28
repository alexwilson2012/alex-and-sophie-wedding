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
			}, 0);
			// }, 2000);
		// });

	$('.left-nav').on('click', '.nav-link', function(){
		var hash = this.getAttribute('data-id');
		renderPage(hash);
		location.hash = hash;
	});

	$('.menu').on('click', function(){
		$('body').toggleClass('body-show-menu');
	})

	$(window).on('hashchange', renderPageFromHash);

	var imageMap = {
		'gifts': 'laughing.jpg',
		'love-story': 'whisper.jpg'
	};

	function renderPage(page) {
		$('.nav-content').removeClass('active')
			.filter('[data-id="'+page+'"]').addClass('active');

		$('.normal-background').css('background-image', imageMap[page] ? 'url("images/'+imageMap[page]+'")' : '');

		$('body').removeClass('body-show-menu');
	}

	function renderPageFromHash() {
		renderPage(location.hash.replace('#', ''));
	}

	// Autoload all images so they load supper duper smooth
	setTimeout(function(){
		var imageKeys = Object.keys(imageMap);
		for (var i = 0, key; (key = imageKeys[i]); ++i) {
			$('<img src="images/'+imageMap[key]+'" style="display: none;">').appendTo('body');
		}
	}, 500);

	renderPageFromHash();

})();