const express = require('express')
const multer = require('multer')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')


const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"test"
})

app.use(express.json())
app.use(cors())
app.use('/images', express.static(path.join(__dirname, '/images')));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = path.join(__dirname, '/images');
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage }).single('cover');


app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books",(req, res)=>{
    const q = "SELECT * FROM books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post('/books', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
       console.log("multer error: ", err)
      } else if (err) {
        console.log("other error: ", err)
      }
  
      const{title, desc, price} = req.body;
      const imagePath = req.file.filename;

      const q = "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?,?,?,?)";
    
        db.query(q,[title, desc, price, imagePath],(err,data)=>{
            if(err) return res.json(err)
            return res.json("Book has been created")
        })

    })
  })

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = (?)"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted!")
    })

})
app.put("/books/:id",(req,res)=>{
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
         console.log("multer error: ", err)
        } else if (err) {
          console.log("other error: ", err)
        }
        const bookId = req.params.id;
        const{title, desc, price} = req.body;
        const imagePath = req.file.filename;
  
        const q = "UPDATE books SET `title`= ?, `desc`= ?,`price`= ?, `cover`= ? WHERE id = ?";
      
          db.query(q,[title, desc, price, imagePath,bookId],(err,data)=>{
              if(err) return res.json(err)
              return res.json("Book has been created")
          })
  
      })

})
app.listen(8800,()=>{
    console.log('Connected to backend!')
})