import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ProduceCreate from '../create/ProduceCreate';

class Modal extends React.Component {
    
    render() {
        const { classes } = this.props;
        if (this.props.location.pathname !== "/add-produce") {
            return null;
        } else {
            return(
                <div className="modal-background" onClick={() => this.props.history.push("/")}>
                    <div className="modal-screen" onClick={(e) => e.stopPropagation()}>
                        <ProduceCreate />
                    </div>
                </div>
            )
        }
        
    }
}


export default (withRouter(Modal));