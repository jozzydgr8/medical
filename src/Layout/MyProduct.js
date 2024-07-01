import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { MyProductArray } from "./MyProductArray";


export const MyProduct = ()=>{
    const {data} = UseContextData();
  


    return(
        <section>
            <div>
            <div className="gridProduct">
            {
                data && data.map((data)=>(
                    <MyProductArray key={data.id} data={data}/>
                ))
            }
          </div>
            </div>

        </section>

    )
}