(function(){
	var $initialMask = $('.initial-mask'),
		$whiteMask = $('.white-mask');

	// $('<img src="images/flower_circle_logo.png">')
	// 	.on('load', function(){


			// setTimeout(function(){
				$whiteMask.addClass('hide');
				setTimeout(function(){
					$whiteMask.remove();
				}, 1000);
			// }, 0);
			// }, 2000);
		// });

	function changePageFromDataId() {
		var hash = this.getAttribute('data-id');
		renderPage(hash);
		location.hash = hash;

		// Scroll to the top (for mobile)
		$(window).scrollTop(0);
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
		if (navLinkIndex < $navLinks.length - 1) {
			$('.mobile-next-btn[data-dir="forward"]')
				.html($navLinks.eq(navLinkIndex + 1).html())[0]
				.setAttribute('data-id', $navLinks.eq(navLinkIndex + 1).data('id'));
		} else {
			$('.mobile-next-btn[data-dir="forward"]').text('');
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

(function(){

	var date_of_our_wedding = new Date('August 28, 2016 22:00 GMT'),
		countable_time = {};

	function getPrettyTime(num, stringSingular, isLast) {
		if (!isLast && !num) {
			return '';
		}

		return num + ' ' + stringSingular + (num === 1 ? '' : 's')
			+(!isLast ? ', ' : '');
	}

	function updateCounter() {
		var today = new Date(),
			millisecond_difference = date_of_our_wedding - today;
		countable_time.seconds = millisecond_difference/1000 >> 0;
		countable_time.minutes = countable_time.seconds/60 >> 0;
		countable_time.hours = countable_time.minutes/60 >> 0;
		countable_time.days = countable_time.hours/24 >> 0;
		countable_time.weeks = countable_time.days/7 >> 0;

		$('#time').html('');
		$('#time')
			// .append(countable_time.weeks.toLocaleString() + ' weeks<br>')
			// .append(countable_time.days.toLocaleString() + ' days<br>')
			// .append(countable_time.hours.toLocaleString() + ' hours<br>')
			// .append((countable_time.hours % 24) + ' hours modulo<br>')
			// .append(countable_time.minutes.toLocaleString() + ' minutes<br>')
			// .append((countable_time.minutes % 60) + ' minutes modulo<br>')
			// .append(countable_time.seconds.toLocaleString() + ' seconds<br>')
			// .append((countable_time.seconds % 60) + ' seconds modulo<br>')
			.append(
				// '<br>'+
				getPrettyTime(countable_time.days, 'day')+
				getPrettyTime(countable_time.hours % 24, 'hour')+
				getPrettyTime(countable_time.minutes % 60, 'minute')+
				getPrettyTime(countable_time.seconds % 60, 'second', true)
			);
	}

	updateCounter();

	setInterval(function(){
		updateCounter();
	}, 1000);

})();