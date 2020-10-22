import React, { Component } from 'react';
import firebase from './fireConnection';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      nome: "Carregando...",
      idade: "",
      tokenInput: '',
      lista: []
    };

    this.cadastrar = this.cadastrar.bind(this);

    
   //metodo 'on' atualiza o valor em real-time. Para observar apenas uma vez, colocar 'once' no lugar de on
   firebase.database().ref("usuarios").child(1).on('value', (snapshot)=>{
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
   });
    

  // Your web app's Firebase configuration

  //buscar todos os dados
  firebase.database().ref("usuarios").on("value", (snapshot)=>{
    let state = this.state;
    state.lista = [];

    snapshot.forEach((childItem)=>{
      state.lista.push({
        key: childItem.key,
        nome: childItem.val().nome,
        idade: childItem.val().idade
      })
    });
    this.setState(state);
  });

  

}

  cadastrar(e){
    //inserindo ou editando um dado
    // firebase.database().ref('token').set(this.state.tokenInput);
    let usuarios = firebase.database().ref('usuarios');
    let chave = usuarios.push().key;
    usuarios.child(chave).set({
      nome: this.state.nomeInput,
      idade: this.state.idadeInput
    })
  }


  render(){
    const { nome, idade } = this.state;
    return(
      <div>

        <form onSubmit={this.cadastrar} >
          <input type="text" value={this.state.tokenInput} onChange={(e)=> this.setState({tokenInput: e.target.value})} />
          <button type="submit" >Cadastrar</button>
        </form>

        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>
      </div>
    );
}


}

export default App;
