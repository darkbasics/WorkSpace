jQuery.noConflict();
jQuery(function() {
				jQuery('#mix_container').gridnav({
					type	: {
						mode		: 'disperse', 	// use def | fade | seqfade | updown | sequpdown | showhide | disperse | rows
						speed		: 500,			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows
						easing		: '',			// for fade, seqfade, updown, sequpdown, showhide, disperse, rows	
						factor		: '',			// for seqfade, sequpdown, rows
						reverse		: ''			// for sequpdown
					}
				});
			});
  jQuery(document).ready(function () {
	  // hide #back-top first
	jQuery("#back-top").hide();
	
	// fade in #back-top
	jQuery(function () {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 100) {
				jQuery('#back-top').fadeIn();
			} else {
				jQuery('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		jQuery('#back-top a').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
	  jQuery('#slider').nivoSlider();

      jQuery('.mycarousel_related').jcarousel({
		scroll: 1,
        wrap: 'circular'
    });
	jQuery('#mycarousel_related').jcarousel({
			wrap:'circular',
			scroll:1
		})
	    jQuery('#mycarouselleft').jcarousel({
    	wrap: 'circular',
		scroll: 1
    });
	jQuery("a[rel=example_group]").fancybox({
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'titlePosition' 	: 'over',
				'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
					return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
				}
			});
			
	jQuery(".cart_icon").click(function(){
		window.location = jQuery(this).parent().find('a').attr('href');
	});
	jQuery(".cart_icon").mouseenter(function(){
		jQuery(this).css('cursor', 'pointer');
	});
	jQuery(".cart_icon").mouseleave(function(){
		jQuery(this).css('cursor', 'normal');
	});
	
	jQuery("a.mycloud-zoom-gallery").click(function(e){
		e.preventDefault();
		jQuery('.product-img-box .product-image img').attr('src', jQuery(this).attr('href'));
	});
	
});


