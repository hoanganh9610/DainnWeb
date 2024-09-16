document.addEventListener('DOMContentLoaded', () => {
	customDropdownInNav();
	// carouselReviewNavColors();
	// normalizeCarouselSlidesHeight();
	initSwipers();
	mobileMenu();
	initScrolling();
	banner3();
});


window.addEventListener('resize', () => {
});


function banner3() {
	const banners = document.querySelectorAll('[banner-3]');

	if (banners.length > 0) {
		function loadCSS(url) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = url;
			document.head.appendChild(link);
		}
		const cssUrl = "https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&display=swap";
		loadCSS(cssUrl);

		const texts = document.querySelectorAll("[banner-3] .circle-text p");

		texts.forEach((text) => {
			const chars = text.innerText.split("");
			const radius = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--radius'), 10);
			const circumference = 2 * Math.PI * radius;
			const fontSize = circumference / chars.length / 2;
			const extraSpace = 10;
			const angle = (360 - extraSpace) / chars.length;

			text.innerHTML = chars
				.map(
					(char, i) =>
						`<span style="transform:rotate(${i * angle + extraSpace / 2}deg); font-size:${fontSize}px;">${char}</span>`
				)
				.join("");
		});
	}

}

function mobileMenu() {
	const openBtns = document.querySelectorAll('.open-menu');
	const menu = document.querySelector('.main-nav');

	function syncHeight() {
		document.documentElement.style.setProperty(
			"--window-inner-height",
			`${window.innerHeight} px`
		);
	}
	window.addEventListener("resize", syncHeight);

	let scrollY;

	function preventDefault(e) {
		e.preventDefault();
	}

	function closeMenu() {
		document.documentElement.classList.remove("is-locked");
		document.body.classList.remove('menu-opened');
		menu.removeEventListener("pointermove", preventDefault);
		window.scrollTo(0, scrollY);
	}

	function openMenu() {
		scrollY = window.scrollY;
		document.documentElement.classList.add("is-locked");
		document.body.classList.add('menu-opened');
		menu.addEventListener("pointermove", preventDefault);
	}

	openBtns.forEach(btn => {
		btn.addEventListener('click', function (event) {
			event.preventDefault();
			if (document.body.classList.contains('menu-opened')) {
				closeMenu();
			} else {
				openMenu();
			}
		});
	});
}

function initSwipers() {
	function duplicateSlides() {
		const sliders = document.querySelectorAll('.swiper-reviews');

		// sliders.forEach((slider) => {
		// 	const slides = slider.querySelectorAll('.swiper-slide');
		// 	const slidesLength = slides.length;

		// 	if (slidesLength > 0 && slidesLength < 10) {
		// 		const swiperContainer = slider.querySelector('.swiper-wrapper');
		// 		let currentIndex = 0;

		// 		for (let i = 0; i < 15; i++) {
		// 			const clonedSlide = slides[currentIndex].cloneNode(true);
		// 			swiperContainer.appendChild(clonedSlide);

		// 			currentIndex++;
		// 			if (currentIndex >= slidesLength) {
		// 				currentIndex = 0;
		// 			}
		// 		}
		// 	}
		// });

	}


	function initializeSwiper() {
		var x = document.getElementsByClassName("swiper-reviews");

		for (var i = 0; i < x.length; i++) {
			var el = x[i];
			var swiper = el;
			var nx = el.getElementsByClassName("swiper-button-next")[0];
			var pr = el.getElementsByClassName("swiper-button-prev")[0];

			if (swiper && nx && pr) {
				new Swiper(swiper, {
					allowTouchMove: false,
					centeredSlides: true,
					centeredSlidesBounds: true,
					centerInsufficientSlides: true,
					slidesPerView: 1,
					watchOverflow: true,
					watchSlidesProgress: true,
					// loop: true,
					spaceBetween: 24,

					speed: 500,
					breakpoints: {
						450: {
							slidesPerView: 'auto',
						},
					},
					navigation: {
						nextEl: nx,
						prevEl: pr
					}
				});
			}
		}
	}

	duplicateSlides();
	initializeSwiper();


	function initializeSwiper2() {
		var x = document.getElementsByClassName("swiper-reviews-2");

		for (var i = 0; i < x.length; i++) {

			var el = x[i];

			var swiper = el;
			var nx = el.getElementsByClassName("swiper-button-next")[0];
			var pr = el.getElementsByClassName("swiper-button-prev")[0];

			if (swiper && nx && pr) {
				new Swiper(swiper, {
					allowTouchMove: false,
					centeredSlides: true,
					slidesPerView: 1,
					watchOverflow: true,
					watchSlidesProgress: true,
					centeredSlidesBounds: true,
					spaceBetween: 24,
					speed: 500,
					breakpoints: {
						768: {
							slidesPerView: 3,
						},
					},
					navigation: {
						nextEl: nx,
						prevEl: pr
					},

				});
			}
		}
	}


	initializeSwiper2();

	function initializeSwiper3() {
		var x = document.getElementsByClassName("swiper-reviews-3");

		for (var i = 0; i < x.length; i++) {

			var el = x[i];

			var swiper = el;
			var nx = el.parentNode.parentNode.getElementsByClassName("swiper-button-next")[0];
			var pr = el.parentNode.parentNode.getElementsByClassName("swiper-button-prev")[0];

			console.log(nx)

			if (swiper && nx && pr) {
				new Swiper(swiper, {
					centeredSlides: true,
					slidesPerView: 1,
					watchOverflow: true,
					watchSlidesProgress: true,
					centeredSlidesBounds: true,
					spaceBetween: 24,
					speed: 500,
					breakpoints: {
						575: {
							slidesPerView: 'auto',
						},
					},
					navigation: {
						nextEl: nx,
						prevEl: pr
					},
				});
			}
		}
	}

	initializeSwiper3();

	function initializeSwiper4() {
		var x = document.getElementsByClassName("swiper-team-members");

		for (var i = 0; i < x.length; i++) {

			var el = x[i];

			var swiper = el;
			var nx = el.parentNode.parentNode.getElementsByClassName("swiper-button-next")[0];
			var pr = el.parentNode.parentNode.getElementsByClassName("swiper-button-prev")[0];

			console.log(nx)

			if (swiper && nx && pr) {
				new Swiper(swiper, {
					centeredSlides: true,
					slidesPerView: 1,
					watchOverflow: true,
					watchSlidesProgress: true,
					centeredSlidesBounds: true,
					spaceBetween: 24,
					speed: 500,
					breakpoints: {
						575: {
							slidesPerView: 'auto',
						},
					},
					navigation: {
						nextEl: nx,
						prevEl: pr
					},
				});
			}
		}
	}

	initializeSwiper4();
}


function carouselReviewNavColors() {
	const carouselItems = document.querySelectorAll('[carousel-review]');

	if (carouselItems && carouselItems.length > 0) {
		carouselItems.forEach(function (slider) {
			const sliderInner = slider.querySelector('.carousel-inner');

			slider.addEventListener('slide.bs.carousel', function (e) {
				const activeSlide = e.relatedTarget;

				if (activeSlide.hasAttribute("bright-contrast")) {
					sliderInner.parentNode.classList.add('bright-contrast');
				} else {
					sliderInner.parentNode.classList.remove('bright-contrast');
				}
			});

		});
	}

	carouselItems.forEach(function (slider) {
		const sliderInner = slider.querySelector('.carousel-inner');

		if (slider.querySelectorAll('.carousel-item')[0].hasAttribute("bright-contrast")) {
			sliderInner.parentNode.classList.add('bright-contrast');
		}
	});

}


function normalizeCarouselSlidesHeight() {
	const carouselItems = document.querySelectorAll('[carousel-review]');
	let maxHeight = 0;

	if (carouselItems && carouselItems.length > 0) {
		carouselItems.forEach(function (slider) {
			const slides = slider.querySelectorAll('.carousel-item');
			const sliderInner = slider.querySelector('.carousel-inner');
			let firstElHeight = 0;


			slides.forEach((slide, index) => {
				let itemHeight = slide.scrollHeight;
				maxHeight = Math.max(maxHeight, itemHeight);

				if (index === 0) {
					firstElHeight = slide.querySelector('.content-holder').scrollHeight;
				} else {
					slide.querySelector('.content-holder').style.maxHeight = `${firstElHeight}px`;
				}


			});

			sliderInner.style.height = maxHeight + 'px';
		});

	}
}


function customDropdownInNav() {
	const dropdowns = document.querySelectorAll('.header .dropdown .toggle-icon');

	function dropdownClickHandler(event, dropdown) {
		let targetElement = event.target;

		while (targetElement && !targetElement.matches('.toggle-icon')) {
			targetElement = targetElement.parentElement;
		}

		if (targetElement) {
			event.preventDefault();
			const dropdown = targetElement;
			dropdown.parentElement.parentElement.classList.toggle('active');
		}
	};

	function addEventListeners() {
		dropdowns.forEach(dropdown => {
			dropdown.addEventListener('click', dropdownClickHandler);
		});
	}

	function removeEventListeners() {
		dropdowns.forEach(dropdown => {
			dropdown.removeEventListener('click', dropdownClickHandler);
		});
	}

	function handleResize() {
		if (window.innerWidth < 992) {
			addEventListeners();
		} else {
			removeEventListeners();
		}
	}

	handleResize();

	window.addEventListener('resize', handleResize);
}

var toggleFormState = function (form, disable) {
	form.find('button[type="submit"]').prop('disabled', disable);
	form.find('.js-submit-init').toggleClass('invisible', disable);
	form.find('.js-submit-busy').toggle(disable);
};

var clearForm = function (form) {
	form.find('input').not('[type="hidden"]').val('');
	form.find('textarea').val('');
};

var showMessage = function (form, selector) {
	form.find(selector).fadeIn();
	setTimeout(function () {
		form.find(selector).fadeOut();
	}, 2500);
};

var submitBegin = function () {
	var form = $(this);
	toggleFormState(form, true);
};

var submitSuccess = function () {
	var form = $(this);
	showMessage(form, '.js-submit-message-success');
	setTimeout(function () {
		clearForm(form);
		toggleFormState(form, false);
	}, 500);
};

var submitFailure = function (xhr) {
	console.log(`Status: ${xhr.status},\nMessage: ${xhr?.responseJSON?.message},\nMessage: ${xhr?.responseJSON?.Errors}`);
	var form = $(this);
	showMessage(form, '.js-submit-message-failure');
	setTimeout(function () {
		toggleFormState(form, false);
	}, 500);
};

function initScrolling() {
	const stickyNav = document.querySelector('nav.sticky-top');
	const stickyNavHeight = stickyNav ? stickyNav.offsetHeight : 0;

	function scrollToTarget(targetId) {
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - stickyNavHeight;
			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}

	document.querySelectorAll('[data-element-udi]').forEach(function (element) {
		element.id = 'element-' + element.getAttribute('data-element-udi').split('/').pop();
	});

	if (window.location.hash) {
		const targetId = window.location.hash.substring(1);
		scrollToTarget(targetId);
	}

	document.querySelectorAll('a[href^="#element-"]').forEach(function (link) {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			const targetId = link.getAttribute('href').substring(1);
			scrollToTarget(targetId);
			history.pushState(null, null, link.getAttribute('href'));
		});
	});
}