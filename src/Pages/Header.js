import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer";
import {NavLink} from "react-router-dom";
import { auth, setLocalStorageItem } from "../App";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export const Header = ()=>{
    const {dispatch, user} = AuthConsumer();    
    const [count, setCount] = useState(0);
    
    useEffect(()=>{
      const updateCount = ()=>{
        const cart = JSON.parse(localStorage.getItem('cart'));
        setCount(cart ? cart.length:0);

      };
      //initial load
      updateCount();

      //update storage event
       const handleStorageUpdate = ()=>{
        updateCount();
       };

       window.addEventListener('storageUpdate', handleStorageUpdate);

       return ()=>{
        window.removeEventListener('storageUpdate', handleStorageUpdate)
       }

    },[])

    //handlelogout
    const handleLogOut = ()=>{
        signOut(auth)
        .then(()=>{
            const emptyCart = [];
            setLocalStorageItem('cart',JSON.stringify(emptyCart))
            dispatch({type:'signUser', payload:null}); 
        })
    }
    return (
        <section>
            <div className="container-fluid">
            <div className="headerFlex">
                <NavLink to='/medical' className="ubuntu">Medical shop</NavLink>

                <div className="headerIcon"><NavLink to={'/medical/cart'}><ion-icon name="notifications-outline"></ion-icon>{ count > 0 &&<div className='togglerbadge'>{count}</div>}</NavLink> {user ?  <><ion-icon onClick={handleLogOut} name="log-out-outline"></ion-icon></> :
                <NavLink to='signin'>
                <ion-icon name="person-add-outline"></ion-icon> 
                     <small style={{fontSize:'15px'}}> login</small>
                </NavLink> }</div>
            </div>

            
            </div>
        </section>
    )
}
