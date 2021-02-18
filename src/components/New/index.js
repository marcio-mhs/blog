import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './new.css';
import firebase from '../../firebase';

class New extends Component{
    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            descricao: '',
            imagem: '',
            alert: '',
        }
        this.cadastrar = this.cadastrar.bind(this);
    }

    componentDidMount(){
        if (!firebase.getCurrentUser()){
            this.props.history.replace('/');
            return null;
        }
    }

    cadastrar = async (e) => {
        e.preventDefault();
        if (this.state.titulo != '' && this.state.descricao != '' && this.state.imagem != ''){
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.imagem,
                descricao: this.state.descricao,
                autor: localStorage.nome,
            });
            this.props.history.push("/dashboard");
        } else {
            this.setState({alert: 'Preencha todos os campos!'});
        }        
    }
    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <span>{this.state.alert}</span>
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