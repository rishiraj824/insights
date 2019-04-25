import React, { Component } from 'react';
import Modal from '../components/modal';
import Rating from './Rating';
import Select from 'react-select';
import { upload, onFormChange } from '../store/actions/share';
import { connect } from 'react-redux';
import './rating.css';

const brands = [
    {label:'H&M', value:'H&M'},
    {label:'GUCCI', value:'GUCCI'},
    {label:'PRADA', value:'PRADA'},
]

const colors = [
    {label:'', value:''},
    {label:'', value:''},
    {label:'', value:''},
]
const size = [
    {label:'', value:''},
    {label:'', value:''},
    {label:'', value:''},
]

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

const Sharer  = (props) =>  {
    const { values, onFormChange, open, upload } = props;
    
    return (
        <Modal className="modal" show={open}>
            <div className="flex wrap row center">
                <div className="box">
                    Upload
                    <input accept="image/*" className="file" type="file" onChange={(e)=>{
                        const { target } = e;
                        if(target.value.length > 0){
                            upload(getBase64(target.files[0]));
                        } else {
                            target.reset();
                        }
                    }
                    }/>
                </div>
                <div className="flex column">
                    <Rating rating={values.rating} onChange={(rating)=>onFormChange({rating})} />
                    <label>Write a review</label>
                    <textarea rows={4} onChange={(e)=>onFormChange({ review: e.target.value})} value={values.review} />
                    <Select options={brands} onChange={(value)=>onFormChange({brand: value.value})} value={{label: values.brand, value: values.brand}}></Select>                        
                    <input
                        value={values.itemCode}
                        onChange={value => onFormChange({ itemCode: value.value })}
                        style={{ width: "3rem" }}
                    />
                    <Select options={colors} onChange={(value)=>onFormChange({
                        meta: {
                            ...values.meta, 
                            color: value.value
                        }})} value={{label: values.meta.color, value: values.meta.color}}></Select>          
                    <Select options={size} onChange={(value)=>onFormChange({meta: {...values.meta,size: value.value}})} value={{label: values.meta.size, value: values.meta.size}}></Select>          
                </div>
                <div>
                </div>
            </div>
        </Modal>
    );
}

const mapDispatchToProps = dispatch => {
	return {
        upload: (payload) => dispatch(upload(payload)),
        onChange: (payload) => dispatch(onFormChange(payload))
	};
};

const mapStateToProps = state => {
    return {
        values: state.share.values,
        open: state.share.open
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sharer)