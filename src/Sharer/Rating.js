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
        this.setState({
          rating: rating,
          temp_rating: rating
        });
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
        
        for(let i = 0; i < 5; i++) {
          const klass = 'star-rating__star';
          
          if (this.state.rating >= i && this.state.rating != null) {
            klass += ' is-selected';
          }
    
          stars.push(
            <label
              className={klass}
              onClick={this.rate.bind(this, i)}
              onMouseOver={this.star_over.bind(this, i)}
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
