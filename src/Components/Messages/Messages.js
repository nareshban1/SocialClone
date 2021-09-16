import React, { useState, useEffect } from "react";
import "./index.css";
import { useAuth } from "../../context/AuthContext";
import { firestore } from "../../Firebase";

function Messages({ dummy }) {
  const { currentUser } = useAuth();
  const [chatMsg, setChatMsg] = useState([]);

  useEffect(() => {
    let componentMounted = true;
    firestore
      .collection("superchat")
      .orderBy("timestamp")
      .limit(100)
      .onSnapshot((snapshot) => {
        if (componentMounted) {
          setChatMsg(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              message: doc.data(),
            }))
          );
        }
      });
      dummy?.current?.scrollIntoView({behavior:'smooth'});
    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <>
      <div className="chatmessages">
        {chatMsg?.map((data) => (
          
            <div
              className={
                currentUser?.uid === data?.message?.uid
                  ? "message_right messagetabs"
                  : "message_left messagetabs"
              }
              key={data.id}
            >
              <img
                src={data?.message?.userPic}
                alt=""
                className="msguserimage"
              />
              <p className="msg">{data?.message?.text}</p>
              
            </div>
          
        ))}
        <div ref={dummy}></div>
      </div>
    </>
  );
}

export default Messages;
