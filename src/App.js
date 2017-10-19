import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);

    this.renderMember = this.renderMember.bind(this);

    this.state = {
      kt: '',
      member: undefined
    };
  }

  //Submit handler sem grípur eventinn þegar forminu er póstað. Hér er verið að kalla á VR þjónstuna og uppfæra stöðuna á member.
  onSubmitForm(e){
    //Koma í veg fyrir refresh
    e.preventDefault();
    //Kalla á vefþjónustuna
    axios({
            url: `http://rest.vr.is/api/VRFe/?id=${this.state.kt}&sUser=VRR&sPass=Kveiktu7u`,
            method: 'get',
            contentType: 'application/json; charset=utf-8',
            headers: { 'Accept': 'application/json' }
        }).then(returnedMember => {
          //Uppfæra stöðuna á member 
          console.log(returnedMember.data);
      this.setState({
        member: returnedMember.data
      })
    });
  }

  //Uppfærir stöðuna á breytunni sem er tengd við input boxið
  updateKt(evt) {
    this.setState({
      kt: evt.target.value
    });
  }

  //Skrifar út html útfrá því sem kemur frá þjónustunni
  renderMember(){
    if(this.state.member){
      return (
        <section>
          <p><strong>Nafn: </strong>{this.state.member.Nafn}</p>
          <p><strong>Heimilisfang: </strong>{this.state.member.Heim}</p>
          <p><strong>Staður: </strong>{this.state.member.Stadur}</p>
          <p><strong>Netfang: </strong>{this.state.member.Netfang}</p>
          <p><strong>Sími: </strong>{this.state.member.Fasi}</p>
        </section>
        );
    }
  }

//Skrifar út html-ið fyrir þennan component
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Velkomin í VR lookup</h1>
        </header>
        <section>
          <form onSubmit={this.onSubmitForm.bind(this)}>
            <label htmlFor="kt">Kennitala:</label><br/>
            <input type="text" name="kt" id="kt" value={this.state.kt} onChange={this.updateKt.bind(this)}/>
            <br/><br/>
            <input type="submit" value="Sækja upplýsingar"/>
          </form>

        </section>
        {this.renderMember()}
      </div>
    );
  }
}

export default App;
