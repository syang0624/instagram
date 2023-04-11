import React from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';
function Post({username, caption, imageUrl}) {
  return (
    <div className='post'>
        <div className='post__header'>
            <Avatar
                className='post__avatar'
                alt = 'Syang'
                // src='https://github.com/syang0624.png'
                src='public/avatar.png'
            />
            <h3>{username}</h3>
        </div>
        {/* header -> avatar + username */}

        <img className='post__image' src={imageUrl}></img>
        <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
    </div>
  )
}

export default Post