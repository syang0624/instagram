import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post'
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "syang",
      caption: "aaaa",
      imageUrl: "https://malibu.sfo3.cdn.digitaloceanspaces.com/20220903-07_sl2_512/file_9976912_512x512.webp"
    },
    {
      username: "syang",
      caption: "aaaa",
      imageUrl: "https://malibu.sfo3.cdn.digitaloceanspaces.com/20220903-07_sl2_512/file_9976912_512x512.webp"
    }
  ]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      
    })
  }, [])

  return (
    <div classNa me="App">
      {/* Header */}
      <div className = "app__header">
        <img 
          className = "app__headerImage"
          src = "instagramLogo.png"
          alt="Logo"></img>
      </div>
      <h1>Hello Clever Programmers Let's build an Instagram Clone with React</h1>
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl= {post.imageUrl}/>
        ))
      }
    
      <Post username = "syang" caption="WoW it works"imageUrl = "https://malibu.sfo3.cdn.digitaloceanspaces.com/20220903-07_sl2_512/file_9976912_512x512.webp" />
      <Post username = "me" caption="dope"imageUrl = "https://malibu.sfo3.cdn.digitaloceanspaces.com/20220903-07_sl2_512/file_9976912_512x512.webp" />
    </div>
  );
}

export default App;
