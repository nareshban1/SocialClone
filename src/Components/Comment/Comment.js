import React, {useState, useEffect} from 'react'
import { firestore } from '../../Firebase'
import "./style.css";
import { HiDotsHorizontal } from 'react-icons/hi';
function Comment(props) {

    const [comments, setComments] = useState([])

    useEffect(() => {
           firestore.collection("comments").where("postID", "==", `${props.postID}`).orderBy('timestamp', "desc").onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => ({
                id:doc.id, comment:doc.data()
            })))

        })
        }, [])
    return (
        <>
            {comments? 
            <>
             {comments.map(({id,comment})  => (
                    <div className="comment">
                         <img src={comment.displayPic} className="comment-userpic"/>
                    
                            <div className="comment-tab">
                                <div className="comment-userdetails">
                                    <p className="comment-username">{comment.displayName}</p>
                                    {/* <p className="comment-timestamp">{comment.timestamp.toDate().toDateString()}</p> */}
                                </div>
                                <p className="comment-text">{comment.comment}</p> 
                            </div>
                            
                            <div className="comment-menu" >
                            <HiDotsHorizontal />
                            </div>
                            

                       
                        
                    </div>
            ))}
            </> : <> </>}
        </>
    )
}

export default Comment
