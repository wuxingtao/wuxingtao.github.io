$(function(){
	
	var gallery = $('.swiper-container').swiper({
		slidesPerView:"auto",
		centeredSlides: true,
		watchActiveIndex: true,
		resizeReInit: true,
		keyboardControl: true,
		grabCursor: true,
		onImagesReady: function(){
		changeSize()
		}
	})

	function changeSize() {
		//Unset Width
		$('.swiper-slide').css('width','')
		//Get Size
		var imgWidth = $('.swiper-slide img').width();
		if (imgWidth+40>$(window).width()) imgWidth = $(window).width()-120;
		//Set Width
		$('.swiper-slide').css('width', imgWidth+40);
		console.log(imgWidth)
	}


	changeSize();
	$('.pageina .prev').on('click', function(e){
	  e.preventDefault()
	  gallery.swipePrev()
	})
	$('.pageina .next').on('click', function(e){
	  e.preventDefault()
	  gallery.swipeNext()
	})
	//Smart resize
	$(window).resize(function(){
		changeSize()
		gallery.resizeFix(true)	
	})

})
