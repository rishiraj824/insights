import React, { Component } from 'react';
import Rating from './Rating';
import Select from 'react-select';
import { upload, onFormChange, addDress } from '../store/actions/share';
import { connect } from 'react-redux';
import './rating.css';
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'

const Uppy = require('@uppy/core');
const Tus = require('@uppy/tus');
const { DragDrop } = require('@uppy/react');

const brands = [
    {label:'H&M', value:'H&M'},
    {label:'GUCCI', value:'GUCCI'},
    {label:'PRADA', value:'PRADA'},
]

const colors = [
    {label:'red', value:'red'},
    {label:'green', value:'green'},
    {label:'blue', value:'blue'},
]
const size = [
    {label:'XL', value:'XL'},
    {label:'L', value:'L'},
    {label:'M', value:'M'},
    {label:'S', value:'S'},
]

const Sharer  = (props) =>  {
    const { values, onFormChange, upload, addDress, auth  } = props;
    
    const uppy = Uppy({
        restrictions: { 
            maxNumberOfFiles: 3,
            allowedFileTypes: ['image/*']
        },     
        autoProceed: true
    });
    uppy.use(Tus, { endpoint: 'https://master.tus.io/files/' })
    
    uppy.on('complete', (result) => {
        const url = result.successful[0].uploadURL
        upload(url)
    })
  
    return (
            <div className="flex wrap row center uploader">
                <div className="box">
                    <DragDrop
                        uppy={uppy}
                        locale={{
                        strings: {
                            // Text to show on the droppable area.
                            // `%{browse}` is replaced with a link that opens the system file selection dialog.
                            dropHereOr: 'Drop here or %{browse}',
                            // Used as the label for the link that opens the system file selection dialog.
                            browse: 'browse'
                        }
                        }}
                    />
                </div>
                <div className="flex column">
                    <input
                        value={values.name}
                        onChange={e => onFormChange({ name: e.target.value })}
                        style={{ width: "3rem" }}
                        placeholder="Name"
                     />
                    <Rating rating={values.rating} onChange={(rating)=>onFormChange({rating})} />
                    <label>Write a review</label>
                    <textarea rows={4} onChange={(e)=>onFormChange({ review: e.target.value})} value={values.review} />
                    <Select options={brands} onChange={(value)=>onFormChange({brand: value.value})} value={{label: values.brand, value: values.brand}}></Select>                        
                    <input
                        value={values.itemCode}
                        onChange={e => onFormChange({ itemCode: e.target.value })}
                        style={{ width: "3rem" }}
                    />
                    <Select options={colors} onChange={(value)=>onFormChange({
                        meta: {
                            ...values.meta, 
                            color: value.value
                        }})} value={{label: values.meta.color, value: values.meta.color}}>
                    </Select>          
                    <Select options={size} onChange={(value)=>onFormChange({meta: {...values.meta,size: value.value}})} value={{label: values.meta.size, value: values.meta.size}}></Select>          
                    <button onClick={()=>addDress({
                        ...values,
                        userId: auth.uid
                    })}>Finish</button>
                </div>
                <div>
                </div>
            </div>
    );
}

const mapDispatchToProps = dispatch => {
	return {
        upload: (payload) => dispatch(upload(payload)),
        onFormChange: (payload) => dispatch(onFormChange(payload)),
        addDress: (payload) => dispatch(addDress(payload))
	};
};

const mapStateToProps = state => {
    return {
        values: state.share.values,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sharer)