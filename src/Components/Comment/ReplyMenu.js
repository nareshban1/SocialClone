import React, { useState } from 'react'
import "./style.css";
import { AiFillDelete,  } from 'react-icons/ai';

import { firestore} from '../../Firebase';


function Replymenu(props) {
    const [modal, setModal] = useState(false);
    const [loading, setLoading]=useState(false);
    
    const deleteReply = async () => {
        setLoading(true);
        console.log("deleting");
        await firestore.collection("replys").doc(props.docid).delete();
        setLoading(false);
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const Modal = () => {
        if (!modal) {
            return null
        }

        return (
            <div className="modal-main">
                <div className="modal">
                    <div className="modal-header">
                        <p>Confirmation</p>
                        <p>Do you wanna delete your reply?</p>
                    </div>
                    <div className="modal-body">

                    </div>
                    <div className="modal-footer">
                        {loading? <><button className="confirmbtn" >Deleting</button> </> :<> <button className="confirmbtn" onClick={deleteReply}>Confirm Delete</button> </>}
                        
                        <button className="cancelbtn " onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <AiFillDelete onClick={openModal} className="comment-menu deleteicon" />
            <Modal />
        </>

    )
}

export default Replymenu;
