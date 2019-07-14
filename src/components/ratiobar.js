import React from "react";
import "./styles/ratiobar.css";

const greenPalette = ["#56e0ac", "#0d6443", "#d1f779"];

export const Ratiobar = ({ data = [], colorPalette = greenPalette }) => {
	return (
		<div>
			<div className={"legends"}>
				{data.map(({ percent, label, val }, index) => {
					return (
						<div className={"legend-container"} key={index}>
							<div className={"legend"}>
								<div style={{ background: `${colorPalette[index % colorPalette.length]}` }} className={"circle"} />
								<div className={"sub-title"}>{label}</div>
							</div>
							<div style={{ marginLeft: `30px` }} className={"sub-title"}>
								{val}
							</div>
						</div>
					);
				})}
			</div>
			<div className={"ratiobar"}>
				{data.map(({ percent, label }, index) => {
					return (
						<div
							key={index}
							style={{ width: `${percent}%`, background: `${colorPalette[index % colorPalette.length]}` }}
							className={"ratiobar-segment"}>
							{label}
						</div>
					);
				})}
			</div>
		</div>
	);
};
