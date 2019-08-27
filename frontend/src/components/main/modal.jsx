import React from 'react';
import ProduceCreate from '../create/ProduceCreate';
import ReviewCreate from '../create/ReviewCreate';

class Modal extends React.Component {
    
    render() {
        const { classes } = this.props;
        if (this.props.location.pathname === "/add-produce") {
            return(
                <div className="modal-background">
                    <div className="modal-screen" onClick={(e) => e.stopPropagation()}>
                        <ProduceCreate />
                    </div>
                </div>
            )
        } else if (this.props.location.pathname.includes("add-review")) {
            return(
                <div className="modal-background">
                    <div className="modal-screen" onClick={(e) => e.stopPropagation()}>
                        <ReviewCreate />
                    </div>
                </div>
            )
        }
        else { return null }
    }
}


export default Modal;