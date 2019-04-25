import React, { Component } from 'react';
import Modal from '../components/modal';

class Sharer extends Component {
    render() {
        return (
            <Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
	return {
		upload: (payload) => dispatch(upload(payload))
	};
};

export default connect(mapDispatchToProps)(Sharer)