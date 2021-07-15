import React from 'react'
import "./Blogitem.css";
function Preview(props) {
  return (
    <div className="blog-item">
      <div className="blog-item-header">
        <h3>{props.props.caption}</h3>
      </div>
      <div className="blog-item-content">{props.props.text}</div>
      <img className="previewpostImage" src={props.props.photoURL} alt={props.props.caption} />
    </div>
  )
}

export default Preview
