jQuery.browser={};(function(){jQuery.browser.msie=false;
jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){
jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();

/////// FRONTEND FUNCTIONS ///////

function tabNav(selector, content) {

    $(selector).parent().parent().children().eq(0).addClass('js-active');
    $(content).children().eq(0).show().addClass('js-active'); 

    $(selector).on('click', function(e){
        e.preventDefault();

        var active = $(this),
            activeHref = active.attr('jhref'),
            activeParent = active.parent(),
            selectorParent = $(selector).parent(),
            contentActive = $(content).find('.js-active');

            console.log(activeHref);

        if(!activeParent.hasClass('js-active')) {

            selectorParent.removeClass('js-active');
            activeParent.addClass('js-active');

            $(content).find('.js-active').removeClass('js-active').fadeOut(function() {
                $('#' + activeHref).addClass('js-active').slideDown(400);
            });
        }
    });
}

function accordion(selector) {
    $(selector).click(function(e) {
        e.preventDefault();

        // set variables
        var activeLists = $(selector).parent().parent().find('.js-active'),
            activeListsDropdown = activeLists.children().eq(1),
            clickedItem = $(this).parent(),
            clickedItemDropdown = clickedItem.children().eq(1);


        if (!clickedItem.hasClass('js-active')) {

            activeLists.removeClass('js-active');
            activeListsDropdown.slideUp();
            clickedItem.addClass('js-active');
            clickedItemDropdown.slideDown();
        }

    })
}

function textSlider(navControl, container) {
    var firstC = $(container).children().first(),
        lastC = $(container).children().last();

    // add first and last classes
    firstC.addClass('js-first');
    lastC.addClass('js-last');

    $(navControl).click(function() {
        var activeObj = $(container).find('.js-active');
        if ( $(this).attr('dir') == 'next') {

            if ( activeObj.hasClass('js-last') ) {
                activeObj.removeClass('js-active');
                firstC.addClass('js-active');
            }
            activeObj.removeClass('js-active').next().addClass('js-active');

        } else {

            if ( activeObj.hasClass('js-first') ) {
                activeObj.removeClass('js-active');
                lastC.addClass('js-active');
            }
            activeObj.removeClass('js-active').prev().addClass('js-active');

        }
    })
}

//////// check if element is in view //////

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

    /*Add leading zeros to single digit numbers*/
    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

	//  ---------------------------------------------------------
    //  IE-safe console.log() shortcut
    //
    //  Usage: pr('text to be printed with console.log()');
    //  ---------------------------------------------------------
	function pr(data, bypass) {
		if (jQuery.browser.msie) {
            if(bypass == true) {
                console.log(data);
            }
        } else {
			console.log(data);
		}
	}

	//  ---------------------------------------------------------
    //  Function for fixing placeholder problems if not supported
    //
    //  Usage: placeholdersFix();
    //  ---------------------------------------------------------

    function placeholdersFix() {

		jQuery.support.placeholder = false;
		contactInputs = document.createElement('input');
		contactTextarea = document.createElement('textarea');
		
	 	if('placeholder' in contactInputs || 'placeholder' in contactTextarea) jQuery.support.placeholder = true;
	 	
      if(!$.support.placeholder) { 
	  		var active = document.activeElement;
	  		$(':text').focus(function () {
	  			if ($(this).attr('paceholder') != '' && $(this).val() == $(this).attr('placeholder')) {
	  				$(this).val('').removeClass('hasPlaceholder');
	  			}
	              
	  		}).blur(function () {
	  			if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
	  				$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
	  			}
	  		});
	 		$('textarea').focus(function () {
	  			if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
	  				$(this).val('').removeClass('hasPlaceholder');
	 			}
	             
	 		}).blur(function () {
				if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
	 				$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
	 			}
	 		});        
	 		$(':text').blur();
	         $('textarea').blur();
	 		$(active).focus();
	 		$('form').submit(function () {
				$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
	 		});
	  	}
    }

	//  ---------------------------------------------------------
   //  Function for returning URL query as array
   //
   //  Usage example:
   //      var query = urlQuery(url);
   //  ---------------------------------------------------------

	function urlQuery(url) {
    	var vars = [], hash;
    	var hashes = url.slice(url.indexOf('?') + 1).split('&');
    	for(var i = 0; i < hashes.length; i++)
    	{
      	hash = hashes[i].split('=');
        	vars[hash[0]] = hash[1];
    	}
    	return vars;
	}

	//  ---------------------------------------------------------
   //  Function for checking if an element is visible in viewport
   //
   //  Usage example:
   //      var isVisible = $(this).isOnScreen();
   //  ---------------------------------------------------------

	$.fn.isOnScreen = function(){

	    var win = $(window);

	    var viewport = {
	        top : win.scrollTop(),
	        left : win.scrollLeft()
	    };
	    viewport.right = viewport.left + win.width();
	    viewport.bottom = viewport.top + win.height();

	    var bounds = this.offset();
	    bounds.right = bounds.left + this.outerWidth();
	    bounds.bottom = bounds.top + this.outerHeight();

	    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

	};

jQuery.fn.extend({

    ieBlur: function() {
    	if ($.browser.msie) {} else {
			$(this).blur();
		}
	 },

	 //  ---------------------------------------------------------
    //  Function for content validation by type
    //
    //  Parameters:
    //      type - validation type to use (values: notempty, email, phone, cif, cnp, iban, bic)
    //
    //  Usage example:
    //      var valid = $("#idOfInputToValidate").validInput('cui');
    //  ---------------------------------------------------------

    validInput: function (type) {

	     // IE placeholder proof validation
	     if('placeholder' in contactInputs || 'placeholder' in contactTextarea) jQuery.support.placeholder = true;
		 	
	     if(!$.support.placeholder) {
	      	var placeholder = $(this).attr('placeholder');
		      var value = $(this).val();
		    	if(placeholder == value) {
		  		return false;
		   	}
	     }

        switch(type) {
            default:
                var value = $(this).val();
                if(value == null || value == '' || value == ' ' || value == '  ') {
                    return false
                }
                return true;
                break;
            case 'email':
                var value = $(this).val();
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(reg.test(value) == false) {
                    return false;
                }
                return true;
                break;
            case 'phone':
                var value = $(this).val();
                var notempty = $(this).validInput('notempty');
                if(notempty == false) return false;
                var stripped = value.replace(/[\(\)\.\-\ ]/g, '');
                if(isNaN(parseInt(stripped)) || !(stripped.length==10)){
                    return false;
                }
                return true;
                break;
            case 'notempty':
                var value = $(this).val();
                if(value == null || value == '' || value == ' ' || value == '  ') {
                    return false
                }
                return true;
                break;
            case 'password':
                var value = $(this).val();
                if(value == null || value == '' || value == ' ' || value == '  ' || value.length < 4) {
                    return false
                }
                return true;
                break;
            case 'date':
                var value = $(this).val();
                if(value == null || value == '' || value == ' ' || value == '  ' || '--') {
                    return false
                }
                return true;
                break;
            case 'number':
                var value = $(this).val();
                var notempty = $(this).validInput('notempty');
                if(notempty == false || value == '0') return false;
                var stripped = value.replace(/[\(\)\.\-\ ]/g, '');
                if(isNaN(parseInt(stripped))){
                    return false;
                }
                return true;
                break;
        }
    },

    //  ---------------------------------------------------------
    //  Function for adding error style if needed
    //
    //  Parameters:
    //      test - boolean value used to set or not set error style
    //
    //  Usage example:
    //      $("#idOfInputToValidate").hasError(true);
    //  ---------------------------------------------------------
    hasError: function(test) {
        /*var selector = $(this).selector;
        var selectorName = selector.replace('#', '').replace('.', '');*/

        var errorTo = $(this).next();

        var icons = {
            'saved' : $('.formIcon.saved'),
            'warning' : $('.formIcon.warning'),
            'error' : $('.formIcon.error')
        };

        errorTo.hide().removeClass('error');
        if(test == false) {
            errorTo.addClass('error').show();
        }
    },

    //  ---------------------------------------------------------
    //  Function for input validation by form ID
    //
    //  Usage example:
    //      var formTest = $("#formID").validForm();
    //  ---------------------------------------------------------
    validForm: function(e) {
        placeholdersFix();

        var isValid = true;
        var form = $(this);

        $(form.selector+' input.required').each(function(){
            var field = $(this);
            var type = field.attr('validation');
            var valid = field.validInput(type);

            $('#'+field[0].id).hasError(valid);

            if(valid == false) {
            	isValid = false;
            }
        });

        form.find('textarea.required').each(function(index){
            var field = $(this);
            var type = field.attr('validation');
            var valid = field.validInput(type);
            field.hasError(valid);

            if(valid == false) {
            	isValid = false;
            }
        });

        return isValid;
    },

	 onAvailable: function(fn){
	    var sel = this.selector;
	    var timer;
	    var self = this;
	    if (this.length > 0) {
	        fn.call(this);
	    }
	    else {
	        timer = setInterval(function(){
	            if ($(sel).length > 0) {
	                fn.call($(sel));
	                clearInterval(timer);
	            }
	        },50);

	    }
	 }
});