
import React from 'react'
//import { connect } from 'react-redux'

import NavBarApp from '../../AddressBook/NavBar.jsx';
import Additional_Contacts_Grid from './Additional_Contacts_Grid.jsx';
import Additional_Contact_Card from './Additional_Contact_Card.jsx';

const Settings = require('../../AddressBook/settings/settings.json');


class MainPage extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {Resume: 'Grid', id_contact: ''}

    this.View_Contacts = this.View_Contacts.bind(this);
    this.SetIdContact = this.SetIdContact.bind(this);
    this.SetGrid = this.SetGrid.bind(this);
  };

  SetIdContact(id) {
    this.setState({id_contact: id, Resume: 'Card'}, function() {
      //console.log('id_contact: '  + this.state.id_contact);
    });

 }

 SetGrid(){
  this.setState({Resume: 'Grid', id_contact: ''}, function() {
    //console.log('id_contact: '  + this.state.id_contact);
  });
}


  View_Contacts() {
    if (this.state.Resume == 'Grid')
     {return <Additional_Contacts_Grid SetIdContact = {this.SetIdContact}/> }
    else if (this.state.Resume == 'Card')
     {return <Additional_Contact_Card SetGrid = {this.SetGrid} id_contact = {this.state.id_contact}/>} ;                
  }  

  render() {
  
    return (
      <div>
        <NavBarApp CorpName = {Settings.CorporationName}/>
        {/*
        <div className="container-fluid mt-2">
          <div className="row" style= {{display: 'flex'}}>
            <nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Дополнительные контакты {this.props.name}</a>
                </li>
                </ul>
              </nav>
              <div className="col-sm-9 col-md-10">
              <Additional_Contacts_Grid/> 
            </div>
          </div>
        </div>
        */}
        {this.View_Contacts()}
      </div>  
    )
  
   }  
}

/*
// приклеиваем данные из store
const mapStateToProps = store => {
  console.log(store); // посмотрим, что же у нас в store?
  console.log('store.name: ' + store.page.name);
  return {
    name: store.page.name,
  }
}

// в наш компонент App, с помощью connect(mapStateToProps)
export default connect(mapStateToProps)(MainPage)
*/
export default MainPage;