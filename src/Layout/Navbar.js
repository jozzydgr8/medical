import {NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
export const Navbar = ()=>{
    
    const [count, setCount] = useState(0);
    const [activeNav, setActiveNav]= useState('#');
    const [orderCount, setOrderCount] = useState(0);
    const {order} = UseContextData();
    
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
  

    return(
    <nav id="navBottom">
    <NavLink to="/medical" onClick={()=> setActiveNav('#') } className={activeNav === '#' ? 'active' : ''}> <abbr title='Home'><ion-icon className='nav-icons'  name="home-outline"></ion-icon></abbr></NavLink>

    <NavLink to="/medical/cart" onClick={()=> setActiveNav('#cart') } className={activeNav === '#cart' ? 'active' : ''}><abbr title="cart"><ion-icon className='nav-icons'  name="cart-outline"></ion-icon></abbr>{ count > 0 &&<div className='badge'>{count}</div>}</NavLink>

    <a href="/medical#search" onClick={()=> setActiveNav('#search') } className={activeNav === '#search' ? 'active' : ''}><abbr title="search"><ion-icon className='nav-icons' name="search-outline"></ion-icon></abbr></a>

    <NavLink to="/medical/orders" onClick={()=> setActiveNav('#order') } className={activeNav === '#order' ? 'active' : ''}><abbr title="orders"><ion-icon className='nav-icons'  name="bus-outline"></ion-icon></abbr>{ order && order.length > 0 &&<div className='badge'>{order.length}</div>}</NavLink>
    
    
    
  </nav>
    )
}


