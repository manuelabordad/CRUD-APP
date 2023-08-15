import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks]= useState([]);

    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try{
                const res = await axios.get("https://floating-everglades-33971-e511527c9b7f.herokuapp.com/")
                setBooks(res.data)

                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[]);

    const handleDelete = async(id)=>{
        try{
            await axios.delete("https://floating-everglades-33971-e511527c9b7f.herokuapp.com/"+id);
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div> 
        <h1 className='titles'>Library</h1>
    
        <div className='books'>
            {books.map(book=>(
                <div className='book card' key={book.id}>
                        {<img src={`http://localhost:8800/images/${book.cover}`} className='card-img-top' alt=''/>}
                        <div className="card-body">
                        <p className='card-title'>{book.title}</p>
                        <p className='card-text'>{book.desc}</p>
                        <div className='price'>${book.price}</div>
                        <button className="delete btn" onClick={()=>handleDelete(book.id)}>Delete</button>
                        <button className="update btn"><Link to={`/update/${book.id}`}>Update</Link></button>
                        </div>
                </div>
            ))}
        </div>
        <button className='btn btn-add'><Link to="/add">Add new Book</Link></button>
    </div>
  )
}

export default Books