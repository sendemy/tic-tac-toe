import React from 'react'
import './RestartButton.css'

const RestartButton = (props) => {
	return (
		<button className='restart-btn' onClick={props.handleRestart}>
			<span>Restart</span>
		</button>
	)
}

export default RestartButton
