import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

class Cadastro extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Campos devem ser iguais!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Row>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 4 }}>
          <Form
            style={{ margin: 'auto', marginTop: '50px', padding: '35px' }}
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            {/* <Form onSubmit={this.handleSubmit}> */}
            <FormItem {...formItemLayout} label="E-mail: ">
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
              })(<Input placeholder="Ex: gilsonnunes@gmail.com" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Senha: ">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor insira sua senha!'
                  },
                  {
                    validator: this.validateToNextPassword
                  },
                  {
                    min: 6,
                    max: 30,
                    message: 'Senha deve ter entre 6 e 30 caracteres'
                  }
                ]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Confirmar Senha: ">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor confirme sua senha!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Criar seu Cadastro
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(Cadastro);
