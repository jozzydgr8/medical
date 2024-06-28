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
    <NavLink to="/commerce" onClick={()=> setActiveNav('#') } className={activeNav === '#' ? 'active' : ''}> <ion-icon className='nav-icons'  name="home-outline"></ion-icon></NavLink>

    <NavLink to="/commerce/cart" onClick={()=> setActiveNav('#Experience') } className={activeNav === '#Experience' ? 'active' : ''}><ion-icon className='nav-icons' name="cart-outline"></ion-icon>{ count > 0 &&<span className='badge'>{count}</span>}</NavLink>
    
    <NavLink to="/commerce/search" onClick={()=> setActiveNav('#Portfolio') } className={activeNav === '#Portfolio' ? 'active' : ''}><ion-icon className='nav-icons' name="search-outline"></ion-icon></NavLink>
    
  </nav>
    )
}





// const Nav = () => {
  
  
//     return (

//     )
  
// }