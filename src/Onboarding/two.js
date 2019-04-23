import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Two extends Component {
    render() {
        return (
            <div>
            two
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Two);