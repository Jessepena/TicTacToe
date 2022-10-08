import React from "react";

function Cell(props) {
	return (
		<div
			className={
				props.value === undefined ? "grid-item" : "grid-item no-pointer"
			}
			onClick={() => props.onClick(props.id)}
		>
			<p>{props.value}</p>
			{!props.value && !props.gameEnded && (
				<p className="hover">{props.player}</p>
			)}
		</div>
	);
}

export default Cell;
