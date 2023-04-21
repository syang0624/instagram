import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';
import { db } from './firebase';
import { addDoc, collection, doc, onSnapshot, serverTimestamp, orderBy, query } from "firebase/firestore";


function Post({postId, user, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      const postCommentsRef = query(collection(doc(db, "posts", postId), "comments"), orderBy("timestamp", "desc"));
      unsubscribe = onSnapshot(postCommentsRef, (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(doc(db, "posts", postId), "comments"), {
        text: comment,
        username: user.displayName,
        timestamp: serverTimestamp(),
      });
      setComment('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

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
        <div className='post__comments'>
          {comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
        </div> 
        {user && (
          <form className='post__commentBox'>
          <input
            className = "post__input"
            type='text'
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
          className='post__button'
          disabled={!comment}
          type='submit'
          onClick={postComment}
          >
            Post
          </button>
        </form>
        )}
    </div>
  )
}

export default Post