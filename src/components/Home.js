import React from 'react'
import BlurMenu from './BlurMenu'
import './styles/Home.css'
import $ from 'jquery'
import _ from 'lodash'


class Home extends React.Component{

	componentDidMount() {
		this.initAnimation()
	}

	render(){
		return(
			<div>

				<div className="container">
				  <section className="background">
				    <div className="content-wrapper">
				      <p className="content-title">Spectral</p>
				      <p className="content-subtitle">Djents your socks off ;)</p>
				    </div>
				    <div className="aniWrap">
					  <div className="mouse">
					    <div className="scroller">
					    </div>
					  </div>
					</div>
				  </section>
				  <section className="background">
				    <div className="content-wrapper">
				      <p className="content-title">Music and Stuff</p>
				      <p className="content-subtitle"></p>
				    </div>
				  </section>
				  <section className="background">
				    <div className="content-wrapper">
				      <p className="content-title">Etiam consequat lectus.</p>
				      <p className="content-subtitle">Nullam tristique urna sed tellus ornare congue. Etiam vitae erat at nibh aliquam dapibus.</p>
				    </div>
				  </section>
				</div>

				<BlurMenu />
			</div>
		)
	}

	initAnimation = () => {
		var ticking = false;
	var isFirefox = (/Firefox/i.test(navigator.userAgent));
	var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
	var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
	var slideDurationSetting = 600; //Amount of time for which slide is "locked"
	var currentSlideNumber = 0;
	var totalSlideNumber = $(".background").length;
	var delta = null;

	// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
	function parallaxScroll(evt) {
	  if (isFirefox) {
	    //Set delta for Firefox
	    delta = evt.detail * (-120);
	  } else if (isIe) {
	    //Set delta for IE
	    delta = -evt.deltaY;
	  } else {
	    //Set delta for all other browsers
	    delta = evt.wheelDelta;
	  }

	  if (ticking != true) {
	    if (delta <= -scrollSensitivitySetting) {
	      //Down scroll
	      ticking = true;
	      if (currentSlideNumber !== totalSlideNumber - 1) {
	        currentSlideNumber++;
	        nextItem();
	      }
	      slideDurationTimeout(slideDurationSetting);
	    }
	    if (delta >= scrollSensitivitySetting) {
	      //Up scroll
	      ticking = true;
	      if (currentSlideNumber !== 0) {
	        currentSlideNumber--;
	      }
	      previousItem();
	      slideDurationTimeout(slideDurationSetting);
	    }
	  }
	}

	// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
	function slideDurationTimeout(slideDuration) {
	  setTimeout(function() {
	    ticking = false;
	  }, slideDuration);
	}

	// ------------- ADD EVENT LISTENER ------------- //
	var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
	window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

	// ------------- SLIDE MOTION ------------- //
	function nextItem() {
	  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
	  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
	}

	function previousItem() {
	  var $currentSlide = $(".background").eq(currentSlideNumber);
	  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
	}
	}
}

export default Home;