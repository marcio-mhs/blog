import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome,
        };
        this.logout =this.logout.bind(this);
    }

    async componentDidMount(){
        if (!firebase.getCurrentUser()){
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            this.setState({nome: info.val().nome});
        });
    }

    logout(){

    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
                <p>Logado com: teste@teste.com.br</p>
                <button onClick={() => this.logout()}>Deslogar</button>
            </div>
        );
    }
}

export default withRouter(Dashboard);