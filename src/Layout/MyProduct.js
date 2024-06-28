import { UseContextData } from "../Context/ContextAuth/ContextProvider/UseContextData";
import { MyProductArray } from "./MyProductArray";


export const MyProduct = ()=>{
    const {data} = UseContextData();
  


    return(
          <div className="gridProduct">
            {
                data && data.map((data)=>(
                    <MyProductArray key={data.id} data={data}/>
                ))
            }
          </div>
    )
}