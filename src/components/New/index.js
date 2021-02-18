import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './new.css';

class New extends Component{
    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            descricao: '',
            imagem: '',
        }
        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar(e){
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <label>Título:</label>
                    <input type="text" autoComplete="off" autoFocus value={this.state.titulo} 
                        onChange={(e) => this.setState({titulo: e.target.value})}
                        placeholder="Informe o Título"/>
                    <br/>

                    <label>Url da Imagem:</label>
                    <input type="text" autoComplete="off" value={this.state.imagem} 
                        onChange={(e) => this.setState({imagem: e.target.value})}
                        placeholder="Informe a URL da imagem"/>
                    <br/>

                    <label>Descrição:</label>
                    <textarea type="text" autoComplete="off" value={this.state.descricao} 
                        onChange={(e) => this.setState({descricao: e.target.value})}
                        placeholder="Informe a Descrição"/>
                    <br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(New);