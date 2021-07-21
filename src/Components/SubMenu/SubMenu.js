import React, { useState } from 'react'
import "./SubMenu.css";
import { AiFillDelete } from 'react-icons/ai';
import { firestore, storage } from '../../Firebase';


function SubMenu(props) {
    const [modal, setModal] = useState(false);
    const deletePost = () => {
        if (props.post.photoURL) {
            var imageRef = storage.refFromURL(props.post.photoURL);
            imageRef.delete().then(function () {
                // console.log("deleted");
            }).catch(function (error) {
                // console.log(error.message);
            })
        }


        deleteUnused(props.docid)
        firestore.collection("posts").doc(props.docid).delete();


    }

    const deleteUnused = async (id) => {
        const unusedComments = await firestore.collection('comments').where("postID", "==", `${id}`).get()
        const batch = firestore.batch();
        unusedComments.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        const unusedLikes = await firestore.collection('likes').where("postId", "==", `${id}`).get()
        const likebatch = firestore.batch();
        unusedLikes.forEach(doc => {
            likebatch.delete(doc.ref);
        });
        await likebatch.commit();

        const unusedReplys = await firestore.collection('replys').where("postID", "==", `${id}`).get()
        const replybatch = firestore.batch();
        unusedReplys.forEach(doc => {
            replybatch.delete(doc.ref);
        });
        await replybatch.commit();

        
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
            <AiFillDelete onClick={openModal} className="delete_icon" />
            <Modal />
        </>

    )
}

export default SubMenu
