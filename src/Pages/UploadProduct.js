import { useEffect, useState } from "react"
import { colRef, storage } from "../App";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {v4} from 'uuid'
import { addDoc } from "firebase/firestore";
import axios from "axios";
import { Load } from "./Load";



export const UploadProduct = ()=>{
    const [productName, setProductName] = useState('');
    const [disable, setDisable] = useState(false)
    const [category, setCategory] = useState('clothing');
    const [sizes, setSizes] = useState('')
    const [imageUpload, setImageUpload] = useState('');
    const [productOwner, setProductOwner] = useState('');
    const [prize, setPrize] = useState('');
    const [stock, setStock] = useState('');
    const [formMessage, setFormMessage] = useState('');
 

    useEffect(() => {
        const displayName = JSON.parse(localStorage.getItem('displayName'));
        if (displayName) {
          setProductOwner(displayName);
        }
      }, []);
      const removeBackground = async (imageFile)=>{
        const formData = new FormData();
        formData.append('image_file', imageFile);
        formData.append('size', 'auto');
        try{
          const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers:{
              'Content-Type':'multipart/form-data',
              'X-Api-Key':process.env.REACT_APP_apiremoval
            },
            responseType:'blob'
          });
          const file = new File([response.data], imageFile.name, {types:'image/png'});
          setImageUpload(file)
        }catch(error){
          console.log(error)
        }
      }
    
      const handleProduct = async (e) => {
        e.preventDefault();
        if(prize === '' || stock ==='' || productName === ''|| imageUpload === ''|| sizes === ''|| category === ''){
          setFormMessage('all fields required')
          return
        }
        setDisable(true) 
        const imagePath = `images/${imageUpload.name + v4()}`;
        const imageRef = ref(storage, imagePath);
    
        try {
          const snapshot = await uploadBytes(imageRef, imageUpload);
          const url = await getDownloadURL(snapshot.ref);
    
          await addDoc(colRef, {
            product: productName.toLowerCase(),
            productImage: url,
            category: category.toLowerCase(),
            productOwner: productOwner.toLowerCase(),
            prize: prize + '$',
            imagePath: imagePath,
            stock:stock
          });
          setProductName('');
          setCategory('');
          setPrize('');
          setProductOwner('');
          setStock('');

          
          window.location.href = '/medical';
          setDisable(false)
        } catch (error) {
          console.log(error);
          setDisable(false)
          
        }
       
      };

    return(
      <>
        {
          disable ? <Load/> :
          <section>
          <div className="container-fluid">
          <form>
              <input type="file" accept="image/jpeg, image/png" onChange={e => {const file = e.target.files[0];
               if(file.size > 5 * 1024 * 1024){
                  alert('file size is than 5mb limit');
                  e.target.value = null;
               }else{
                   removeBackground(file);
               }
              }} required />
              <input value={stock} type="number" onChange={e => setStock(e.target.value)} placeholder="how many available" required/>
              <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="product name" required/>
              <input value={prize} type="number" placeholder="price in dollars" onChange={(e)=>setPrize(e.target.value)} required />
              <label htmlFor='category'>category</label>
              <select name = 'category' value={category} onChange={e => setCategory(e.target.value)} required >
                  <option  disabled >select category</option>
                  <option value={'clothing'}>clothing</option>
                  <option value={'shoes'}>shoes</option>
                  <option value={'bags'}>bags</option>
                  <option value={'accessories'}>accessories</option>
              </select>
              <input value={sizes} onChange={e=>setSizes(e.target.value)} placeholder="size" required />
              {/* <span>seperate each sizes with a delimiter like comma !</span> */}

              <button className="full-btn" onClick={handleProduct} disabled={disable}>submit</button>
              {formMessage}
              
          </form>
          </div>
      </section>
        }
      </>

    )
}