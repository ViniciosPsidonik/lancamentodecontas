import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import PrivateHeader from './PrivateHeader';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let password1 = this.refs.password1.value.trim();

    if (password.length < 8) {
      return this.setState({ error: 'A senha deve conter no minimo 8 carácteres.' });
    }

    if (password != password1) {
      return this.setState({ error: 'As senhas devem coincidir.' });
    }

    Accounts.createUser({ email, password, profile: { siteId: "lancamentodecontas" } }, (err) => {
      console.log(err);
      if (err) {
        if (err.error == 403) {
          this.setState({ error: "Email já utilizdo, por favor informe outro." });
        } else {
          this.setState({ error: err.reason });
        }

      } else {
        this.setState({ error: '' });
      }
    });
  }
  render() {
    return (
      <div>
        <PrivateHeader title="Lançamento de Contas" />
        <div className="box-view">
          <div className="boxed-view__box">
            <h1 className="center">Criar Conta</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email" />
              <input type="password" ref="password" name="password" placeholder="Senha" />
              <input type="password" ref="password1" name="password" placeholder="Repita a Senha" />
              <div className="betwenBtns">
                <Link to="/">Já tem uma conta?</Link>
                <button className="button btn waves-effect waves-light">Criar usuário</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}