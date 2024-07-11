import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { cartRef, setLocalStorageItem } from "../../App"
import { Link } from "react-router-dom";
import { AuthConsumer } from "../../Context/ContextAuth/AuthConsumer";
import { AdminOrder } from "../Admin/AdminOrder";
import { OrderSummary } from "./OrderSummary";
import { UseContextData } from "../../Context/ContextAuth/ContextProvider/UseContextData";
import { Navbar } from "../../Layout/Navbar";

export const Order =()=>{
    const {order} = UseContextData();
    const {user} = AuthConsumer();
    const [orders, setOrders]= useState([])
    
    useEffect(()=>{

        const data = order && order.filter(item => item.status === false);
        setOrders(order ? data:[]);
    },[])
    //if no user
    if (!user){
        return (
        <section>
            <div className="container-fluid">
                    <Link className="headerIcon" to='/medical'><ion-icon name="return-down-back-outline"></ion-icon></Link>
                    <div>login to view orders</div>
                 <div><Link to={'/medical/signin'} className="full-btn">login</Link></div>
            </div>
        </section>
        )
    }
    //if no order
    if (orders.length === 0 || !orders) {
        return(
         <section>
            
            <div className="container-fluid">
                    <Link className="headerIcon" to='/medical'><ion-icon name="return-down-back-outline"></ion-icon></Link >
                    <div>no order has been placed</div>
                 <div><Link to={'/medical'} className="outline-btn">continue to shop</Link></div>
            </div>
        </section>
        )
    }

    return(
        <section>
            <div className="summary container-fluid">
            <Navbar />
            <Link className="headerIcon" to='/medical'><ion-icon name="return-down-back-outline"></ion-icon></Link >
                {
                   orders && orders.map(order=>(
                        <div key={orders.id}>
                            {
                                user && user.uid === process.env.REACT_APP_acceptedID ? <AdminOrder order={orders}/>:
                                <OrderSummary order={orders}/>
                            }

                        </div>

                    ))
                    
                }
            </div>
        </section>
    )
}