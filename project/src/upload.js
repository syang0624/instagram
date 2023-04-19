import React, { useState } from 'react'
import { Button } from '@mui/material'
import { storage, db } from "./firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";




function Upload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        // const uploadTask = storage.ref(`images/${image.name}`).put(image);
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                // When completed
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addDoc(collection(db, "posts"), {
                        timestamp: serverTimestamp(),
                        caption: caption, 
                        imageUrl: downloadURL,
                        username: username
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        )
    }


    return (
        <div>
            {/* Caption Input */}
            {/* File Picker */}
            {/* Post Button */}

            <progress value={progress} max = "100"></progress>
            <input type="text" placeholder = 'Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>
                Upload 
            </Button>
        </div>
  )
}

export default Upload