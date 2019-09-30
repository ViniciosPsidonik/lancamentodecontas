import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLancamento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lancType: '',
      valor: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
  onChangeSelect(e) {
    this.setState({
      lancType: e.target.value
    });
  }
  onChangeValor(e) {
    this.setState({
      valor: e.target.value
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }
  valorOnChange(e){
    if (!/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g.test(e.target.value)){ 
      console.log('aaa');
      e.target.value = e.target.value.replace(/^(\d{0,4}\.\d{0,5}|\d{0,9}|\.\d{0,8}).*/, '$1');
    }
  }
  render() {
    return (
      <div>
        <div className="row addlanc">
          <div className="col s12 m6 l3">
            <div className="input-field col s11">
              <input id="Nota" type="text" className="validate Nota" />
              <label htmlFor="Nota">Num. Nota</label>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="input-field col s5">
              <input onChange={this.valorOnChange.bind(this)} id="Valor" type="text" className="validate Valor" />
              <label htmlFor="Valor">Valor</label>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="input-field col s11">
              <input id="Nota" type="text" className="validate Nota" />
              <label htmlFor="Nota">Num. Nota</label>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="input-field col s11">
              <input id="Nota" type="text" className="validate Nota" />
              <label htmlFor="Nota">Num. Nota</label>
            </div>
          </div>
        </div>

        <button className="button" onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>

        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Novo Lançamento"
          onAfterOpen={() => this.refs.valor.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Novo Lançamento</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <div className="form-group row">
              <label for="staticEmail" className="col-sm-2 col-form-label">Tipo do Lançamento:</label>
              <div className="col-sm-10">
                <select className="custom-select" onChange={this.onChangeSelect.bind(this)} className="checkbox__box">
                  <option value="ENTRADA" >ENTRADA</option>
                  <option value="SAIDA" >SAIDA</option>
                </select>
              </div>
            </div>
            <label className="checkbox">
              <p>Valor do Lançamento:</p><br />
              <input
                type="text"
                ref="valor"
                value={this.state.valor}
                onChange={this.onChangeValor.bind(this)} />
            </label>
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>
        </Modal>
      </div>
    );
  }
}
