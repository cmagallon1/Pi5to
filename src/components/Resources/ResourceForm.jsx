import React,{Component} from 'react';
import { isNull } from 'util';
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import API from '../../api';
import { stringify } from 'querystring';
import '../../estilos.css'


// TODO change the categoria selector by [PDF, Video, Course, etc]
class ResouceForm extends Component {

    state = {
        nombre: "",
        autor: "",
        categoria:"",
        formato: "",
        edicion:"",
        etiquetas:"",
        descripcion:""
    }

    handleNombre = (e) => this.setState({nombre: e.target.value})
    handleAutor = (e) => this.setState({autor:e.target.value})
    handleCategoria = (e) => this.setState({categoria:e.target.value})
    handleFormato = (e) => this.setState({formato:e.target.value})
    handleEdicion = (e) => this.setState({edicion:e.target.value})
    handleEtiquetas = (e) => this.setState({etiquetas:e.target.value})
    handleDescripcion = (e) => this.setState({descripcion:e.target.value})

    handleSave = () => {
        if( this.state.autor == ""  || this.state.categoria == "" || this.state.formato == "" || this.state.edicion == "" || this.state.etiquetas == "" || this.state.descripcion == "") {
            this.setState({nombre:"no"});
        }  
        else {
            const data = {
                'categoria': this.state.categoria,
                'formato':this.state.formato,
                'nombre':this.state.nombre,
                'autor':this.state.autor,
                'edicion':this.state.edicion,
                'descripcion': this.state.descripcion,
                'etiquetas': this.state.etiquetas
            }
    
            axios.post(`${API}/repositorios/${this.props.match.params.id}/newrecurso/`, data)
                .then( res => {
                    this.props.history.push('/repositorios')
                }).catch( e => {
                    alert("No pudo subirse el archivo");
                })    
        }
    }


    render() {
        return(
            <div className="columns prueba">
                <div className = "column is-three-quarters is-half is-offset-one-quarter">
                    <h1 className="title">
                        Registrar recurso
                    </h1>
                    <div className="field">
                        <label className="label">Nombre</label>
                        <div className="control">
                            <input className="input" onChange = {this.handleNombre} type="text" id="nombre" placeholder="Nombre"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Autor</label>
                        <div className="control">
                            <input className="input" onChange = {this.handleAutor} type="text" id="autor" placeholder="Autor"/>
                        </div>
                    </div>
                    <div className="field">
                      <label className="label">Categoria</label>
                      <div className="control">
                        <div className="select">
                          <select id="categoria" onChange={this.handleCategoria}>
                            <option value=""> </option>
                            <option value="Lirico">Lirico</option>
                            <option value="Epico">Epico</option>
                            <option value="Dramatico">Dramatico</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                        <label className="label">Formato</label>
                        <div className="control">
                            <input className="input" onChange = {this.handleFormato} type="text" id="formato" placeholder="Formato"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Edicion</label>
                        <div className="control">
                            <input className="input" onChange = {this.handleEdicion} type="text" id="edicion" placeholder="Edicion"/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Etiquetas</label>
                        <div className="control">
                            <input className="input" onChange = {this.handleEtiquetas} type="text" id="etiquetas" placeholder="Etiquetas"/>
                        </div>
                    </div>
                    <div className="field">
                      <label className="label">Descripcion</label>
                      <div className="control">
                        <textarea className="textarea" onChange = {this.handleDescripcion} id="descripcion" placeholder="Textarea"></textarea>
                      </div>
                    </div>
                    <div class="field is-grouped">
                      <div class="control">
                        <button class="button is-link" onClick={this.handleSave}>Guardar</button>
                      </div>
                      <div class="control">
                        <button class="button is-text" onClick={()=>this.props.history.push('/')}>Cancelar</button>
                      </div>
                    </div>
                </div>
        </div>
        );
    }
}

export default withRouter(ResouceForm);