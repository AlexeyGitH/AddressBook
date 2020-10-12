import React, { Suspense }   from 'react';
//import React from 'react';

const NavBarAppComponent = React.lazy(() => import('../../AddressBook/NavBar.jsx'));
//const Additional_Contacts_Grid = React.lazy(() => import('./Additional_Contacts_Grid.jsx'));
//const Additional_Contact_Card = React.lazy(() => import('./Additional_Contact_Card.jsx'));

//import NavBarAppComponent from '../../AddressBook/NavBar.jsx';
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
    //console.log('Resume: '  + this.state.Resume);
    if (this.state.Resume == 'Grid')
     {return (
        <Additional_Contacts_Grid SetIdContact = {this.SetIdContact}/>
      )}                 
    else if (this.state.Resume == 'Card')
     {return (
        <Additional_Contact_Card SetGrid = {this.SetGrid} id_contact = {this.state.id_contact}/>
     )}                 
  }  

  render() {
  
    return (
      <div>
        <Suspense fallback={<div>Загрузка...</div>}>
          <section>
            <NavBarAppComponent CorpName = {Settings.CorporationName}/>
            {this.View_Contacts()}
          </section>
        </Suspense>        
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