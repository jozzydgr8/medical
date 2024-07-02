import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import {getFirestore, collection, onSnapshot} from "firebase/firestore"
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import {AuthConsumer} from './Context/ContextAuth/AuthConsumer';
import { UseContextData } from "./Context/ContextAuth/ContextProvider/UseContextData";


//LAYout
import { Root } from "./Layout/Root";
//pAGes
import { Home } from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import {UploadProduct} from "./Pages/UploadProduct"
import { ProductTemp } from "./Layout/ProducTemp";
import { Cart } from "./Layout/Cart";
import { Search } from "./Layout/Search";
import { Load } from "./Pages/Load";
import { Shipping } from "./Pages/Shipping";


// init firebase
const firebaseConfig = {
  apiKey:process.env.REACT_APP_apiKey,
  authDomain: "fir-project-556ec.firebaseapp.com",
  projectId: "fir-project-556ec",
  storageBucket: "fir-project-556ec.appspot.com",
  messagingSenderId: "244494515797",
  appId: "1:244494515797:web:b39804abde653370155edc"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
//authm
export const auth = getAuth();
export const db = getFirestore();
export const colRef = collection(db, 'vendor');
export const userRef = collection(db, 'user')
export const storage = getStorage(app);

const storageEvent = new Event('storageUpdate'); 
export const setLocalStorageItem = ((key, value)=>{
  localStorage.setItem(key, value);

  window.dispatchEvent(storageEvent);
})



function App() {
  const {user, loading} = AuthConsumer();
  const {dispatch, loading:load} = UseContextData();
  useEffect(()=>{
    dispatch({type:'loading', payload:true});
     
    const unSubscribe = onSnapshot(colRef, (snapshot)=>{
        const data = []
        const dataRef = snapshot.docs.forEach(doc=>{
          data.push({...doc.data(), id:doc.id});
          dispatch({type:'getData', payload:data});
        });
      });
      dispatch({type:'loading', payload:false})
      return ()=> unSubscribe();
      
    },[]);

  if(loading || load){
    return <Load />
  }

  //router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root/>}>
        <Route index element={<Home />} />
        <Route path="signup" element={!user ? <Signup/>: <Navigate to={'/'} />} />
        <Route path='signin' element={!user ? <Signin />: <Navigate to ={'/'}/>} />
        <Route path="uploadproduct" element ={user ? <UploadProduct />: <Navigate to={'/signin'} />} />
        <Route path=":id" element={<ProductTemp />} />
        <Route path={"cart"} element={<Cart/>} />
        <Route path="shipping" element={<Shipping/>} />

      </Route>
      <Route path="/medical" element={<Root/>}>
        <Route index element={<Home />} />
        <Route path="signup" element={!user ? <Signup/>: <Navigate to={'/medical'} />} />
        <Route path='signin' element={!user ? <Signin />: <Navigate to ={'/medical'}/>} />
        <Route path="uploadproduct" element ={user ? <UploadProduct />: <Navigate to={'signin'} />} />
        <Route path=":id" element={<ProductTemp />} />
        <Route path={"cart"} element={<Cart/>} />
        <Route path="shipping" element={<Shipping/>} />
      </Route>
      </>

      

    )
  )
  return (
    <div className="App"> 
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
