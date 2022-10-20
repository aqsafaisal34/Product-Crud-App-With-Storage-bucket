import axios from 'axios';
import { useEffect, useState } from "react";
import './App.css';



function Product() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const [users, setUsers] = useState([])
  const [toggleRefresh, setToggleRefresh] = useState(true)

  useEffect(() => {

    let getAllUsers = async () => {
       let response = await axios.get('https://productcrudapp.herokuapp.com/products');
     
      setUsers(response.data.data)
    }
    getAllUsers();

  }, [toggleRefresh])





  const producthandler = async (e) => {
    e.preventDefault();

    var productimage = document.getElementById("productimage");
    console.log("fileInput: ", productimage.files); // local url

    

    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax


    formData.append("name", name); // this is how you add some text data along with file
    formData.append("description", description); // this is how you add some text data along with file
    formData.append("price", price); // this is how you add some text data along with file
    formData.append("productimage", productimage.files[0]); // file input is for browser only, use fs to read file in nodejs client
    

    axios({
      method: 'post',
      url: "https://productcrudapp.herokuapp.com/products",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
      .then(res => {
        console.log(`upload Success` + res.data);
        setToggleRefresh(!toggleRefresh)
      })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <div>
      <div className="form">
      <form onSubmit={producthandler}>
        <h1>PRODUCT FORM</h1>

        Name: <input name="name" type="text" id='name' onChange={(e) => { setName(e.target.value) }} />
        <br />
        Description: <input name="description" type="text"  id='description' onChange={(e) => { setDescription(e.target.value) }} />
        <br />
        Price: <input name="price" type="Number"  id='price' onChange={(e) => { setPrice(e.target.value) }} />
        <br />

        Product Image: <input type="file" id="productimage" accept='image/*'
          onChange={() => {
            ////// to display imager instantly on screen
            var productimage = document.getElementById("productimage");
            var url = URL.createObjectURL(productimage.files[0])
            console.log("url: ", url);
            document.getElementById("img").innerHTML = `<img width="200px" src="${url}" alt="" id="img"> `
          }} />

         
        <div id="img" ></div>
     
        <br />
        <button type='submit'>Add Product</button>

      </form>
      </div>


      <h1>Products List: </h1>

      <div className='productlist'>
        {users.map(eachUser => (
          <div key={eachUser.id}>
            <div className='product'>
            <img width="150px" src={eachUser.productimage} alt="" />
            <h4>{eachUser.name}</h4>
            <p className='description'>{eachUser.description}</p>
            <p ><span className='price'>{eachUser.price}</span><span>PKR</span></p>
         
           
            </div>
          </div>
        ))}
      </div>





     
    </div>
  );
}

export default Product;