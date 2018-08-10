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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Navbar} />
        <Route
          exact
          path="/produto/:categoriaId/:produtoId"
          component={Produto}
        />
        <Route exact path="/categoria/:categoriaId" component={MyContent} />
        <Route exact path="/carrinho/:carrinhoId" component={Carrinho} />
        <Route exact path="/" component={MyContent} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastro" component={Cadastro} />
        <Route path="/" component={MyFooter} />
      </div>
    );
  }
}

export default App;
