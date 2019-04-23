import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Three extends Component {
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
)(Three);