import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import Rating from '../Sharer/Rating';
import { getDress } from '../store/actions/dress';
import Gallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

class DressView extends Component {
    componentDidMount(){ 
        const { match, getDress } = this.props;
        const id = match.params.id
        getDress(id);
    }
    render() {
        const { dress } = this.props;
        const { review, name, rating, imagesURL = [] } = dress;
        const photos = imagesURL.map(src=> ({
            original: src,
            thumbnail: src
        }))
        return (
            <div className="dress flex wrap row center">
                
                <Gallery showNav={false} showFullscreenButton={false} showPlayButton={false} disableArrowKeys items={photos} />
                <div className="review">
                    <h3>{name}</h3>
                    <Rating disabled={true} rating={rating} />
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
    }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(DressView);
