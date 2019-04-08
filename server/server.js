let express = require('express');
let app = express();
let multer = require('multer');
let cors = require('cors');

app.use(cors());

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer ({storage : storage}).single('file');

app.post('/upload', (req, res)=>{
    
    upload(req, res ,  (err)=>{
        if(err instanceof multer.MulterError){
            return res.status(500).json(err)
        }else if (err){
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});

app.listen(8000, ()=>{
    console.log('Server is Online')
})