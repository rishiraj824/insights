import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/input';
import { onChange, addUser } from '../store/actions/onboarding';

function mapStateToProps(state) {
    return {
        values: state.onboarding.values
    };
}

class Two extends Component {
    render() {
        const { values, onChange, addUser } = this.props;
        return (
            <div>
            <label>
            Butt Shape
            </label>
            <Input onChange={(e)=>onChange({...values, buttShape: e.target.value })} value={values.buttShape} type="range" min="1" max="4" />
        
            <label>
                Belly Shape
            </label>
            <Input onChange={(e)=>onChange({...values, bellyShape: e.target.value })} value={values.bellyShape} type="range" min="1" max="4" />
            <button onClick={addUser(values)}>Finish</button>
            </div>
        );
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onChange: payload => dispatch(onChange(payload)),
        addUser: (payload) => dispatch(addUser(payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchStateToProps
)(Two);