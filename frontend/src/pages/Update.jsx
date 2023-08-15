import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [bookinfo,setBookinfo]= useState({
        title: "",
        desc:"",
        price: null,
        cover: null
    })
    const {id} = useParams()

    const handleInputChange = (event) => {
        const { name, value, type } = event.target;
    
        const inputValue = type === 'file' ? event.target.files[0] : value;
    
        setBookinfo((prevData) => ({
          ...prevData,
          [name]: inputValue,
        }));
      };
    
    const navigate = useNavigate()
  

    const handleClick= async e =>{
    console.log("bookinfo", bookinfo)
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', bookinfo.title);
      formData.append('desc', bookinfo.desc);
      formData.append('price', bookinfo.price);
      formData.append('cover', bookinfo.cover);
  
      try {
        await axios.put('https://floating-everglades-33971-e511527c9b7f.herokuapp.com/'+id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('book info updated');
        navigate('/'); 
      } catch (err) {
        console.error('Error updating book', err);
      }
    }

  return (
    <form className='form'>
    <h1 className='titles'>UPDATE NEW BOOK</h1>
    <input type='text' placeholder='title' name='title' onChange={handleInputChange} />
    <input type='text' placeholder='desc' name='desc' onChange={handleInputChange} />
    <input type='number' placeholder='price' name='price' onChange={handleInputChange} />
    <input type='file' placeholder='cover' name='cover' onChange={handleInputChange} />
    <button className='formButton-up btn' onClick={handleClick}>Add</button>
  </form>
    
  )
}

export default Update