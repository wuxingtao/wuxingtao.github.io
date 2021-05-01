$(window).load(function () {
	setTimeout((function () {
		$('#welcome').slideUp(function () {
			$('#wrapper').slideDown(function () {
				$('.works-list').jScrollPane();
				$('.children-inside').hide();
				$('.current-inside').show();
			});
		});
	}), 500);
});

$(function () {

	$('#wrapper').hammer({ swipe_velocity: 0.5 }).on('swipeleft', '.container', function () {

		$('.current-inside').parent().parent().next().children('.title').click();

	}).on('swiperight', '.container', function (e) {

		$('.current-inside').parent().parent().prev().children('.title').click();
	});

	if ($.support.leadingWhitespace == true) {

		// 判断若不是 IE6/7/8

		$('.current-inside').delay(2000).slideDown();

	} else {

		$('.current-inside').slideDown();
	}

	$('.title').click(function () {

		var this_inside = $(this).next();

		if (this_inside.children('.current-inside').length == 0) {

			$('.current-inside').slideUp().removeClass('current-inside');
			this_inside.children('.children-inside').addClass('current-inside');
			var theOffset = $(this).parent().position().left,
				childrenOffset;
			if (theOffset > 490)
				for (var i = 0; i < 5; i++) {
					childrenOffset = $('.children:eq(' + i + ')').position().left;
					if (childrenOffset <= theOffset && childrenOffset > 490)
						$('.children:eq(' + i + ')').animate({ left: childrenOffset - 730 });
				}
			else
				for (var i = 0; i < 5; i++) {
					childrenOffset = $('.children:eq(' + i + ')').position().left;
					if (childrenOffset > theOffset && childrenOffset < 490)
						$('.children:eq(' + i + ')').animate({ left: childrenOffset + 730 });
				}
			$('.current-inside').delay(400).slideDown();

		}
	});

	$('#contact .sns-item').hover(function () {

		$('.sns-icon', this).addClass('rotate');
	}, function () {

		$('.sns-icon', this).removeClass('rotate');
	});

});
