import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import Rating from "../Sharer/Rating";
import { getDress } from "../store/actions/dress";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

class DressView extends Component {
	constructor(props) {
		super(props);
		this.state = { upvoted: false };
	}
	componentDidMount() {
		const { match, getDress } = this.props;
		const id = match.params.id;
		getDress(id);
	}

	upvoteTheDress = () => {
		const { match } = this.props;
		const { upvoted } = this.state;
		const id = match.params.id;
		if (!upvoted) {
			fetch(`https://us-central1-prime-fit.cloudfunctions.net/upvoteDress?dressId=${id}`).then(() => {
				this.setState({ upvoted: true });
			});
		}
	};

	render() {
		const { dress } = this.props;
		const { upvoted } = this.state;
		const { review, name, rating, imagesURL = [], brand, itemCode, size, likeability } = dress;
		const photos = imagesURL.map(src => ({
			original: src,
			thumbnail: src
		}));
		return (
			<div className="dress flex wrap row center">
				<div className="gallery">
					<Gallery showNav={false} showFullscreenButton={false} showPlayButton={false} disableArrowKeys items={photos} />
				</div>

				<div className="review">
					<div className="heart-container" onClick={this.upvoteTheDress}>
						<div style={{ position: "absolute" }}>
							<svg className="heart" viewBox="0 0 32 29.6">
								<path
									d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
								/>
							</svg>
							<div className="likeability-value">{likeability + (upvoted ? 1 : 0)} </div>
						</div>
					</div>
					<br />
					<br />
                    <br />
					Click To Upvote
					<h2 className="pink">{name}</h2>
					<Rating disabled={true} rating={rating} />
					<p>
						From {brand}, Size - {size}, Item Code: {itemCode}"
					</p>
					<br />
					<p>"{review}"</p>
				</div>
			</div>
		);
	}
}

const mapDispatchStateToProps = dispatch => {
	return {
		getDress: id => dispatch(getDress(id))
	};
};

const mapStateToProps = state => {
	return {
		dress: state.dress
	};
};

export default connect(
	mapStateToProps,
	mapDispatchStateToProps
)(DressView);
