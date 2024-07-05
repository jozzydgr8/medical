import { onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { cartRef, setLocalStorageItem } from "../App"
import { Link } from "react-router-dom";
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer";
import { AdminOrder } from "./Admin/AdminOrder";
import { OrderSummary } from "./OrderSummary";

export const Order =()=>{
    const [order, setOrder] = useState([]);
    const {user} = AuthConsumer();

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
    if (order.length === 0) {
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

    console.log(order)
    return(
        <section>
            <div className="summary container-fluid">
            <Link className="headerIcon" to='/medical'><ion-icon name="return-down-back-outline"></ion-icon></Link >
                {
                    order.map(order=>(
                        <div key={order.id}>
                            {
                                user && user.uid === process.env.REACT_APP_acceptedID ? <AdminOrder order={order}/>:
                                <OrderSummary order={order}/>
                            }
                        </div>

                    ))
                    
                }
            </div>
        </section>
    )
}