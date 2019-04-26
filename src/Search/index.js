import React, { Component } from "react";
import Navbar from "../Dashboard/Navbar";
import DressCard from "../DressCard";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		fetch(`https://us-central1-prime-fit.cloudfunctions.net/getAllDresses`)
			.then(resp => resp.json())
			.then(response => {
				console.log(response);
				const dresses = Object.values(response).filter(dress => {
					fetch(`https://us-central1-prime-fit.cloudfunctions.net/getUser?userId=${dress.userId}`)
						.then(resp => {
							return resp.text();
						})
						.then(response => {
							console.log(response);
							if (typeof response === "string") {
								try {
									response = JSON.parse(response);
								} catch (err) {
									console.log("No response while fetching user data...");
									return false;
								}
							}
							if (!response === undefined && response["name"]) {
								// do the logic

								return true;
							}
						});
				});

				this.setState({ allDresses: dresses });
			});
	}

	render() {
		const { allDresses } = this.state;
		return (
			<div>
				<Navbar />
				{allDresses &&
					allDresses.map(dress => (
						<DressCard
							name={dress.name}
							likeability={dress.likeability}
							imgUrl={dress.imagesURL && dress.imagesUR.length > 0 ? dress.imagesURL[0] : ""}
						/>
					))}
			</div>
		);
	}
}

export default Search;
