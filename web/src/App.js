import React from 'react';
import { useFormik } from 'formik'; 
import * as Yup from 'yup'; 
import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';

const Product = () => {

  const [products, setProducts] = useState([])
  const [toggle, setToggle] = useState(false)
  const [editproduct, setEditProduct] = useState(null)
  
  
  
  useEffect(() => { 
    axios({
      url: 'http://localhost:3002/products',
      method: "get",
      withCredentials: true
    })
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setProducts(response.data.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [toggle])
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      photo: '',
      code: ''
    },
    validationSchema: Yup.object({
      name: Yup   
        .string("enter your product name")
        .min(3, 'product name is too short')
        .required('product name is Required'),
      description: Yup
        .string("enter product description"),

      price: Yup
        .number("enter a number")
        .moreThan(0, "price cant be zero")
        .required('price is required'),

      code: Yup
        .string("code must be string")
        .required('code is required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        let response = await axios.post('http://localhost:3002/product',
          values,
          {
            withCredentials: true
          })
        console.log("response: ", response.data);
        setToggle(!toggle)

      } catch (e) {
        console.log("Error in api call: ", e);
      }
    },
   
  });

 

  let updateHandler = (e) => {
    e.preventDefault();




    axios.put(`http://localhost:3002/product/${editproduct?._id}`,
      {
        name: editproduct.name,
        price: editproduct.price,
        description: editproduct.description,
        code: editproduct.code,
      },
      {
        withCredentials: true
      })
      .then(function (response) {
        console.log("updated: ", response.data);

        setToggle(!toggle);
        setEditProduct(null);

      })


      .catch(function (e) {
        console.log("Error in api call: ", e);

      }


 ) }


  return (

    <>
      <form onSubmit={formik.handleSubmit}>

        <input
          id="name"
          name="name"
          type="text"
          placeholder='name'
          onChange={formik.handleChange}
          value={formik.values.name} />
        {formik.touched.name && formik.errors.name ? (
          <div className='errorMessage'>{formik.errors.name}</div>
        ) : null}

        <br />


        <input
          id="description"
          name="description"
          type="text"
          placeholder='description'
          onChange={formik.handleChange}
          value={formik.values.description} />
        {formik.touched.description && formik.errors.description ? (
          <div className='errorMessage'>{formik.errors.description}</div>
        ) : null}

        <br />
        <input
          id="price"
          name="price"
          type="price"
          placeholder='price'
          onChange={formik.handleChange}
          value={formik.values.price} />
        {formik.touched.price && formik.errors.price ? (
          <div className='errorMessage'>{formik.errors.price}</div>
        ) : null}

        <br />

        <input
          id="code"
          name="code"
          type="code"
          placeholder='code'
          onChange={formik.handleChange}
          value={formik.values.code} />
        {formik.touched.code && formik.errors.code ? (
          <div className='errorMessage'>{formik.errors.code}</div>
        ) : null}

        <br />

        <button type="submit">Submit</button>
      </form>
      <hr />
      {(editproduct !== null) ? (
        <div>
          <h1>updated form</h1>
          <form onSubmit={updateHandler}>
            name : <input type="text" onChange={(e) => {
              setEditProduct({ ...editproduct, name: e.target.value })
            }} value={editproduct?.name} /> <br />

            description : <input type="text" onChange={(e) => {
              setEditProduct({ ...editproduct, description: e.target.value })
            }} value={editproduct?.description} /> <br />

            price : <input type="text" onChange={(e) => {
              setEditProduct({ ...editproduct, price: e.target.value })
            }} value={editproduct?.price} /> <br />

            code: <input type="text" onChange={(e) => {
              setEditProduct({ ...editproduct, code: e.target.value })
            }} value={editproduct?.code} /> <br />

            <button>submit</button>

          </form>

        </div>)
        : null}

      <hr />

      <div>
        {products.map((eachProduct => (
          <div key={eachProduct._id}>
            <h4>{eachProduct?.name}</h4>
            <div>{eachProduct?.description}</div>
            <div>{eachProduct?.price}</div>
            <div>{eachProduct?.code}</div>
            <button onClick={() => {
              axios({
                url: `http://localhost:3002/product/${eachProduct._id}`,
                method: "delete",
                withCredentials: true
              })
                .then(function (response) {
                  console.log("deleted product", response.data)
                  setToggle(!toggle)
                })



                .catch(function (error) {
                  console.log("error in deleting product", error)
                })
            }}>delete</button>
            <button onClick={() => {
              setEditProduct({
                _id: eachProduct?._id,
                name: eachProduct?.name,
                description: eachProduct?.description,
                price: eachProduct?.price,
                code: eachProduct?.code
              })
            }}>edit</button>

          </div>
        )))}
      </div>
    </>

  );
};


export default Product
