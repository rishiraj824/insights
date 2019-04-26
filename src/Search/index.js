import React, { Component } from "react";
import Navbar from "../Dashboard/Navbar";
import DressCard from "../DressCard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import "./style.css";

const brandName = [
    "All",
    "Michael Kors",
    "Calvin Klein",
    "free people",
    "Reformation" ,
    "Anthropology" ,
    "& Other Stories",
    "Eileen Fisher",
    "Aritzia"
]
const brands =  brandName.map(b => ({label: b, value: b})) ;

const colors = [
	{ label: "All", value: "all" },
	{ label: "Red", value: "red" },
	{ label: "Green", value: "green" },
	{ label: "Blue", value: "blue" },
	{ label: "Orange", value: "orange" },
	{ label: "Violet", value: "violet" },
	{ label: "White", value: "white" },
	{ label: "Black", value: "black" },
	{ label: "Yellow", value: "yellow" },
	{ label: "Pink", value: "pink" },
	{ label: "Brown", value: "brown" },
	{ label: "Multi", value: "multi" }
];

const filterFunc = (dress, filterBy, filterValue) => {
	if (filterValue === "All") return true;
	return dress[filterBy] === filterValue;
};

class SearchList extends Component {
	constructor(props) {
		super(props);
		this.state = { filters: {} };
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
		let { allDresses, filters } = this.state;

		Object.keys(filters).map(filterKey => {
			allDresses = allDresses.filter(dress => filterFunc(dress, filterKey, filters[filterKey]));
		});

		return (
			<div>
				<div className="search-container ">
					<div className="filters">
						<h3 className="pink"> Filters </h3>
						<Select
							options={brands}
							placeholder="By Brand"
							onChange={value => {
								this.setState({ filters: { ...filters, brand: value.value } });
							}}
						/>
						<br />
						<Select
							options={colors}
							placeholder="By Color"
							onChange={value => {
								this.setState({ filters: { ...filters, color: value.value } });
							}}
						/>
					</div>
					<div className="dress-carousel ">
						{allDresses &&
							allDresses.map(dress => (
								<Link to={`/dress/${dress.id}`} key={dress.id}>
									<DressCard
										key={dress.id}
										name={dress.name}
										likeability={dress.likeability}
										imgUrl={dress.imagesURL && dress.imagesURL.length > 0 ? dress.imagesURL[0] : ""}
									/>
								</Link>
							))}

						{allDresses && allDresses.length === 0 && (
							<div>
								<br />
								<h3>No matching dress found </h3>
							</div>
						)}
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
