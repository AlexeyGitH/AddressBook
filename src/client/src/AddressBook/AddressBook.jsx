import React  from 'react';
import ReactDom from 'react-dom';


import NavBarApp from './NavBar.jsx';

import SearchBox from './SearchBox.jsx';
/*
import {Container, Row, Navbar} from 'react-bootstrap';
*/

const Settings = require('./settings/settings.json');

//console.log(Settings.CorporationName);

//import {Navbar, img} from 'react-bootstrap';

class MainPage extends React.Component  {

render() {

  return (  
  <div>
    
    <NavBarApp CorpName = {Settings.CorporationName}/>
    <SearchBox className="container-fluid"/>

  </div>
  )

 }  
}

ReactDom.render(<MainPage/>, document.getElementById('react-app'));

//      <NavBarApp CorpName = {Settings.CorporationName}/>
