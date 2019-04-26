import React from "react";
import "./style.css";
import DressCard from "../DressCard";

export default () => {
	return (
		<div className="landing-container">
			<h1 className="pink">
				Get the Best Fit <br />
				You Deserve. 💁‍👗👌
			</h1>
			<p>
				Join a community of fashionistas and fashion enthusiasists helping you find your perferct fit and style.
				<br />
				Join PrimeFit and experience magic
			</p>
			<div className="dress-carousel">
				<DressCard name="Floral Top" likeability={10} rating={4} imgUrl={"sam1.png"} />
				<DressCard name="Sleveless Top" likeability={4} rating={5} imgUrl={"sam2.png"} />
				<DressCard name="Blank Tank" likeability={150} rating={10} imgUrl={"sam3.png"} />
			</div>
		</div>
	);
};