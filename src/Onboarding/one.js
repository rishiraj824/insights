import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class One extends Component {
    render() {
        return (
            <div>
                one
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(One);