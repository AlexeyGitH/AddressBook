import React from 'react';
import "isomorphic-fetch";
import {isNullValue} from '../../Js/General';

const API = document.location.protocol + "//" + document.location.host + "/additional_contacts";
const API_delete_row = document.location.protocol + "//" + document.location.host + "/delete_all_contacts";

let fetchData = {

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },            
    method: 'POST',
    body: JSON.stringify({
        id: 'all'
    })
  }

class Additional_Contacts_Grid extends React.Component {


    constructor(props) {
        super(props);
        this.state = {itemList: []};

        this.componentDidMount = this.componentDidMount.bind(this);
        this.DeleteRow = this.DeleteRow.bind(this);
        this.ViewData = this.ViewData.bind(this);
        this.ChangeContact = this.ChangeContact.bind(this);

    }

    ViewData() {
        let fetchData = {

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },            
            method: 'POST',
            body: JSON.stringify({
                offset: this.state.offset,
                limit: this.state.limit
            })
          }

        fetch(API, fetchData)
          .then(response => {if (response.ok) {return response.json();} else {this.setState({itemList: []}); throw new Error('Network response was not ok.'); }})
          .then(data => {this.setState({itemList: data}); /*console.log('data fetch: ' + data);*/})
          .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });       
    }

    componentDidMount() {
        this.ViewData();
      }

    DeleteRow(event) {

      fetchData.body = JSON.stringify({id: event});
      fetch(API_delete_row, fetchData)
      .then(response => {if (response.ok) {/*console.log('Delete OK');*/  this.ViewData();} else {console.log('Delete not OK'); 'not OK'; throw new Error('Network response was not ok.'); }})
      .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });      
    }

    ChangeContact(event) {
        
        this.props.SetIdContact(event);
    }    



    render() {

            const numbers = this.state.itemList;


            let cur_idx = 0;
            let listItems = [];

            let array_length = numbers.length;
            let row_index =1;
            while (cur_idx < array_length) {

                let RowItems_ROW_ELEMENT = [];
                let item = numbers[cur_idx];
                let img_file = '';

                RowItems_ROW_ELEMENT.push(
                    <tr key ={item.id} id= {"comtactID_" + item.id} >
                    <td scope="row">{row_index}</td>
                    <td>{isNullValue(item.last_name) + " " + isNullValue(item.first_name) + " " + isNullValue(item.middle_name)}</td>
                    <td>{item.position}</td>
                    <td>{item.department}</td>
                    <td>{item.corporation}</td>
                    <td>
                        <button type="button" className="ad_button_1" onClick={this.ChangeContact.bind(this, item.id)}>
                            <img src='/img/default/edit.svg' height="25"/>
                        </button>                        
                        <button type="button" className="ad_button_1" onClick={this.DeleteRow.bind(this, item.id)} >
                            <img src='/img/default/delete.svg' height="25"/>
                        </button>
                    </td>
                    </tr>

                    );    


                listItems.push(RowItems_ROW_ELEMENT);
                cur_idx = cur_idx + 1;
                row_index = row_index + 1;
                }
                
              return (
                <div className="p-3"> 
                    <button type="button" className="ad_button_1"  onClick={this.ChangeContact.bind(this, '')}>
                        <img src='/img/default/add.svg' height="25"/>
                        &nbsp; <span style={{textDecorationLine: 'underline'}}>Добавить контакт</span>
                    </button> 
                    {/*console.log('data_contact ::' + j_data_contact)*/}
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">ФИО</th>
                            <th scope="col">Должность</th>
                            <th scope="col">Подразделение</th>
                            <th scope="col">Организация</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listItems}            
                        </tbody>
                    </table>

                </div>

            );
          
}};

export default Additional_Contacts_Grid;


