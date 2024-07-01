import { Link } from "react-router-dom"

export const Footer = ()=>{
    return(
        <section id="footer">
            <div className="container-fluid">

                <span className="ubuntu">subscribe for updates & news</span>
                
                <div>
                    <input type="email" placeholder="enter email address"/>
                </div>
                <div>
                    <button className="full-btn">subscribe</button>
                </div>
                    
                    
                <div>
                    <Link>return policy</Link> <Link>About Us</Link>
                </div>

                <div>
                    <div>
                        <span className="ubuntu">Contact us</span>
                    </div>
                    <div className="footerFlex"> <ion-icon name="call-outline"></ion-icon> 08800292</div>
                    <div className="footerFlex"> <ion-icon name="location-outline"></ion-icon>lagos, lagos, lagos Nigeria</div>
                </div>
            </div>
        </section>
    )
}