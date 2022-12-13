require('./config/connect')
const express = require("express");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const Upload = require("./models/upload");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', "./views")
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    Upload.find()
    .then(
        (result)=>{
            res.render('pages/index', { mytitle: 'Click Fit' , dataImg: result});
        }
    )
    .catch(
        (error)=>{
            console.log(error);
        }
    )
})
// upload
const multer = require('multer');
const imgName = {
    name: ''
};
const myStroge = multer.diskStorage({
    destination: './public/img/uploads',
    filename: (req, file, redirect)=>{
        let date = Date.now();
        let fileN = date + '.' + file.mimetype.split('/')[1];
        redirect(null, fileN);
        imgName.name = fileN
    }
})
const upload = multer({storage: myStroge});
app.post('/upload', upload.any('image'), async(req, res)=>{
    try {
        data = req.body;
        img = new Upload(data);
        img.image = imgName.name;
        savedImage = await img.save();
        imgName.name = '';
        res.redirect('/')
    } catch (error) {
        res.status(400).send(error);
    }
})
//Delete Image

app.get('/delete/:id', (req, res)=>{
    id = req.params.id
    Upload.findByIdAndDelete({_id: id})
    .then(
        (deleteImage)=>{
            res.redirect('/')
        }
    ).catch(
        (error)=>{
            res.status(400).send(error)
        }
    )
})

app.listen(port, ()=>console.log("server work"))