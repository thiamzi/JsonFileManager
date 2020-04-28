const express = require('express');
let cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
fs = require('fs');
 request = require('request');

/*const DIR = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});
let upload = multer({ storage: storage });
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.post('/api/create/:nom', function (req, res) {

  var data = JSON.stringify(req.body, null, 2);
  var nom = req.params.nom + '.json'
  fs.writeFile('./uploads/' + nom, data, (err) => {

    var fichier = fs.readFileSync('./uploads/mabase.json');
    var noms = JSON.parse(fichier);
    noms.mesfichiers.push(nom);
    donnees = JSON.stringify(noms)
    fs.writeFileSync('./uploads/mabase.json', donnees);
    if (err) return res.send({
      success: false
    });
    res.status(200).json({
      msg: 'succes'
    })
  });

});


app.get("/api/", (req, res) => {

  var fichier
  try {
    fichier = fs.readFileSync('./uploads/mabase.json');
  } catch (error) {
    let mabase = {
      mesfichiers: []
    }
    var donnees_base = JSON.stringify(mabase);
    fichier = fs.writeFileSync('./uploads/mabase.json', donnees_base);
    fichier = fs.readFileSync('./uploads/mabase.json');
  }
  return res.send(fichier)
});

app.get("/api/:nom", (req, res) => {

    let basejson = fs.readFileSync('./uploads/mabase.json');
    let base = JSON.parse(basejson);
    for (let i = 0; i < base.mesfichiers.length; i++) {
      if(base.mesfichiers[i]===req.params.nom){
        let fichier = fs.readFileSync('./uploads/'+base.mesfichiers[i]);
        return res.send(fichier)
      }
    }
    return res.send({error : 'notfound'})
});

app.put("/api/edit/:nom", (req, res) => {

  var data = JSON.stringify(req.body, null, 2);
  var nom = req.params.nom 
  fs.writeFile('./uploads/' + nom, data, (err) => {

    if (err) return res.send({
      success: false
    });
    res.status(200).json({
      msg: 'succes'
    })
  });
});

app.delete("/api/delete/:nom", (req, res) => {

  var nom = req.params.nom 
  fs.unlink('./uploads/' + nom, (err) => {
    let basejson = fs.readFileSync('./uploads/mabase.json');
    let base = JSON.parse(basejson);
    for (let i = 0; i < base.mesfichiers.length; i++) {
      if(base.mesfichiers[i]===nom){
        base.mesfichiers.splice(i , 1)
        fichier = JSON.stringify(base)
        fs.writeFileSync('./uploads/mabase.json', fichier);
        return res.send({success : 'success'})
      }
    }
    if (err) return res.send({
      success: false
    });
    res.status(200).json({
      msg: 'succes'
    })
  });
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});