import React from "react";
import "./styles/modal.css";

const modal = props => {
	const { close } = props;
	return (
		props.show ? <div>
			<div
				className="modal-wrapper"
				style={{
					transform: props.show ? "translateY(0)" : "translateY(-100%)",					
				}}>
				{close && (
					<div className="modal-header">
						<span className="close-modal-btn" onClick={props.close}>
							×
						</span>
					</div>
				)}
				<div className="modal-body">{props.children}</div>
			</div>
		</div>:''
	);
};

export default modal;
