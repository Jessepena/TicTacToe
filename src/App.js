import "./App.css";
import React, { useState, useEffect, useMemo } from "react";
import Cell from "./Cell";
import useWindowSize from "./useWindowSize";
import Confetti from "react-confetti";

function App() {
	const { width, height } = useWindowSize();
	const [gameEnded, setgameEnded] = useState(false);
	const [isTie, setIsTie] = useState(false);
	const [player, setPlayer] = useState("x");
	const [values, setValues] = useState({});
	const [playsCount, setPlaysCount] = useState(0);
	const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

	const solutions = useMemo(() => {
		return [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9],
			[3, 5, 7],
		];
	}, []);

	useEffect(() => {
		const someoneWon = solutions.some((subSolution) => {
			return (
				values[subSolution[0]] !== undefined &&
				values[subSolution[0]] === values[subSolution[1]] &&
				values[subSolution[0]] === values[subSolution[2]]
			);
		});

		if (someoneWon) {
			setgameEnded(true);
		} else {
			if (playsCount === 9) {
				setIsTie(true);
				setgameEnded(true);
				setPlayer((prevPlayer) => (prevPlayer === "x" ? "o" : "x"));
			} else if (Object.keys(values).length !== 0) {
				setPlayer((prevPlayer) => (prevPlayer === "x" ? "o" : "x"));
			}
		}
	}, [values, solutions, playsCount]);

	const onClick = (id) => {
		if (!values[id] && !gameEnded) {
			setPlaysCount((prevPlaysCount) => prevPlaysCount + 1);
			setValues((prevVal) => {
				return {
					...prevVal,
					[id]: player,
				};
			});
		}
	};

	const restartGame = () => {
		setgameEnded(false);
		setIsTie(false);
		setPlaysCount(0);
		setValues({});
	};

	return (
		<div className="App">
			{gameEnded && !isTie && (
				<Confetti
					width={width}
					height={height}
					gravity={0.04}
					numberOfPieces={300}
					tweenDuration={500}
				/>
			)}
			<h1>Tic Tac Toe</h1>
			{gameEnded && (
				<>
					{isTie ? <h2>It's a tie!</h2> : <h2>{player.toUpperCase()} wins!</h2>}
				</>
			)}
			{!gameEnded && <h2>It is {player.toUpperCase()}'s turn</h2>}
			<div className="border">
				<div className="grid">
					{cells.map((id) => {
						return (
							<Cell
								key={id}
								id={id}
								value={values[id]}
								player={player}
								onClick={onClick}
								gameEnded={gameEnded}
							/>
						);
					})}
				</div>
			</div>
			{gameEnded && (
				<button className="button" onClick={restartGame}>
					Restart Game
				</button>
			)}
		</div>
	);
}

export default App;
