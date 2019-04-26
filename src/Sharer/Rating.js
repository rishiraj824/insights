import React, { Component } from 'react';    

export default class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating || null,
            temp_rating: null
        }
    }

    rate = (rating) => {
      if(!this.props.disabled) {
        this.setState({
          rating: rating,
          temp_rating: rating
        });
        this.props.onChange(rating);
      }
    }
    star_over = (rating) => {        
        this.setState({
          rating,
          temp_rating: this.state.rating
        });
    }
    star_out = () => {        
        this.setState({ rating: this.state.temp_rating });
    }

    render() {
        const stars = [];
        const { disabled } = this.props;
        
        for(let i = 0; i < 5; i++) {
          const klass = 'star-rating__star';
          if (this.state.rating === null) {
            if (this.props.rating >= i && this.props.rating != null) {
              klass += ' is-selected';
            }
          }
          else {
            if (this.state.rating >= i && this.state.rating != null) {
              klass += ' is-selected';
            }
          }
    
          stars.push(
            <label
              key={i}
              className={klass}
              onClick={this.rate.bind(this, i)}
              onMouseOver={disabled?()=>{}:this.star_over.bind(this, i)}
              onMouseOut={this.star_out}>
              ★
            </label>
          );
        }
        
        return (
          <div className="star-rating">
            {stars}
          </div>
        );
      }
}
