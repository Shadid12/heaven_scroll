import React from 'react'

// libs
import $ from 'jquery'
import animate from 'animate.css'
// css
import './styles/MenuItems.css'

class MenuItems extends React.Component {
	render(){
		return(

    <ul className="nav" id="anav">
      <li><a href="#" 
      			onMouseEnter={ () => { $('#a').addClass('animated jello'); } }
                onMouseLeave={ () => { $('#a').removeClass('animated jello'); } }>
      	<img src="http://i.imgur.com/v066Ghm.png" alt="Home" id="a"
      			className="imgClass" /><br />
      	Shows
      </a></li>
      <li><a href="#"
      			onMouseEnter={ () => { $('#b').addClass('animated jello'); } }
            	onMouseLeave={ () => { $('#b').removeClass('animated jello'); } }>
      	<img src="http://i.imgur.com/Pc8Ns6z.png" alt="Home" className="imgClass" id="b" /><br />
      	Albulms</a></li>
      <li><a href="#"
      			onMouseEnter={ () => { $('#c').addClass('animated jello'); } }
                onMouseLeave={ () => { $('#c').removeClass('animated jello'); } }>
      	<img src="http://i.imgur.com/HsGtRQ0.png" alt="Home" className="imgClass" id="c" /><br />
      	Videos</a></li>
    </ul>


		)
	}
}

export default MenuItems;