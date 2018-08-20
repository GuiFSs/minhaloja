const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  path = require('path');

const produtos = require('./routes/api/produtos');
const usuarios = require('./routes/api/usuarios');
const categorias = require('./routes/api/categorias');
const pagamento = require('./routes/api/pagamento');

const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

// app.use('/api/produtos', produtos);
app.use('/api/usuarios', usuarios);
app.use('/api/produtos', produtos);
app.use('/api/categorias', categorias);
app.use('/api/pagamento', pagamento);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
