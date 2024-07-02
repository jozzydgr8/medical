import {NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
export const Navbar = ()=>{
    
    const [count, setCount] = useState(0);
    const [activeNav, setActiveNav]= useState('#')
    
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
    <nav>
    <NavLink to="/medical" onClick={()=> setActiveNav('#') } className={activeNav === '#' ? 'active' : ''}> <ion-icon className='nav-icons'  name="home-outline"></ion-icon></NavLink>

    <NavLink to="/medical/cart" onClick={()=> setActiveNav('#cart') } className={activeNav === '#cart' ? 'active' : ''}><ion-icon className='nav-icons' name="cart-outline"></ion-icon>{ count > 0 &&<div className='badge'>{count}</div>}</NavLink>
    
    <a href="/medical#search" onClick={()=> setActiveNav('#search') } className={activeNav === '#search' ? 'active' : ''}><ion-icon className='nav-icons' name="search-outline"></ion-icon></a>
    
  </nav>
    )
}





// const Nav = () => {
  
  
//     return (

//     )
  
// }