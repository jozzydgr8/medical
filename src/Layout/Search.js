import { useState, useRef, useEffect } from "react";
import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { Link } from "react-router-dom";
import { AuthConsumer } from "../Context/ContextAuth/AuthConsumer";

export const Search = ()=>{
    const {data} = UseContextData();
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [filter, setFilter] = useState(true);
    const [activeSearch, setActiveSearch] = useState(false)
    const {user} = AuthConsumer();
    const inputRef = useRef(null)
    useEffect(()=>{
        if (inputRef.current) {
            inputRef.current.focus();
        }
    },[])
    const handleData = (e)=>{
        setFilter(true)
        setSearch(e.target.value);
        const inputValue = e.target.value.toLowerCase();
        if (inputValue === ''){
            return
        } 
        const searchArr = data.filter(data => data.product.toLowerCase().includes(inputValue));
        setResult(searchArr)
    }
    const handleFilter = (e)=>{
        setFilter(false)
        e.preventDefault();
        setSearch('');

    }
    return(
        <>
        <div className="searchFeature">
        <form onSubmit={handleFilter} className="d-flex" role="search">
        <div class="input-group">
        <Link to='/medical' className="input-group-text" id="basic-addon1"><ion-icon name="arrow-back-outline"></ion-icon></Link>   
        <input ref={inputRef} style={{outline:'none'}} value={search} type="text" className="form-control shadow-none" placeholder="find product" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>handleData(e)} onClick={()=>setActiveSearch(true)} />
        <button type="submit" className="input-group-text" id="basic-addon1"><ion-icon name="search-outline"></ion-icon></button> <ion-icon name="filter-outline"></ion-icon>
          
       </div>
        {
        filter && 
       <main className="summary searchMap">
            {
                result.map(search =>(
                    <Link className="cartDiv searchLink" key={search.id} to={`/medical/${search.id}`}>
                        <div className="cartDetail searchDiv" >
                            {search.product} <span className="searchLogo"><ion-icon name="cart-outline"></ion-icon></span>
                        </div>
                    </Link>
                ))
            }
        </main>
         }
        </form>
        <div className="gridProduct">
            {
                !filter &&
                result.map(result=>(
                    <Link to={`/medical/${result.id}`} className="product">
                    <div className="productImage">
                     <img src={result.productImage} alt="image"/>
                    </div>
                     <div className="productDetail">
                        <div>{result.product}</div>
                        <div>price: {result.prize}</div>
                        
                        <div>
                            <button className="full-btn">Add to cart</button>
                        </div>
        
                        {user && user.uid === process.env.REACT_APP_acceptedID && <button className="outline-btn">delete</button>}
                    
                     </div>
        
                    </Link>
                ))

            }
            </div>

        </div>
        </>
    )
}