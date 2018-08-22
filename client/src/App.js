import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Login from './components/authenticate/login/Login';
import Cadastro from './components/authenticate/cadastro/Cadastro';
import MyContent from './components/content/MyContent';
import Produto from './components/content/Produto/Produto';
import MyFooter from './components/footer/MyFooter';
import Carrinho from './components/carrinho/Carrinho';

import jwt_decode from 'jwt-decode';
import store from './store';
import { setUsuarioAtual, logoutUsuario } from './actions/autenticacao';
import Pagamento from './components/pagamento/Pagamento';
import setAuthToken from './utils/setAuthToken';

const jwtToken = localStorage.getItem('jwtToken') || null;

if (jwtToken) {
  setAuthToken(jwtToken);
  const decoded = jwt_decode(jwtToken);
  store.dispatch(setUsuarioAtual(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUsuario());
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Navbar} />
        <Route
          exact
          path="/produto/:produtoId/:produtoNome"
          component={Produto}
        />
        <Route exact path="/categoria/:nome" component={MyContent} />
        <Route exact path="/carrinho" component={Carrinho} />
        <Route exact path="/" component={MyContent} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/pagamento" component={Pagamento} />
        <Route exact path="/cadastro" component={Cadastro} />
        <Route path="/" component={MyFooter} />
      </div>
    );
  }
}

export default App;
