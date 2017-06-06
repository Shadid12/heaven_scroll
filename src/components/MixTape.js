import React from 'react'
import './styles/MixTape.css'
import BlurMenu from './BlurMenu'

class MixTape extends React.Component{
	render() {
		return(
			<div>
				<BlurMenu />
				<div className="cassette"></div>
			</div>
		)
	}
}

export default MixTape