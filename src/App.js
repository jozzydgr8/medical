import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import {getFirestore, collection, onSnapshot, query, where} from "firebase/firestore"
import {getAuth, onAuthStateChanged} from 'firebase/auth'
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
import {UploadProduct} from "./Pages/Admin/UploadProduct"
import { ProductTemp } from "./Layout/ProducTemp";
import { Cart } from "./Layout/Cart";
import { Load } from "./Pages/Load";
import { Order } from "./Pages/Order/Order";


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
export const cartRef = collection(db, 'cart')

const storageEvent = new Event('storageUpdate'); 
export const setLocalStorageItem = ((key, value)=>{
  localStorage.setItem(key, value);

  window.dispatchEvent(storageEvent);
})



function App() {
  const {user, loading, dispatch:dis} = AuthConsumer();
  const {dispatch, loading:load} = UseContextData();
  
  //data
  useEffect(()=>{
    dispatch({type:'loading', payload:true});
     
    const unSubscribe = onSnapshot(colRef, (snapshot)=>{
        const data = []
        const dataRef = snapshot.docs.forEach(doc=>{
          data.push({...doc.data(), id:doc.id});
          dispatch({type:'getData', payload:data});
        });
      });
    
      
      return ()=> unSubscribe();
      
    },[]);

//auth check
  useEffect(()=>{
    dis({type:'loading', payload:true})
    const order = async ()=>{
      try{
        const unsubscribe = onAuthStateChanged(auth, user=>{
          if(user){
            const user = auth.currentUser;
            dis({type:'signUser', payload:user});
            console.log('signed in')
          }else{
            dis({type:'signUser', payload:null});
            console.log('logged out')
          }

          const userID = user && user.uid
          console.log(userID, 'userid')
          const q = userID == process.env.REACT_APP_acceptedID ? query(cartRef, where('userID', '==', userID)) : cartRef;
          const unSubscribeOrder = onSnapshot(q, (querySnapshot) => {
            const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch({type:'getOrder', payload:dataList})
            
          }, (error) => {
            console.error('Error fetching data: ', error);
          });
        })
      }catch(error){
        console.error(error)
      }
    }

    order();

  
        
    
    return ()=>{
      order();
    }
  },[]);

  //get order
  useEffect(()=>{
    dispatch({type:'loading', payload:true});
    

},[]);
  if(loading ){
    return <Load />
  }
console.log(user && user.uid)
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
        <Route path="orders" element={<Order/>} />


      </Route>
      <Route path="/medical" element={<Root/>}>
        <Route index element={<Home />} />
        <Route path="signup" element={!user ? <Signup/>: <Navigate to={'/medical'} />} />
        <Route path='signin' element={!user ? <Signin />: <Navigate to ={'/medical'}/>} />
        <Route path="uploadproduct" element ={user ? <UploadProduct />: <Navigate to={'/medical/signin'} />} />
        <Route path=":id" element={<ProductTemp />} />
        <Route path={"cart"} element={<Cart/>} />
        <Route path="orders" element={<Order/>} />

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
