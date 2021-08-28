const express = require('express');
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended:false}))

app.use(express.static("public"));
app.use(cors());
//set static folder
// app.use(express.static(path.join(__dirname, '/public')));

console.log(path.join(__dirname, 'public'));
//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png"||file.mimetype=="image/jpeg" ||file.mimetype=="image/jpg"){
            cb(null, true)
        }else{
            return cb(new Error('Chi dc up load anh!'))
        }
    }
}).single("fileImage");

app.get('/',(req,res) => {
    res.send('Ok')
})

app.post("/xuly",  function(req, res){
    console.log(req.file);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log("co loi xay ra"); 
        } else if (err) {
          console.log("co loi xay ra ." + err);
        }else{
            console.log("Upload thanh cong");
            console.log(req.file); // Thông tin file đã upload
            res.json({
                success:true,
                mess:'ok'
            })
        }

    });
});




app.listen(3000,() => {
    console.log(`App running on port 3000`);
})
