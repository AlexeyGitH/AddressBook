import React from 'react'
import "isomorphic-fetch";
import MainPage from './DashboardsMain.jsx';


const API = document.location.protocol + "//" + document.location.host + "/dashboards_admin";
const API_adm = document.location.protocol + "//" + document.location.host + "/admin.html";

class DashBoards_Admin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {DataUser: null, isFetching: true, hasError: false};
}

componentDidMount() {
    //console.log('2-1');
    fetch(API)
        .then(response => {if (response.url.includes('dashboards_admin')) {return response.json()} else {throw new Error("No JSON")}}) 
        .then(dataU => {/*console.log(dataU);*/ this.setState({DataUser: dataU, isFetching: false });})
        .catch(e => {
          console.log('There has been a problem with your fetch operation: ', e.message);
          this.setState({hasError: true});
        });
}

render() {
  //return <MainPage/>;


    const {DataUser, isFetching, hasError} = this.state;

    if (hasError) {
      //console.log('login no');
      // Вы можете отрисовать любой резервный UI
      document.location.href = API_adm;
    }      
   

    if (isFetching) {return <div>...Loading</div>;}

    if (DataUser === null) {document.location.href = API_adm}
    else {return <MainPage/>};
    
  }
}

export default DashBoards_Admin
