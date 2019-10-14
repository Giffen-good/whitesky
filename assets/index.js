(function() {
	window.addEventListener('DOMContentLoaded', function() {
	// Get geolocation for an IP address "1.1.1.1"


	{
		//converting LAT and LNG to format specified in MOCKS
		function toDegreesMinutesAndSeconds(coordinate) {
		    var absolute = Math.abs(coordinate);
		    var degrees = Math.floor(absolute);
		    var minutesNotTruncated = (absolute - degrees) * 60;
		    var minutes = Math.floor(minutesNotTruncated);
		    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

		    return degrees + "\u00B0" + minutes + "\'" + seconds;
		}

		function convertDMS(lat, lng) {
		    var latitude = toDegreesMinutesAndSeconds(lat);
		    var latitudeCardinal = lat >= 0 ? "N" : "S";

		    var longitude = toDegreesMinutesAndSeconds(lng);
		    var longitudeCardinal = lng >= 0 ? "E" : "W";

		    return [latitude + latitudeCardinal, longitude + longitudeCardinal];
		}

		// GET REQUEST FOR USERS LOCALTION BASED ON IP LOOKUP
		$.getJSON('https://ipapi.co/json/', function(data) {
			let long = data['longitude'];
			let lat = data['latitude'];
			let coordinates = convertDMS(lat,long);
			const latEl = document.querySelectorAll('.lat');
			const lngEl = document.querySelectorAll('.lng');
			for (let i = 0; i < latEl.length; i++) {
					latEl[i].innerHTML = coordinates[0];
					lngEl[i].innerHTML = coordinates[1];
			}
			
		});
	}
	if ( document.querySelector('.template-index') ) {
	
	}



	if (document.querySelector('.template-product') != null ) { //PRODUCT PAGE JS 



		//CONSTRUCTING EVENT LISTENERS FOR PRODUCT NAV
		const navItems = document.getElementById('product-nav').children;
		for (let i = 0; i < navItems.length; i++) { 
			navItems[i].addEventListener('click', function() { 
				let activated = document.getElementsByClassName('activated-item');
				
				if (this.id == 'size-guide') {
					document.getElementById('size-guide-module').classList.add('open');
					document.getElementById('size-guide-module').classList.remove('dn');
				} else {
					while (activated.length > 0){
						activated[0].classList.remove('activated-item');
				}
					this.classList.add('activated-item');
					document.querySelector('.' + this.id).classList.add('activated-item')
				}
			});

		}





		//dots section for MOBILE SLIDESHOW 
		const dots = document.querySelectorAll('.bullet');
		const imgs = document.querySelectorAll('.responsive-image__wrapper');
		const imgCount = imgs.length;
		var activeDot = document.getElementsByClassName('activeDot');
		var activeSlide = document.getElementsByClassName('activeSlide');


		//slide transformation
		function slideEvent(val) {
				stripClass(activeDot,'activeDot');
				stripClass(activeSlide,'activeSlide');
				imgs[val].classList.add('activeSlide');
				dots[val].classList.add('activeDot');
		}
		// manage IMG shift checking for end of slide
		function slideShift(val, backward = false) {
				
				if (backward) { //to previous slide
					if (val == 1 ){ 
						slideEvent(imgCount-1); //go to last slide
					} else {
						slideEvent(val-2); //go to previous slide

					}
				} else { // to next slide
					if (val == imgCount ) { 
						slideEvent(0);
					} else {
						slideEvent(val);
					}
				}
		}



		function stripClass(j, cName){
			while (j.length > 0 ){
				j[0].classList.remove(cName);
			}
		}

		//EVENT LISTENER CONSTRUCTION FOR PRODUCT SLIDESHOW
		for (let i = 0;i< dots.length;i++) {
			dots[i].addEventListener('click',function() {	//DOT EVENTS
				stripClass(activeDot,'activeDot');
				stripClass(activeSlide,'activeSlide');
				this.classList.add('activeDot');

				document.querySelector('.' + this.id).classList.add('activeSlide');
			});

			

			// IMG CLICK INTERACTIONS
			imgs[i].addEventListener('click', function() {
				let activeID = activeDot[0].id;
				let val = activeID.split('-')[1];
				slideShift(val);
			});

		}

			//MANGE MOBILE SWIPE EVENTS 
			document.addEventListener('touchstart', handleTouchStart, false);        
			document.addEventListener('touchmove', handleTouchMove, false);

			var xDown = null;                                                        
			var yDown = null;

			function getTouches(evt) {
			  return evt.touches ||             // browser API
			         evt.originalEvent.touches; // jQuery
			}                                                     

			function handleTouchStart(evt) {
			    const firstTouch = getTouches(evt)[0];                                      
			    xDown = firstTouch.clientX;                                      
			    yDown = firstTouch.clientY;                                      
			};                                                

			function handleTouchMove(evt) {
			    if ( ! xDown || ! yDown ) {
			        return;
			    }

			    var xUp = evt.touches[0].clientX;                                    
			    var yUp = evt.touches[0].clientY;

			    var xDiff = xDown - xUp;
			    var yDiff = yDown - yUp;

			    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			    		let activeID = activeDot[0].id;
						let val = activeID.split('-')[1];
			        if ( xDiff > 0 ) {
			            /* left swipe */ 
			            slideShift(val);
									         
			        } else {
			            /* right swipe */
			            slideShift(val, true);
			        }                       
			    } else {
			        if ( yDiff > 0 ) {
			            /* up swipe */ 
			        } else { 
			            /* down swipe */
			        }                                                                 
			    }
			    /* reset values */
			    xDown = null;
			    yDown = null;                                             
			};







	//SIZE GUIDE EVENT LISTENERS + UNIT CONVERSION
	function toInch(n) {
		return  (n / 30.48).toFixed(3); 
	}
	//IF SIZE GUIDE IS SPECIFIED IN BACKEND 
	if (document.getElementById('size-guide-module')){
		document.querySelector('.ex').addEventListener('click', function() {
				document.getElementById('size-guide-module').classList.remove('open');
			});
			document.addEventListener('keydown',function(e) {
				if (e.key === "Escape") {
					document.getElementById('size-guide-module').classList.remove('open');
				}
			})
	
	
		const actualNums = document.querySelectorAll('.actual-nums');
		var cmArray = [];
		const cmTab = document.getElementById('cm-tab'),
		inchesTab = document.getElementById('inches-tab') 
		
	
	
		cmTab.addEventListener('click',function() {
			this.classList.add('active');
			inchesTab.classList.remove('active');
			if (cmArray != []) {
				for (let i=0;i<actualNums.length;i++) {
					actualNums[i].innerHTML =  cmArray[i];
				}	
			}
		})
		inchesTab.addEventListener('click',function() {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				cmTab.classList.remove('active');
				for (let i=0;i<actualNums.length;i++) {
					cmArray.push(actualNums[i].innerHTML);
					actualNums[i].innerHTML = toInch(actualNums[i].innerHTML); 
				}	
			}
		})
		const measuringTab = document.getElementById('measuring-tab');
		const sizeTab = document.getElementById('size-tab');
	
		measuringTab.addEventListener('click',function() {
			this.classList.add('active');
			sizeTab.classList.remove('active');
		});
		sizeTab.addEventListener('click',function() {
					this.classList.add('active');
					measuringTab.classList.remove('active');
	
		})
	} //END OF SIZE GUIDE
      if (document.getElementById('wFWimg')) {
        for (let i = 0;i< imgs.length;i++) {
          if (imgs[i].id !== 'full-width-image') {
          	imgs[i].classList.add('vh');
          }
        }
      }

      $(window).on('load', function(event) {
                if (document.getElementById('wFWimg')) {

      	//JS REQUIRED FOR FW IMG LAYOUT
            const paddedImg = document.getElementById('wFWimg');
            const fwImg = document.getElementById('full-width-image');
                          console.log(fwImg.offsetHeight);
			
            paddedImg.style.paddingTop = fwImg.offsetHeight + 'px';
            paddedImg.style.paddingTop = 'calc(' + fwImg.offsetHeight + 'px + 1rem)';
			  for (let i = 0;i< imgs.length;i++) {
                if (imgs[i].id !== 'full-width-image') {
                  imgs[i].classList.remove('vh');
                }
              }
            window.addEventListener('resize',function() {
                paddedImg.style.paddingTop = fwImg.offsetHeight + 'px';
                paddedImg.style.paddingTop = 'calc(' + fwImg.offsetHeight + 'px + 1rem)';

            });
        }

	
      
      });
	

	} // end of PRODUCT PAGE SCRIPTS 

	if (window.scrollY != 0) document.getElementById('shopify-section-header').classList.add('scrolling');
	window.addEventListener('scroll',function() {
		if (window.scrollY != 0){ 
			document.getElementById('shopify-section-header').classList.add('scrolling');
		} else {
			document.getElementById('shopify-section-header').classList.remove('scrolling');

		}

	})









	//Nav JS - FORM
    var $form = $('form');
    function validate_input(s) {
       var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    }
    if ( $form.length > 0 ) {
        $('form input[type="submit"]').bind('click', function ( event ) {
            if ( event ) event.preventDefault();
            // validate_input() is a validation function I wrote, you'll have to substitute this with your own.
            register($form);
        });
    }
	var thankYou = document.getElementById('thankYou');

	function register($form) {
	    $.ajax({
	        type: $form.attr('method'),
	        url: $form.attr('action'),
	        data: $form.serialize(),
	        cache       : false,
	        dataType    : 'json',
	        contentType: "application/json; charset=utf-8",
	        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
	        success     : function(data) {
	            if (data.result != "success") {
	                // Something went wrong, do something to notify the user. maybe alert(data.msg);
	               thankYou.classList.add('db');
	               thankYou.innerHTML = 'Sorry, an error has occured. Please try again later';
	            } else {
	                // It worked, carry on...
	             
	               thankYou.classList.add('db');
	               document.getElementById('newsletterBox').classList.add('not-allowed');
	               thankYou.innerHTML = 'Thank you for signing up';
	            }
	        }
	    });
	}









	if (document.querySelector('.collection')) {
		let imgs = document.querySelectorAll('img.flip');
		for (let i = 0; i < imgs.length; i++ ) {
			imgs[i].addEventListener('mouseenter', function() {
				let src = this.src;
				this.setAttribute('src', this.getAttribute('data-src'));
				this.setAttribute('data-src',src);
			});
			imgs[i].addEventListener('mouseleave', function() {
				let src = this.src;
				this.setAttribute('src', this.getAttribute('data-src'));
				this.setAttribute('data-src',src);
			});
		}
	}

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
if (isMobile) {
	document.body.classList.add('is-mobile');
}

	}); // END OF DOM CONTENT LOADED

})();