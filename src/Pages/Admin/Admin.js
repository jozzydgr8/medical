import { Link } from "react-router-dom";
export const Admin  = ({name})=>{

    return(
        <section>
        <div >
           <span className="montserrat">welcome {name}</span>
            <div className="homefeatures">
                
             <Link to='uploadproduct' className="full-btn">
             click to upload product
             </Link>
            </div>
            
        </div>
        </section>
    )
}