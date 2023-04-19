import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post'
import { db, auth } from './firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { Button, Modal, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Upload from './upload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  // needs styling again
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    padding: '20px',
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User Logged In
        console.log(authUser);
        setUser(authUser);

      } else {
        // User Logged Out
        setUser(null);
      }
    })

    return () => {
      // perform clean up actions
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    onSnapshot(collection(db, 'posts'), snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      return updateProfile(authUser.user, {
        displayName: username,
      })
    })
    .catch((error) => {
      alert(error.message);
      // console.log(error.message);
    })

    setOpen(false);
    
  }


  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }

  return (
    <div className="App">

      {/* Caption input */}
      {/* File Picker */}
      {/* Post Button */}
      {user && user.displayName ? (
        <Upload username={user.displayName}/>
      ): (
        <h3>Sorry, you must sign in to upload</h3>
      )}
      <Modal
      open={open}
      onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img
                className='app__headerImage'
                src='instagramLogo.png'
                alt=''
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
          
        </div>
      </Modal>

      <Modal
      open={openSignIn}
      onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <center>
              <img
                className='app__headerImage'
                src='instagramLogo.png'
                alt=''
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signIn}>Sign In</Button>
          </form>
          
        </div>
      </Modal>
      {/* Header */}
      <div className = "app__header">
        <img 
          className = "app__headerImage"
          src = "instagramLogo.png"
          alt="Logo"></img>
      </div>

      {user ? (
      <Button onClick={() => auth.signOut()}>Logout</Button>  
      ): (
        <div className='app__loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      {/* <h1>Hello Clever Programmers Let's build an Instagram Clone with React</h1> */}
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl= {post.imageUrl}/>
        ))
      }
    
      {/* <Post username = "syang" caption="WoW it works"imageUrl = "https://malibu.sfo3.cdn.digitaloceanspaces.com/20220903-07_sl2_512/file_9976912_512x512.webp" />
      <Post username = "me" caption="dope"imageUrl = "https://malibu.sfo3.cdn.digitaloceanspaces.com/20220903-07_sl2_512/file_9976912_512x512.webp" /> */}
    </div>
  );
}

export default App;
