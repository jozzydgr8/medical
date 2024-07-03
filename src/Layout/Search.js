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
    const inputRef = useRef(null);
    const filterDiagnostic = data && data.filter(data => data.category.toLowerCase().includes('diagnostic'));
    const filterRehab = data && data.filter(data => data.category.toLowerCase().includes('rehabilitation'));
    const filterPPE = data && data.filter(data => data.category.toLowerCase().includes('ppe'));
    const filterSurgical = data && data.filter(data => data.category.toLowerCase().includes('surgical'));
    useEffect(()=>{
        if (inputRef.current) {
            inputRef.current.focus();
        }
    },[])
    const handleData = (e)=>{
        setFilter(true);
        setSearch(e.target.value);
        const inputValue = e.target.value.toLowerCase();

        const searchArr = data.filter(entry => {
            const strData = JSON.stringify(entry).toLowerCase();
            return strData.includes(inputValue);
          });

    
        setResult(searchArr)
    }
    const handleFilter = (e)=>{
        setFilter(false)
        e.preventDefault();

    }


    return(
        <section id="search">
        
        {
            !activeSearch ? 
            <div className="container-fluid">
            <div className="searchFeature">
                    <form onSubmit={handleFilter} className="d-flex" role="search">
                    <div class="input-group">
                    <input style={{outline:'none'}} value={search} type="text" className="form-control shadow-none" placeholder="find product" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>handleData(e)} onClick={()=>setActiveSearch(true)} />
                    <button type="submit" className="input-group-text" id="basic-addon1"><ion-icon name="search-outline"></ion-icon></button>
                    
                    </div>

                    </form>

                    <section>
                        
                            
                             {
                                filterDiagnostic != 0 && filterPPE != 0 && filterRehab != 0 && filterSurgical != 0 &&
                                
                                <main className="categoryMain" >   
                                <span className="montserrat">categories</span>                          
                                <div className='categoryFlex'>
                                    <div className="category">{filterDiagnostic && filterDiagnostic
                                        .slice(0,1).map(data=>(
                                        <div key={data.id}>
                                            <Link to={`/medical/${data.category}`} className="headerFlex categoryProduct ">
                                                <div className="categoryProductImage">
                                                <img src={data.productImage} alt="productCategoryImage" />
                                                </div>
                                                <div className="container">Diagnostics</div>
                                                
                                                
                                            </Link>
                                        </div>
                                    ))}</div>
    {/* 
                                    //second div */}
                                <div className="category">{filterRehab && filterRehab
                                        .slice(0,1).map(data=>(
                                        <div key={data.id}>
                                            <Link to={`/medical/${data.category}`} className="headerFlex categoryProduct ">
                                                <div className="categoryProductImage">
                                                <img src={data.productImage} alt="productCategoryImage" />
                                                </div>
    
    
                                                <div className="container">Rehabilitation</div>
                                                
                                                
                                            </Link>
                                        </div>
                                    ))}</div>
                                </div>
    
    
    
    {/* 
    second category */}
                                <div className='categoryFlex'>
                                    <div className="category">{filterSurgical && filterSurgical
                                        .slice(0,1).map(data=>(
                                        <div key={data.id}>
                                            <Link to={`/medical/${data.category}`} className="headerFlex categoryProduct ">
                                                <div className="categoryProductImage">
                                                <img src={data.productImage} alt="productCategoryImage" />
                                                </div>
                                                <div className="container">Surgical</div>
                                                
                                                
                                            </Link>
                                        </div>
                                    ))}</div>
    {/* 
                                    //second div */}
                                <div className="category">{filterPPE && filterPPE
                                        .slice(0,1).map(data=>(
                                        <div key={data.id}>
                                            <Link to={`/medical/${data.category}`} className="headerFlex categoryProduct ">
                                                <div className="categoryProductImage">
                                                <img src={data.productImage} alt="productCategoryImage" />
                                                </div>
    
    
                                                <div className="container">PPE</div>
                                                
                                                
                                            </Link>
                                        </div>
                                    ))}</div>
                                </div>
    
                                
    
                                </main>
                                
                             }
                        
                    </section>
            </div>
            </div>:
                    <div className="searchFeature activeSearch">
                    <form onSubmit={handleFilter} className="d-flex" role="search">
                    <div class="input-group">
                    <span onClick={()=>setActiveSearch(false)} className="input-group-text" id="basic-addon1"><ion-icon name="arrow-back-outline"></ion-icon></span>   
                    <input style={{outline:'none'}} value={search} type="text" className="form-control shadow-none" placeholder="find product" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>handleData(e)} />
                    <button type="submit" className="input-group-text" id="basic-addon1"><ion-icon name="search-outline"></ion-icon></button>
                      
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
                    <div className="container-fluid">
                    <div className="gridProduct">
                        {
                            !filter &&
                            result.map(result=>(
                                <Link to={`/medical/${result.id}`} className="product" key={result.id}>
                                <div className="productImage">
                                 <img src={result.productImage} alt="productImage"/>
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
            
                    </div>

        }

        </section>
    )
}