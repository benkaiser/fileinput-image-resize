var express = require('express');
const multer  = require('multer')
var app = express();
var path = require('path');
var port = process.env.PORT || 8777;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
});
const upload = multer({ storage: storage});

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', upload.single('fileinput'), function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// start the server
app.listen(port, function() {
  console.log('server started on port ' + port);
});