import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, push, onValue, remove, update, child } from "firebase/database";
import { useState,useEffect } from "react";
import {
  toastSuccessNotify,
  toastWarnNotify,
} from "./toastNotify";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  // export default firebaseConfig;

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async(email, password,navigate) => {
   try{
    await createUserWithEmailAndPassword(auth, email, password);
  
    navigate("/")
   } catch(err){
       alert(err.message)
   }
}

export const signInUser = async(email,password,navigate) => {
   try{
    await signInWithEmailAndPassword(auth, email, password)
    toastSuccessNotify("logged in succesfully")
    navigate("/")
   } catch(err){
    toastWarnNotify("Please log in with a current username")
   }
}

export const logOut = () => {
    signOut(auth);
    toastSuccessNotify("logged out succesfully")
}

export const userObserver = (setcurrentUser) => {
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setcurrentUser(currentUser)
            // console.log(currentUser);
        
        } else {
            setcurrentUser(false)
        }
      });
}

export const signUpProvider = (navigate) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result);
        toastSuccessNotify("logged in succesfully")
        navigate("/");
 
  }).catch((error) => {
 
    console.log(error);
  });
}


export const AddBlog = (blogAdded,navigate) => {
  
  const db = getDatabase();
  const blogRef = ref(db, "blog");
  const newBlogRef = push(blogRef)
  set((newBlogRef),{
    title:blogAdded.title,
    url:blogAdded.url,
    content:blogAdded.content,
    owner:blogAdded.owner,
    printTime:blogAdded.printTime
  })
  navigate("/")
}

export const ReadBlogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogList, setBlogList] = useState([])
  
  useEffect(() => {
    setIsLoading(true)
    const db = getDatabase();
    const blogRef = ref(db, "blog");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      const blogArray = [];
      // console.log(data);
      
      for(let id in data){
        blogArray.push({id,...data[id]})
      }
      setBlogList(blogArray);
      setIsLoading(false)
    });
    
  }, [])
  return{isLoading, blogList}
  
}
export const ReadBlog = (id) => {
  const [blog, setBlog] = useState();
  useEffect(() => {
    const db = getDatabase();
    const blogRef = ref(db, "blog/" + id);
    onValue(blogRef, (snapshot) => {
      const blog = snapshot.val();
            setBlog(blog)
            // console.log(blog);
          })
    }, [id])
    
    return { blog }
  }
  
  
  export const blogObserver = (setblog) => {
      onAuthStateChanged(auth, (blog) => {
        if (blog) {
          setblog(blog)
          // console.log("fb",blog);
          
        } else {
          setblog(false)
          console.log(blog);
            }
          });
  }
  export const blogDelete = (id,navigate) => {
    const db = getDatabase();
    const blogRef = ref(db, "blog");
  
  remove(ref(db,"blog/"+id));
  navigate("/")
  
}

export const EditBlog = (updatedBlog) =>{
  const db = getDatabase();
  
  const updates = {};
  updates["blog/" + updatedBlog.id] = updatedBlog;
  return update(ref(db),updates);
  
  
}