
import { v4 } from "uuid";
import { OrderItems } from "../Order/OrderItems";
import { useState } from "react"

export const AdminOrder = ({order})=>{
       const [view, setView] = useState(false)
     
    return(
    
        <>
        <div className="orderDiv">
            <div className="orderSubDiv">
                    <div>product ordered by {order.firstName + ' ' + order.lastName}</div>
                    <div>delivery method: {order.deliveryMethod}</div>
                    <div>
                        contact

                        <div>phone: {order.phoneNumber}</div>
                        <div>email: {order.email}</div>


                    </div>
                    <div >
                        <div>
                            <div>Products</div>
                            <div><ion-icon name="chevron-down-outline"></ion-icon></div>
                        </div>
                        
                        <div >
                                {
                                order.items && order.items.map((item, index)=>(
                                    <OrderItems key={index} item={item} i={index + 1} />
                                ))
                                }
                        </div>

                        <div>Total: {order.total}</div>

                    </div>
                
                <div>
                    <button className="full-btn">settled</button>
                    click if client has received package
                </div>
            </div>

        </div>
        
        </>
    )
}