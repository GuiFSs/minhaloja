import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Input, Icon, Checkbox, Row, Col } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { loginUsuario } from '../../../actions/autenticacao';
import Spinner from '../../layout/Spinner';
import myModal from '../../layout/myModal';
import { setErrors } from '../../../actions/errors';

class Login extends Component {
  componentDidUpdate() {
    const { errors } = this.props;
    if (Object.keys(errors).length > 0) {
      let errMsg = Object.keys(errors).map(key => (
        <li key={key}>{errors[key]}</li>
      ));
      myModal(
        'error',
        'Erro ao tentar fazer login',
        <ul className="errors-login">{errMsg}</ul>
      );
      this.props.setErrors({});
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginUsuario(values, this.props.history);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, isAutenticado } = this.props.autenticacao;
    let content = (
      <Row>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }}>
          <Form
            style={{ margin: 'auto', marginTop: '50px', padding: '35px' }}
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Este não é uma e-mail válido!'
                  },
                  {
                    required: true,
                    message: 'Por favor preencha o seu E-mail!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Email"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('senha', {
                rules: [
                  { required: true, message: 'Por favor digite sua senha!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Senha"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>Lembre-me</Checkbox>)}
              <a
                style={{ float: 'right' }}
                className="login-form-forgot"
                href=""
              >
                Esqueci minha senha
              </a>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Entrar
              </Button>
              Ou <Link to="/cadastro">registre-se agora!</Link>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
    if (loading) {
      content = <Spinner />;
    } else if (isAutenticado) {
      content = <Redirect to="/" />;
    }

    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  autenticacao: state.autenticacao,
  errors: state.errors.errors
});

export default connect(
  mapStateToProps,
  { loginUsuario, setErrors }
)(Form.create()(Login));
