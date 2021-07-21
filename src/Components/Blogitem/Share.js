import React from "react";
import "./Blogitem.css";
import { FacebookShareButton, FacebookIcon,} from "react-share";
import { AiOutlineShareAlt } from "react-icons/ai";

export default function Share({id}) {


  return (
    <div className="viewpostbtns dropdown">
      <AiOutlineShareAlt className="sharebtn" />
      <div className="dropdown_content">
        <FacebookShareButton 
          url={`https://social-clone.netlify.app/post/${id}`}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </div>
    </div>
  );
}
