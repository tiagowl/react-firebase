import React, { Component } from 'react';
import firebase from './fireConnection';

class Auth extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            senha: ''
        }
        this.cadastrar = this.cadastrar.bind(this);
        this.login = this.login.bind(this);

        //deslogar o usuario do sistema
        firebase.auth().signOut();

        //observa se um usuario logou
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
               //pegando o id do usuario cadastrado e cadastrando no database
                firebase.database().ref('usuarios').child(user.uid).set({
                    nome: this.state.nome
                })
            }
        })
    }

    cadastrar(e){
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
        .catch((error)=>{
            if(error.code === 'auth/invalid-email'){
                alert('Email inválido.');
            }
            if(error.code === 'auth/weak-password'){
                alert('Senha fraca.');
            }
        });
    }

    login(e){
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
        .catch((error)=>{
            if(error.code === 'auth/wrong-password'){
                alert('Senha incorreta.');
            }
        });
    }

    

    render(){
        return(
            <div>
                <h1>Cadastro</h1>
                <form onSubmit={this.cadastrar} >
                    <label>Email</label><br/>
                    <input type="text" value={this.state.email} onChange={(e)=> this.setState({email: e.target.value})} /><br/>
                    <label>Senha</label><br/>
                    <input type="text" value={this.state.senha} onChange={(e)=> this.setState({senha: e.target.value})} /><br/>
                    <button type="submit" >Cadastrar</button>
                </form><br/>

                <h1>Login</h1>
                <form onSubmit={this.login} >
                    <label>Email</label><br/>
                    <input type="text" value={this.state.email} onChange={(e)=> this.setState({email: e.target.value})} /><br/>
                    <label>Senha</label><br/>
                    <input type="text" value={this.state.senha} onChange={(e)=> this.setState({senha: e.target.value})} /><br/>
                    <button type="submit" >Login</button>
                </form>
            </div>
        )
    }
}

export default Auth;