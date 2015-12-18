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

	function changePageFromDataId() {
		var hash = this.getAttribute('data-id');
		renderPage(hash);
		location.hash = hash;
	}

	$('.left-nav').on('click', '.nav-link', changePageFromDataId);

	$('.menu').on('click', function(){
		$('body').toggleClass('body-show-menu');
	});

	$('.mobile-next-nav').on('click', '.mobile-next-btn', changePageFromDataId);


	function updateMobileNavLinks() {
		var $activeLink = $('.nav-content.active'),
			$navLinks = $('.nav-link'),
			$activeNavLink = $navLinks.filter('[data-id="'+$activeLink.data('id')+'"]'),
			navLinkIndex = $navLinks.index($activeNavLink);

		$('.banner-text').html(($activeNavLink.html() || 'welcome'));

		if (navLinkIndex > 0) {
			$('.mobile-next-btn[data-dir="back"]')
				.html($navLinks.eq(navLinkIndex - 1).html())
				.parent().removeClass('hide-mobile-nav').end()[0]
				.setAttribute('data-id', $navLinks.eq(navLinkIndex - 1).data('id'));
		} else {
			$('.mobile-next-btn[data-dir="back"]').text('').parent().addClass('hide-mobile-nav');
		}
		if (navLinkIndex < $navLinks.length) {
			$('.mobile-next-btn[data-dir="forward"]')
				.html($navLinks.eq(navLinkIndex + 1).html())[0]
				.setAttribute('data-id', $navLinks.eq(navLinkIndex + 1).data('id'));
		}
	}

	$(window).on('hashchange', renderPageFromHash);

	var imageMap = {
		'gifts': 'laughing.jpg',
		'love-story': 'whisper.jpg'
	};

	function renderPage(page) {
		$('.nav-content, .nav-link').removeClass('active')
			.filter('[data-id="'+page+'"]').addClass('active');

		$('.normal-background').css('background-image', imageMap[page] ? 'url("images/'+imageMap[page]+'")' : '');

		$('body').removeClass('body-show-menu');

		updateMobileNavLinks();
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