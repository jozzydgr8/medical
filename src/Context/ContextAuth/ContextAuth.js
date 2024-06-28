import {  onAuthStateChanged } from "firebase/auth"
import { auth } from "../../App";
import { createContext, useEffect, useReducer } from "react";


export const Context = createContext();

const initialState = {
    user:null,
    loading:true
}
const reducer = (state, action)=>{
    switch(action.type){
        case'signUser':
            return{
                ...state, user:action.payload, loading:false
            };
        case 'loading':
            return{
                ...state, loading:action.payload
            }
        default:
            return state
    }
}

export const ContextAuth=({children})=>{
    const [state, dispatch] = useReducer(reducer,initialState )
    useEffect(()=>{
        dispatch({type:'loading', payload:true})
       const unsubscribe = onAuthStateChanged(auth, user=>{
          if(user){
            const user = auth.currentUser;
            dispatch({type:'signUser', payload:user});
            console.log('signed in')
          }else{
            dispatch({type:'signUser', payload:null});
            console.log('logged out')
          }
        })
        
        return ()=>{
            unsubscribe();
        }
      },[]);
    // console.log(state)
    return(
        <Context.Provider value={{...state, dispatch}}>
            {children}
        </Context.Provider>
    )
}