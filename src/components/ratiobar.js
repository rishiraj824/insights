import React from "react";
import "./styles/ratiobar.css";

const greenPalette = ["#56e0ac", "#0d6443", "#d1f779"];

export const Ratiobar = ({ data = [], colorPalette = greenPalette }) => {
	return (
		<div className={"ratiobar"}>
			{data.map(({ percent, label }, index) => {
				return (
					<div style={{ width: `${percent}%`, background: `${colorPalette[index % colorPalette.length]}` }} className={"ratiobar-segment"}>
						{label}
					</div>
				);
			})}
		</div>
	);
};
