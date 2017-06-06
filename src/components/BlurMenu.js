import React from 'react'
import './styles/BlurMenu.css'
import './styles/common.css'
import $ from 'jquery'
import { TweenMax, Quad, Elastic } from 'gsap'


class BlurMenu extends React.Component{

	componentDidMount() {
		var menuIsOpen=false,
		$menu=$(".menu"),
		$menuItem=$(".menu-item"),
		$menuBg=$(".menu-bg"),
		$menuToggle=$(".menu-toggle"),

		menuWidth=300,
		menuItemOffset=150,
		menuBgSkew=-10,
		timeScale={v:1},
		minBlur=2,
	    maxBlur=200,
	    isUpdatingBlur=false,
	    updateBlurStopTimeout=null,
	    multiplier=0.25;

	    var minBlur=2,
	    maxBlur=200,
	    isUpdatingBlur=false,
	    updateBlurStopTimeout=null,
	    multiplier=0.25;

	    // motion blurr
	    	$.fn.toggleBlur=function(v){
		var blurId=$(this).data("blur-id");
		var value=v?"url(#"+blurId+")":"none";
		$(this).css({
			webkitFilter:value,
			filter:value
		});
	}
	$.fn.setBlur=function(v){
		var blur=$(this).data("blur");
		v=Math.round(v);
		if($(this).data("blur-value")!=v){
			if(v==0){
				$(this).toggleBlur(false);
			}else{
				$(this).toggleBlur(true);

				blur.firstElementChild.setAttribute("stdDeviation",v+",0");
				$(this).data("blur-value",v);
			}
		}
	}
	$.fn.initBlur=function(_multiplier){
		if(typeof _multiplier=="undefined") _multiplier=0.25;
		multiplier=_multiplier;
		var defs=$(".filters defs").get(0);
		var blur=$("#blur").get(0);
		$(this).each(function(i){
			var blurClone=blur.cloneNode(true);
			var blurId="blur"+i;
			blurClone.setAttribute("id",blurId);
			defs.appendChild(blurClone);
			$(this)
				.data("blur",blurClone)
				.data("blur-id",blurId)
				.data("blur-value",0)
				.data("last-pos",$(this).offset())
			;
		});
	}

	$.updateBlur=function(){
		$(".js-blur").each(function(){
			var pos=$(this).offset();
			var lastPos=$(this).data("last-pos");
			var v=Math.abs(pos.left-lastPos.left)*multiplier;
			$(this).data("last-pos",pos);
			$(this).setBlur(v);
		})
		if(isUpdatingBlur){
			requestAnimationFrame($.updateBlur);
		}
	}
	$.startUpdatingBlur=function(stopDelay){
		if(typeof stopDelay=="undefined"){
			stopDelay=-1;
		}
		if(updateBlurStopTimeout!=null){
			clearTimeout(updateBlurStopTimeout);
			updateBlurStopTimeout=null;
		}
		if(!isUpdatingBlur){
			isUpdatingBlur=true;
			$.updateBlur();
		}
		if(stopDelay>-1){
			updateBlurStopTimeout=setTimeout($.stopUpdatingBlur,stopDelay);
		}
	}
	$.stopUpdatingBlur=function(){
		isUpdatingBlur=false;
	}
	    // end

		TweenMax.globalTimeScale(timeScale.v);

		TweenMax.set($menuItem,{
			x:-menuItemOffset
		});
		TweenMax.set($menuBg,{
			skewX:menuBgSkew
		})
		function setTimescale(v){
			TweenMax.to(timeScale,0.5,{
				v:v,
				ease:Quad.easeInOut,
				onUpdate:updateTimescale,
				onComplete:updateTimescale
			});
		}
		function updateTimescale(){
			TweenMax.globalTimeScale(timeScale.v);
		}
		
		function openMenu(){
			menuIsOpen=true;
			TweenMax.to($menu,0.55,{
				x:menuWidth,
				force3D:false,
				ease:Elastic.easeOut,
				easeParams:[1.01,0.8]
			});
			TweenMax.to($menuBg,0.55,{
				skewX:0,
				force3D:false,
				ease:Elastic.easeOut,
				easeParams:[1.01,0.8]
			});
			$menuItem.each(function(i){
				TweenMax.to($(this),0.7+(i*0.05),{
					delay:0.02*i,
					x:0,
					force3D:false,
					// ease:Quint.easeOut
					ease:Elastic.easeOut,
					easeParams:[1.1,0.6]
				});
			});
			$.startUpdatingBlur(1000/timeScale.v);
		}
		function closeMenu(){
			menuIsOpen=false;
			TweenMax.to($menu,0.2,{
				x:-100,
				ease:Quad.easeIn,
				force3D:false
			});
			TweenMax.set($menuBg,{
				delay:0.2,
				skewX:menuBgSkew,
				force3D:false
			});
			$menuItem.each(function(i){
				TweenMax.to($(this),0.3+(0.05*i),{
					x:-menuItemOffset,
					ease:Quad.easeIn,
					force3D:false
				});
			});
			$.startUpdatingBlur(1000/timeScale.v);
			
		}
		function toggleMenu(){
			if(menuIsOpen){
				$menuToggle.removeClass('menu-open');
				closeMenu();
			}else{
				$menuToggle.addClass('menu-open');
				openMenu();
			}
		}
		$menuToggle.click(function(){
			toggleMenu();
		});
		$(".js-blur").initBlur();

	}


	render(){
		return(
<div>



	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="filters hidden">
		<defs>
			<filter id="blur" x="-20%" y="0" width="140%" height="100%">
				<feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
			</filter>
		</defs>
	</svg>
	<div className="container">
		<div className="menu">
			<div className="menu-bg js-blur"></div>
			<nav className="menu-items">
				<a href="/" className="menu-item">
					<span className="js-blur">Home</span>
				</a>
				<a href="/mix" className="menu-item">
					<span className="js-blur">Mix tapes</span>
				</a>
				<a href="#" className="menu-item">
					<span className="js-blur">Upcoming shows</span>
				</a>
				<a href="#" className="menu-item">
					<span className="js-blur">Merch</span>
				</a>
				<a href="#" className="menu-item">
					<span className="js-blur">Contact</span>
				</a>
			</nav>
		</div>
		<button className="menu-toggle" onClick={this.handle}><span>Open Menu</span></button>
	</div>

</div>
		)

	}

}

export default BlurMenu;