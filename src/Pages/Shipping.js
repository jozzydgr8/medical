export const Shipping = ()=>{
    return(
        <section>
            <div className="container-fluid">
                <div className="montserrat">shipping address</div>
                <form>
                    <div>
                        <input placeholder="Enter your first name" />
                    </div>
                    <div>
                        <input placeholder="Enter yout last name" />
                    </div>
                    <div>
                        <input placeholder="Enter your phone number" type="phone" />
                    </div>
                    <div>
                        <input placeholder="Enter address" />
                    </div>
                    <div>
                        <input placeholder="Country" />
                    </div>
                    <div>
                        <input placeholder="State" />
                    </div>
                    <div>
                        <input placeholder="City" />
                    </div>
                    <div>
                        <div className="montserrat">shipping method</div>
                        <div>
                        <input type="checkbox" /> <div>customer pick up</div>
                        </div>

                        <div>
                        <input name="pickUp" type="checkbox" /> <div> delivery within lagos</div>
                        </div>
                        
                        <div>
                        <input name="pickUp" type="checkbox" /> <div>delivery outside lagos</div>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    )
}