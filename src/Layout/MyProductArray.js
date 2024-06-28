import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer"
import { Link } from "react-router-dom"

export const MyProductArray = ({data})=>{
    const {user} = AuthConsumer();

    return(
        <Link to={`/commerce/${data.id}`} className="product">
            <div className="productImage">
             <img src={data.productImage} alt="image"/>
            </div>
             <div className="productDetail">
                <div>{data.product}</div>
                <div>price: {data.prize}</div>
                
                <div>
                    <button className="full-btn">Add to cart</button>
                </div>

                {user && user.uid === process.env.REACT_APP_acceptedID && <button className="outline-btn">delete</button>}
            
             </div>

        </Link>
    )
}