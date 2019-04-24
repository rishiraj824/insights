import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/input';
import { onChange } from '../store/actions/onboarding';

function mapStateToProps(state) {
    return {
        values: state.onboarding.values
    };
}

class One extends Component {
    render() {
        const { values, onChange } = this.props;
        return (
            <div>
                <label>
                Shoulder
                </label>
                <Input onChange={(e)=>onChange({...values, shoulder: e.target.value})} value={values.shoulder} type="range" min="1" max="4" />

                <label>
                Waist
                </label>
                <Input onChange={(e)=>onChange({...values, waist: e.target.value })} value={values.waist} type="range" min="1" max="4" />

                <label>
                Hip
                </label>
                <Input onChange={(e)=>onChange({...values, hip: e.target.value })} value={values.hip} type="range" min="1" max="4" />
            </div>
        );
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onChange: payload => dispatch(onChange(payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchStateToProps
)(One);