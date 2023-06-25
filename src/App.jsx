import { useEffect, useState } from 'react'
import './App.css'
import RestartButton from './components/RestartButton'

function App() {
	var [place, setPlace] = useState([
		{ id: 0, value: 0 },
		{ id: 1, value: 0 },
		{ id: 2, value: 0 },
		{ id: 3, value: 0 },
		{ id: 4, value: 0 },
		{ id: 5, value: 0 },
		{ id: 6, value: 0 },
		{ id: 7, value: 0 },
		{ id: 8, value: 0 },
	])
	const [nextValue, setNextValue] = useState(-1)
	const [hasWon, setHasWon] = useState(false)
	const [isDraw, setIsDraw] = useState(false)

	function handleSetPlace(cellId) {
		if (place[cellId].value == ' ' && !hasWon) {
			setNextValue((prevValue) =>
				prevValue == -1 ? (prevValue = 1) : (prevValue = -1)
			)
			setPlace(
				(place) =>
					(place = place.map((cell) =>
						cell.id === cellId ? { id: cellId, value: nextValue } : cell
					))
			)
		}
	}

	useEffect(() => {
		const placeNums = place.map((cell) => cell.value)
		// console.log(placeNums)

		for (let i = 0; i < 9; i++) {
			if (placeNums[i] != 0) {
				if (
					i % 3 == 0 &&
					placeNums[i] == placeNums[i + 1] &&
					placeNums[i + 2] == placeNums[i]
				) {
					// console.log(
					// 	`${placeNums[i]} has won!`,
					// 	placeNums[i],
					// 	placeNums[i + 1],
					// 	placeNums[i + 2],
					// 	i,
					// 	i + 1,
					// 	i + 2
					// )
					setHasWon(true)
					break
				}
				if (
					(i == 3 || i == 4 || i == 5) &&
					placeNums[i] == placeNums[i - 3] &&
					placeNums[i + 3] == placeNums[i]
				) {
					// console.log(
					// 	`${placeNums[i]} has won!`,
					// 	placeNums[i],
					// 	placeNums[i - 3],
					// 	placeNums[i + 3],
					// 	i,
					// 	i - 3,
					// 	i + 3
					// )
					setHasWon(true)
					break
				}
				if (
					i == 4 &&
					((placeNums[i - 4] == placeNums[i] &&
						placeNums[i + 4] == placeNums[i]) ||
						(placeNums[i - 2] == placeNums[i] &&
							placeNums[i + 2] == placeNums[i]))
				) {
					// console.log(
					// 	`${placeNums[i]} has won!`,
					// 	placeNums[i],
					// 	placeNums[i + 4],
					// 	placeNums[i - 4],
					// 	i,
					// 	i + 4,
					// 	i - 4,
					// 	'or',
					// 	placeNums[i],
					// 	placeNums[i - 2],
					// 	placeNums[i + 2],
					// 	i,
					// 	i - 2,
					// 	i + 2
					// )
					setHasWon(true)
					break
				}
				if (i == 8 && !placeNums.includes(0)) {
					setIsDraw(true)
				}
			}
		}
		// console.log(place, nextValue)
	})

	function handleRestart() {
		setPlace((place) => [
			{ id: 0, value: 0 },
			{ id: 1, value: 0 },
			{ id: 2, value: 0 },
			{ id: 3, value: 0 },
			{ id: 4, value: 0 },
			{ id: 5, value: 0 },
			{ id: 6, value: 0 },
			{ id: 7, value: 0 },
			{ id: 8, value: 0 },
		])
		setNextValue((nextValue) => -1)
		setHasWon(false)
		setIsDraw(false)
	}

	return (
		<div className='container'>
			<p className='title'>Tic Tac Toe</p>
			<div className='place-container'>
				<p className='turn'>
					Current turn: {nextValue == -1 ? <b>X</b> : <b>O</b>}
				</p>
				<div className='place'>
					{place.map((cell) => (
						<div
							className='cell'
							onClick={() => handleSetPlace(cell.id)}
							key={cell.id}
						>
							{cell.value == -1 ? <b>X</b> : cell.value == 1 ? <b>O</b> : ' '}
						</div>
					))}
				</div>
				{hasWon && (
					<p className='win cond'>
						{nextValue == -1 ? <b>O</b> : <b>X</b>} won!
					</p>
				)}
				{isDraw && <p className='draw cond'>It is a draw!</p>}
			</div>
			<RestartButton handleRestart={handleRestart} />
		</div>
	)
}

export default App
