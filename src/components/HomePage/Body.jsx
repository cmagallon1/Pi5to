import React, { Component } from 'react';
import 'bulma';
import axios from 'axios';
import { connect } from 'react-redux'
import { resourcesFound } from '../../actions/UserActions'
import { withRouter } from 'react-router-dom'
import Loader from '../common/Loader';
import API from '../../api'

class Body extends Component {
  state = { busqueda: "", buscarPor: "name", loading: false }
  buttonStyle = { width: "45%", marginRight: "5%" }
  
  handleBusqueda = (e) => this.setState({ busqueda: e.target.value})
  handleBuscarPor = (e) => this.setState({ buscarPor : e.target.value })

  buscar = (e) => {
    this.setState({ loading: true })
    
    if(e.target.id == "lucky") {
      axios.get(API + '/recursos/')
        .then((res) => {
          this.props.resourcesFound(res.data)
          this.props.history.push('/searchresult')
        })
        .catch(error => {
          this.props.resourcesFound(error)
        })
      } 
    else {
      const data = {}
      data[this.state.buscarPor] = this.state.busqueda

      axios.post(API + '/recursos/find', data).
      then((res)=>{
        this.props.resourcesFound(res.data)
        this.props.history.push('/searchresult')
        this.setState({ loading: false })
      })
      .catch( error => {
        this.props.resourcesFound(error)
        this.setState({ loading: false })
      })
    }
  }

  render() {
    if(this.state.loading){
      return <Loader/>
    }

    return (
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="column is-6">
            <h1 className="title">
              ¿Qué aprenderás hoy?
              </h1>
            <input
              className="input is-rounded"
              type="text"
              placeholder="Bases de datos, Psicología del color, Antimateria" 
              onChange={this.handleBusqueda}/>
            <div className="control column is-12 center has-text-centered">
              <label className="radio">
                <input name="buscarPor" type="radio" value="name" onClick={this.handleBuscarPor} defaultChecked/>
                Nombre
                </label>
              <label className="radio">
                <input name="buscarPor" type="radio" value="author" onClick={this.handleBuscarPor}/>
                Autor
                </label>
              <label className="radio">
                <input name="buscarPor" type="radio" value="description" onClick={this.handleBuscarPor}/>
                Descripción
                </label>
              <label className="radio">
                <input name="buscarPor" type="radio" value="format" onClick={this.handleBuscarPor}/>
                Formato
                </label>
              <label className="radio">
                <input name="buscarPor" type="radio" value="category" onClick={this.handleBuscarPor}/>
                Categoría
                </label>
            </div>
            <div className="field is-grouped center has-text-centered">
              <a className="button is-medium" style={this.buttonStyle} onClick={this.buscar}>Buscar</a>
              <a id="lucky" className="button is-medium" style={this.buttonStyle} onClick={this.buscar}>Voy a tener suerte</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let HomePageBody = Body
HomePageBody = connect(state=>({
  users: state.users
}), {
  resourcesFound
})(Body)

export default withRouter(HomePageBody);