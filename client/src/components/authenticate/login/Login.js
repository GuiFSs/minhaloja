import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Input, Icon, Checkbox, Row, Col } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

class Login extends Component {
  state = {
    visible: true
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('submit');
  };

  onCancel = () => {};
  onCreate = () => {};
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Usuario"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
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
  }
}

export default Form.create()(Login);
