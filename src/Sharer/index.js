import React, { Component } from 'react';
import Rating from './Rating';
import Select from 'react-select';
import { upload, onFormChange, addDress } from '../store/actions/share';
import { connect } from 'react-redux';
import './rating.css';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/progress-bar/dist/style.css';


const Uppy = require('@uppy/core');
const ProgressBar = require('@uppy/progress-bar');
const Tus = require('@uppy/tus');
const { DragDrop } = require('@uppy/react');


const brandName = [
    "Michael Kors",
    "Calvin Klein",
    "free people",
    "Reformation" ,
    "Anthropology" ,
    "& Other Stories",
    "Eileen Fisher",
    "Aritzia"
]
const brands =  brandName.map(b => ({label: b, value: b})) ;


const colors = [
	{ label: "Red", value: "red" },
	{ label: "Green", value: "green" },
	{ label: "Blue", value: "blue" },
	{ label: "Orange", value: "orange" },
	{ label: "Violet", value: "violet" },
	{ label: "White", value: "white" },
	{ label: "Black", value: "black" },
	{ label: "Yellow", value: "yellow" },
	{ label: "Pink", value: "pink" },
	{ label: "Brown", value: "brown" },
	{ label: "Multi", value: "multi" }
];

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
    uppy.use(ProgressBar, {
        target: 'body',
        fixed: true,
        hideAfterFinish: true
    })
    
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
                    <div className="imagesUploaded flex row wrap">{values.imagesURL.map((src, index)=>{
                        return <img key={index} src={src} className="imageStyle" />
                    })}</div>
                </div>
                <div className="flex column questions">
                <div className="question">
                    <h3>Dress Name</h3>
                    <input
                        value={values.name}
                        onChange={e => onFormChange({ name: e.target.value })}
                        style={{ width: "15rem" }}
                        placeholder="Name"
                     />
                </div>
                <div className="question">
                    <h3>Please Rate the Dress</h3>
                    <Rating rating={values.rating} onChange={(rating)=>onFormChange({rating})} />
                </div>
                <div className="question">
                    <h3>Write a review</h3>
                    <textarea placeholder="A good description about the quality, style and fitting.." style={{ width:"15rem" }} rows={4} onChange={(e)=>onFormChange({ review: e.target.value})} value={values.review} />
                </div>
                <div className="question">
                    <h3>Select Brand Name</h3>
                    <Select options={brands} onChange={(value)=>onFormChange({brand: value.value})} value={{label: values.brand, value: values.brand}}></Select>                        
                </div>
                <div className="row flex center wrap">
                <div className="question margin-right-10">
                <h3>Item Code</h3>
                    <input
                        value={values.itemCode}
                        onChange={e => onFormChange({ itemCode: e.target.value })}
                        style={{ width: "8rem" }}
                        placeholder="1234"
                    />
                </div>
                <div className="question margin-right-10">
                    <h3>Color</h3>
                    <Select autoSize={false} style={{width: '200px'}} options={colors} onChange={(value)=>onFormChange({
                        meta: {
                            ...values.meta, 
                            color: value.value
                        }})} value={{label: values.meta.color, value: values.meta.color}}>
                    </Select> 
                </div>        
                <div className="question margin-right-10">
                    <h3>Size</h3>         
                    <Select autoSize={false} style={{width: '200px'}} options={size} onChange={(value)=>onFormChange({meta: {...values.meta,size: value.value}})} value={{label: values.meta.size, value: values.meta.size}}></Select>          
                </div>
                </div>
                <br/>
                    <button
                    disabled={values.imagesURL.length===0}
                    onClick={()=>{
                        addDress({
                        ...values,
                        userId: auth.uid,
                        color: values.meta.color,
                        size:values.meta.size
                    })
                }}>Submit</button>
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