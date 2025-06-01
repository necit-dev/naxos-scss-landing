const burger = document.querySelector('#burger');
const body = document.querySelector('body')
const header_nav = document.querySelector('.header__nav')
const nav = document.querySelector('.nav')

burger.addEventListener('click', () => {
	if (burger.classList.contains('nav__burger-cross')){
		burger.classList.remove('nav__burger-cross');
		body.classList.remove('no-scroll');
		header_nav.classList.remove('header__nav-mobile');
		nav.classList.remove('nav-mobile');
	}else {
		window.scroll(0,0);
		burger.classList.add('nav__burger-cross');
		body.classList.add('no-scroll');
		header_nav.classList.add('header__nav-mobile');
		nav.classList.add('nav-mobile');
	}
})


let reviewsJson;
const reviewText = document.querySelector('.reviews__review-text')
const reviewsPlace = document.querySelector('.reviews__review');
let reviewsPlaceNumber = 0;

const swiper = new Swiper("#sponsors-swiper", {
	slidesPerView: 2,
	loop: true,
	breakpoints: {
		564:{
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		1024: {
			slidesPerView: 5,
		},
	}
});

const changeReview = () => {
	const currentSlide = document.querySelector('#reviews-swiper').querySelector(".swiper-slide-active");
	let number = parseInt(currentSlide.getAttribute('aria-label').toString()) - 1;
	// reviewText.textContent = reviewsJson[number].text
	console.log(reviewsPlace.querySelector(`[data-number="${reviewsPlaceNumber}"]`));
	reviewsPlace.querySelector(`[data-number="${reviewsPlaceNumber}"]`).classList.add('nonefake');
	reviewsPlace.querySelector(`[data-number="${number}"]`).classList.remove('nonefake');
	reviewsPlaceNumber = number;
}

const swiper_img = new Swiper("#reviews-swiper",{
	slidesPerView: 2,
	centeredSlides: true,
	slideToClickedSlide: true,
	breakpoints: {
		384:{
			slidesPerView: 3,
		},
		768: {
			slidesPerView: 4,
		},
		1024: {
			slidesPerView: 5,
		},
	}
});



const readReviewsJson = () => {
	fetch('./js/jsons/reviews.json')
		.then(response => response.json())
		.then(json => {
			reviewsJson = json;
			console.log(reviewsPlace);
			if (reviewsJson.length > 0)
			reviewsPlace.insertAdjacentHTML('beforeend', `
				<div class="reviews__review-item" data-number="0">
					<span class="reviews__caws">&#xf10d;</span>
					<span class="reviews__review-text">
						${reviewsJson[0].text}
					</span>
					<span class="reviews__caws">&#xf10e;</span>
				</div>
			`)
			for (let i = 1; i < reviewsJson.length; i++){
				reviewsPlace.insertAdjacentHTML('beforeend', `
					<div class="reviews__review-item nonefake" data-number="${i}">
						<span class="reviews__caws">&#xf10d;</span>
						<span class="reviews__review-text">
							${reviewsJson[i].text}
						</span>
						<span class="reviews__caws">&#xf10e;</span>
					</div>
				`)
			}
		});
}

swiper_img.on('slideNextTransitionEnd', changeReview)

swiper_img.on('slidePrevTransitionEnd', changeReview)

readReviewsJson();