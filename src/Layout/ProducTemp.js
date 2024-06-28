import { doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {  colRef, storage, setLocalStorageItem  } from "../App";
import { deleteObject, ref } from "firebase/storage"
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer"
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { Load } from "../Pages/Load";

export const ProductTemp = ()=>{
    const {id} = useParams();
    const [tempData, setTempData] = useState(null);
    const [warn, setWarn] = useState(false);
    const {user} = AuthConsumer();
    const {data} = UseContextData();
    const [cartAlert, setCartAlert] = useState('');
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
            const template = data.filter(data => id.includes(data.id));
            setTempData(template)
    
    },[data]);

//handlecart
const addCart = (id)=>{
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartArray = [id]
    if(!cart){
            setLocalStorageItem('cart', JSON.stringify(cartArray));
    }else{
        const check = cart.filter(cart => id.includes(cart));
        if(check.length === 0){
            cart.push(id);
            setLocalStorageItem('cart',JSON.stringify(cart))
        }
  
    }

}
//handleDelete
const handleDelete = async (imagePath, id) => {
    setDisable(true)
    const fileStorage = ref(storage, imagePath);

    try {
        // First, delete the image from storage
        await deleteObject(fileStorage);
    } catch (error) {
        setDisable(false)
        return console.error("Error deleting image:", error);
    }

    // Then, delete the document from Firestore
    try {
        const docRef = doc(colRef,id);
        await deleteDoc(docRef);
        
    } catch (error) {
        setDisable(false)
        return console.error("Error deleting document:", error);
    }
    setDisable(false)
    window.location.href ='/medical'
    // navigate('/medical')
};
    return(
        <>
            { disable ? <Load /> :
                tempData && tempData.map(tempData =>(
                        <main key={tempData.id} className="gridProduct">
                                
                                <div className="product">
                                <div className="productImage">
                                <img src={tempData.productImage} alt="image"/>
                                </div>
                                <div className="productDetail">
                                    <div>{tempData.product}</div>
                                    <div>price: {tempData.prize}</div>
                                    
                                    <div>
                                        <button onClick={()=>addCart(id)} className="full-btn">Add to cart</button>
                                    </div>

                                    {user && user.uid === process.env.REACT_APP_acceptedID && <button className="outline-btn" onClick={()=>setWarn(true)}>delete</button>}
                                    { user && warn && <div> <div>are you sure to delete</div> <button className="outline-btn" onClick={()=>handleDelete(tempData.imagePath, tempData.id)}>yes</button> <button className="full-btn" onClick={()=>setWarn(false)}>no</button></div>}
                                
                                </div>

                                </div>
                                
                            </main>
                ))
            }
        </>
    )
}