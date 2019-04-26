import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import DressCard from "../DressCard";
import Rating from '../Sharer/Rating';
import { getDress } from '../store/actions/dress';

class DressView extends Component {
    componentDidMount(){ 
        const { match, getDress } = this.props;
        const id = match.params.id
        getDress(id);
    }
    render() {
        const { dress } = this.props;
        const { likeability, review, name, rating, imagesURL = [] } = dress;
        return (
            <div className="dress flex wrap row center">
                <DressCard likeability={likeability} stars={rating} name={name} imgUrl={imagesURL[0]} {...dress} />                
                <div className="review">
                    <Rating disabled={true} rating={rating} />
                    <p>{review}</p>
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
