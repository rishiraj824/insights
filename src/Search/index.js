import React, { Component } from "react";
import Navbar from "../Dashboard/Navbar";
import DressCard from "../DressCard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";

class SearchList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		const { auth } = this.props;
		auth &&
			auth.uid &&
			fetch(`https://us-central1-prime-fit.cloudfunctions.net/getAllDresses?userId=${auth.uid}`)
				.then(resp => resp.json())
				.then(response => {
					console.log(response);
					this.setState({ allDresses: response ? response : [] });
				});
	}

	render() {
		const { allDresses } = this.state;
		return (
			<div>
				<Navbar />

				<div class="landing-container ">
					<div class="dress-carousel ">
						{allDresses &&
							allDresses.map(dress => (
								<Link to={`/dress/${dress.id}`}>
									<DressCard
										name={dress.name}
										likeability={dress.likeability}
										imgUrl={dress.imagesURL && dress.imagesURL.length > 0 ? dress.imagesURL[0] : ""}
									/>
								</Link>
							))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.firebase.auth,
		openOnboarding: state.onboarding.open
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// fetchUser: id => dispatch(fetchUser(id))
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchList);
