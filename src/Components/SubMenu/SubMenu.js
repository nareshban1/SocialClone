import React,{useState} from 'react'
import "./index.css";
import { HiDotsHorizontal } from 'react-icons/hi';
import { firestore, storage } from '../../Firebase';


function SubMenu(props) {
    const [modal, setModal] = useState(false);
    const deletePost = () => {
        if(props.post.photoURL){
            var imageRef = storage.refFromURL(props.post.photoURL);
            imageRef.delete().then(function () {
                console.log("deleted");
            }).catch( function (error){
                console.log(error.message);
            })
        }
        

        firestore.collection("posts").doc(props.docid).delete();
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const Modal = () => {
        if(!modal){
            return null
        }

        return(
            <div className="modal-main">
                <div className="modal">

                
                <div className="modal-header">
                    <p>Confirmation</p>
                    <p>Do you wanna delete your post?</p>
                </div>
                <div className="modal-body">
            
              
                </div>
                <div className="modal-footer">
                    <button className="confirmbtn" onClick={deletePost}>Confirm Delete</button>
                    <button className="cancelbtn " onClick={closeModal}>Cancel</button>
                </div>
                </div>
            </div>
        )
    }

    return (
        <>
        <div className="links_item dropdown">
            <HiDotsHorizontal className="user-menu" />
              <div className="dropdown_content">
                <a  className="droplink">
                  Edit
                </a>
                <a onClick={openModal}  className="droplink" style={{color: "red"}}>
                  Delete
                </a>
                </div>
            </div>

            <Modal/>
            </>
        
    )
}

export default SubMenu
