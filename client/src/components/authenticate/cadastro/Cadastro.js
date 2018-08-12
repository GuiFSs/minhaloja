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
    if (value && value !== form.getFieldValue('senha')) {
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
        <Col sm={{ span: 24, offset: 0 }} md={{ span: 16, offset: 4 }}>
          <Form
            style={{ margin: 'auto', marginTop: '50px', padding: '35px' }}
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <FormItem {...formItemLayout} label="Nome:">
              {getFieldDecorator('nome', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor digite seu nome'
                  },
                  {
                    min: 3,
                    max: 30,
                    message: 'Nome deve ter entre 6 e 30 caracteres'
                  }
                ]
              })(<Input name="nome" placeholder="Ex: Brenão" />)}
            </FormItem>
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
              })(
                <Input name="email" placeholder="Ex: gilsonnunes@gmail.com" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Senha: ">
              {getFieldDecorator('senha', {
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
              })(<Input name="senha" type="password" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Confirmar Senha">
              {getFieldDecorator('senha2', {
                rules: [
                  {
                    required: true,
                    message: 'Por favor confirme sua senha!'
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input
                  name="senha2"
                  type="password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </FormItem>
            {/* TODO: adicionar mais campos, e.g: telefone, endereco */}
            <FormItem {...tailFormItemLayout}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
              >
                Cadastrar
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(Cadastro);
