import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import PrivateHeader from './PrivateHeader';


export default class Login extends React.Component {
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

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Email ou senha incorretos, por favor tente novamente.' });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return (
      <dix>
        <PrivateHeader title="Lançamento de Contas" />
        <div className="container">
          <div className="box-view">
            <div className="boxed-view__box">
              <h1 className="center">Login</h1>

              {this.state.error ? <p>{this.state.error}</p> : undefined}

              <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                <input type="email" ref="email" name="email" placeholder="Email" />
                <input type="password" ref="password" name="password" placeholder="Password" />

                <div className="betwenBtns">
                  <Link to="/signup">Criar nova conta</Link>
                  <button className="button btn waves-effect waves-light">Login</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </dix>
    );
  }
}