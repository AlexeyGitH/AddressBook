import React from 'react';
//import {Container, Form, Button, Col, Row} from 'react-bootstrap';
import GridBook from './Contacts_Grid.jsx';
import TableSlider from './table_slider.jsx';
import DropDownFilterDepartament from './DropDownFilterDepartament.jsx';
import DropDownFilterCorporation from './DropDownFilterCorporation.jsx';
import DropDownFilterPhone from './DropDownFilterPhone.jsx';
import "isomorphic-fetch";

const Settings = require('./settings/settings.json');
/*
const itemlist = [{first_name:'Иван', middle_name:'Иваныч', last_name:'Иванов', birth_date:'1 января', department:'АУП', corparation:'Организация', phone1:'11-11', phone2:'(921) 111-11-11', mail:'fff@ifm.ru', photo:'kh.png', id_man:'1', gender:'male'}
                   , {first_name:'Петр', middle_name:'Иванович', last_name:'Петров', birth_date:'01011976', department:'АУП', corparation:'Организация1', phone1:'11-12', phone2:'(921) 222-22-22', mail:'ppp@ifm.ru', photo:'', id_man:'2', gender:'male'}
                   , {first_name:'Петр', middle_name:'Иванович', last_name:'Петров', birth_date:'01011976', department:'Т2', corparation:'Организация1', phone1:'11-12', phone2:'(921) 22-22', mail:'ppp@ifm.ru', photo:'', id_man:'3', gender:'male'}
                   , {first_name:'Петр', middle_name:'Иванович', last_name:'Петров', birth_date:'01011976', department:'Т2', corparation:'Организация1', phone1:'11-12', phone2:'(921) 22-22', mail:'ppp@ifm.ru', photo:'', id_man:'4', gender:'female'}
                 ];
*/
//const New_itemlistF = [{first_name:'sdfsdfdsfs', middle_name:'FDS', last_name:'324gvанов', birth_date:'1 января', department:'АУП', corparation:'Организация', phone1:'11-11', phone2:'(921) 11-11', mail:'fff@ifm.ru', photo:'hghhhgkkj', id_man:'1'}
  //              ];   
 
//const itemlist = require('./data/data.json');
//const itemlist = '%PUBLIC_URL%/data/data.json'

//console.log(document.location.protocol + "//" + document.location.host + "/api");
const API = document.location.protocol + "//" + document.location.host + "/api";
const APIDropDown = document.location.protocol + "//" + document.location.host + "/search_filter";
//const API = "http://localhost:3000/api";

const c_offset = 0;
const c_limit = Settings.RowCountGrid;
const c_count = 0;

let fetchData = {

  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },            
  method: 'POST',
  body: JSON.stringify({
      offset: 0,
      limit: 0
  })
}

let fetchDataFilter = {
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },            
  method: 'POST',
  body: JSON.stringify({
      filter: ''
  })
}


class SearchBox extends React.Component {
    
    //onButClick = () => {alert('Click Button!!')}

    constructor(props) {
        super(props);
        this.state = {itemList: [], valueName:'', valueDepartment:'', valueCorporation:'', offset: c_offset, limit: c_limit, count: c_count,
        itemListDropDownDepartament: [], itemListDropDownCorporation: [], valueTypePhone:'все', valuePhone:''};

    
        this.BeginSearch = this.BeginSearch.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCorporation = this.handleChangeCorporation.bind(this);       
        this.handleChangeDepartment = this.handleChangeDepartment.bind(this);       
        this.handleChangeTypePhone = this.handleChangeTypePhone.bind(this);       
        this.handleChangePhone = this.handleChangePhone.bind(this);       

        this.componentDidMount = this.componentDidMount.bind(this);

        this.UpdateOfset = this.UpdateOfset.bind(this);
        this.Filter_Data = this.Filter_Data.bind(this);

        this.handleClickFilter = this.handleClickFilter.bind(this);
        this.handleClickFilter_Type_Phone = this.handleClickFilter_Type_Phone.bind(this);

        //console.log('offset 1-- ' + this.state.offset);
    }

    componentDidMount() {
      /*
      //console.log('fetczhhhhhh');  

        fetchData.body = JSON.stringify({offset: this.state.offset*c_limit, limit: this.state.limit});
        //console.log('fetchData: ' + JSON.stringify(fetchData.body))
        
        
        fetch(API, fetchData)
          .then(response => {if (response.ok) {return response.json();} else {this.setState({itemList: []}); throw new Error('Network response was not ok.'); }})
          .then(data => {this.setState({itemList: data.data, count: data.count})})
          .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });
          
   //this.setState({itemList: itemlist})


        fetchDataFilter.body = JSON.stringify({filter: 'search_department'});    
        fetch(APIDropDown, fetchDataFilter)
        .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownDepartament: []}); throw new Error('Network response was not ok.'); }})
        .then(data => {this.setState({itemListDropDownDepartament: data})})
        .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });

        fetchDataFilter.body = JSON.stringify({filter: 'search_corporation'});    
        fetch(APIDropDown, fetchDataFilter)
        .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownCorporation: []}); throw new Error('Network response was not ok.'); }})
        .then(data => {this.setState({itemListDropDownCorporation: data})})
        .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });
*/



      fetchData.body = JSON.stringify({offset: this.state.offset*c_limit, limit: this.state.limit});
      
      fetch(API, fetchData)
        .then(response => {if (response.ok) {return response.json();} else {this.setState({itemList: []}); throw new Error('Network response was not ok.'); }})
        .then(data => {
            fetchDataFilter.body = JSON.stringify({filter: 'search_corporation', v_filter: ''});       
            fetch(APIDropDown, fetchDataFilter)
            .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownDepartament: []}); throw new Error('Network response was not ok.'); }})
            .then(data_2 => {
                fetchDataFilter.body = JSON.stringify({filter: 'search_department', v_filter: ''});       
                fetch(APIDropDown, fetchDataFilter)
                .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownCorporation: []}); throw new Error('Network response was not ok.'); }})
                .then(data_3 => {
                  //console.log("data_2: " +data_2);
                  //console.log('change state corp initial' + JSON.stringify(data_2));
                  this.setState({itemList:  data.data, count: data.count, itemListDropDownDepartament: data_2, itemListDropDownCorporation: data_3})
                });
            })
          })    
      .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });

 }


      


      handleChangeName(event) {
        this.setState({valueName: event.target.value});
      }

      handleChangePhone(event) {
        this.setState({valuePhone: event.target.value});
      }      

      handleChangeTypePhone(event) {
        this.setState({valueTypePhone: event.target.value});
      }      


      handleChangeCorporation(event) {
        //console.log('ChangeCorporation: ');
        //console.log('event.target.value: ' + event.target.value);
        this.setState({valueCorporation: event.target.value});

        fetchDataFilter.body = JSON.stringify({filter: 'search_corporation', v_filter: event.target.value});    
        fetch(APIDropDown, fetchDataFilter)
        .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownDepartament: []}); throw new Error('Network response was not ok.'); }})
        .then(data => {this.setState({itemListDropDownDepartament: data}); /*console.log('data fetch: ' + data);*/})
        .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });

      }

      handleChangeDepartment(event) {
        this.setState({valueDepartment: event.target.value});

        //console.log("change depart");

        fetchDataFilter.body = JSON.stringify({filter: 'search_department', v_filter: event.target.value});    
        fetch(APIDropDown, fetchDataFilter)
        .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownCorporation: []}); throw new Error('Network response was not ok.'); }})
        .then(data => {this.setState({itemListDropDownCorporation: data}); /*console.log('data fetch: ' + data);*/})
        .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });

      }

   
      UpdateOfset(value) {
        //console.log('offset 2-- ' + this.state);
        //console.log("c_count:" + c_count);

        value = value + this.state.offset;
        if  (value * c_limit > this.state.count) 
          {value = value - 1}

        if (value < 0) 
          {value = 0}
  
        this.Filter_Data(value);
     }

      BeginSearch(event) {
       //alert(this.state.valueName + ' ' + this.state.valueMail);
        // //this.setState({itemList: []});
        //console.log('event: ' + event.target);
        //console.log('value: ' + value);
        //console.log('event: ' + event.target.id);
        event.preventDefault();
        this.Filter_Data(0);
       
      }
      
      
      Filter_Data(value) {

         let filter_elm = {filterFIO: '', filterDepartment:'', filterCorporation:'', filterTypePhone:'', filterPhone:'' };

         if (this.state.valueName !== '') {
            filter_elm.filterFIO = this.state.valueName;
         };

         if (this.state.valueDepartment !== '') {
          filter_elm.filterDepartment = this.state.valueDepartment;
         };

         if (this.state.valueCorporation !== '') {
          filter_elm.filterCorporation = this.state.valueCorporation;
         };

         if (this.state.valueTypePhone !== '') {
          if (this.state.valueTypePhone === 'доб.') 
            {filter_elm.filterTypePhone = "phone_additional"}
          else if (this.state.valueTypePhone === 'раб.')   
            {filter_elm.filterTypePhone = "phone_work"}
          else if (this.state.valueTypePhone === 'моб.')   
            {filter_elm.filterTypePhone = "phone_mobile"}
          else 
            {filter_elm.filterTypePhone = "all"}
         };

         if (this.state.valuePhone !== '') {
          filter_elm.filterPhone = this.state.valuePhone;
         };


         fetchData.body = JSON.stringify({offset: value * c_limit, limit: this.state.limit, filter: filter_elm});

         fetch(API, fetchData)
         .then(response => {if (response.ok) {return response.json();} else {this.setState({itemList: [], offset: value}); throw new Error('Network response was not ok.'); }})
         .then(data => {this.setState({itemList: data.data, count: data.count, offset: value});   /*console.log("data:" + JSON.stringify(data));*/})
         .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });
      }

      handleClickFilter(e, value, filter) {
        console.log('handleClickFilter');
        
        fetchDataFilter.body = JSON.stringify({filter: filter, v_filter: value});    

        if (filter  === 'search_department')
        {
          //console.log('search_department');
          //console.log('fetchDataFilter' + fetchDataFilter);

          this.setState({valueDepartment: value});

          document.getElementById('f_Department').value = value;

          fetch(APIDropDown, fetchDataFilter)
          .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownCorporation: []}); throw new Error('Network response was not ok.'); }})
          .then(data => {this.setState({itemListDropDownCorporation: data}); /*console.log('data fetch: ' + data);*/})
          .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });

        }
        if (filter  === 'search_corporation')
        {
          //console.log('search_corporation');
          
          this.setState({valueCorporation: value});
          document.getElementById('f_Corporation').value = value;

          fetch(APIDropDown, fetchDataFilter)
          .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownDepartament: []}); throw new Error('Network response was not ok.'); }})
          .then(data => {this.setState({itemListDropDownDepartament: data}); /*console.log('data fetch: ' + data);*/})
          .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });
        }
      }  

      handleClickFilter_Type_Phone(e, value) {
        
          this.setState({valueTypePhone: value});

          document.getElementById('input_type_phone').value = value;
      }  



    render() {
        return (
          <div className="container-fluid mr-4">
            {/*console.log('render search')/*console.log('render search ' + JSON.stringify(this.state))*/}
            
            
            {/*<div className="container"> */} 
            <div className="container-fluid">
              <form style= {{marginTop: 10 + 'px'}}>

              {/*<div className="form-row align-self-end">*/}
              <div className="row" >
                  <div className="form-group col-md-3">
                    <label htmlFor={this.state.valueName}>ФИО</label>
                    <input type="text" className="form-control" value={this.state.valueName} onChange={this.handleChangeName} placeholder=""/>
                  </div>

                  <div className="form-group col-md-3">
                    <label htmlFor={this.state.valueCorporation}>Организация</label>
                    <div className="btn-group d-flex">                    
                      <div className="dropdown">                    
                        <DropDownFilterCorporation handleClickFilter={this.handleClickFilter} FilterData = {this.state.itemListDropDownCorporation}/>
                        <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                          <span className="sr-only">Toggle Dropdown</span>
                        </button>
                      </div>                    
                      {/*<input id ="f_Corporation" type="text" className="form-control" value={this.state.valueCorporation} onChange={this.handleChangeCorporation}  placeholder=""/>*/}
                      <input id ="f_Corporation" type="text" className="form-control" onBlur={this.handleChangeCorporation}  placeholder=""/>
                    </div>
                  </div>  
                   
                  <div className="form-group col-md-3">
                    <label htmlFor={this.state.valueDepartment}>Подразделение</label>
                    <div className="btn-group d-flex">                    
                      <div className="dropdown">                    
                        <DropDownFilterDepartament handleClickFilter={this.handleClickFilter} FilterData = {this.state.itemListDropDownDepartament}/>
                        <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="sr-only">Toggle Dropdown</span>
                        </button>
                      </div>  
                      {/*<input id ="f_Department" type="text" className="form-control" value={this.state.valueDepartment} onChange={this.handleChangeDepartment} placeholder=""/>*/}
                      <input id ="f_Department" type="text" className="form-control" onBlur={this.handleChangeDepartment} placeholder=""/>
                    </div>                   
                  </div>

                  <div className="form-group col-md-2">
                      <label>Телефон:</label>
                      <div className="input-group d-flex">                    
                          <div className="dropdown">                    
                              <DropDownFilterPhone handleClickFilter_Type_Phone={this.handleClickFilter_Type_Phone} />
                              <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span className="sr-only">Toggle Dropdown</span>
                              </button>
                          </div>  
                          
                          <div className="input-group-prepend" id="input_type_phone"><span className="input-group-text"> {this.state.valueTypePhone} </span></div>
                          <input type="text" className="form-control" id="input_phone" value={this.state.valuePhone} onChange={this.handleChangePhone} placeholder=""/>
                      </div>
                      

                  </div>


                  <div className="form-group align-self-end col-md">
                    <button  id = {'SearchButton'} type="submit" className="btn btn-primary"  onClick={this.BeginSearch}  style= {{marginLeft: 5 + 'px'}}  >Найти</button>
                  </div>  

                </div>
              </form>
            </div>

            {/*console.log('this.state.itemList: ' + JSON.stringify(this.state.itemList))*/}
            <GridBook item_list = {this.state.itemList} />
            
            <TableSlider UpdateOfset={this.UpdateOfset} offset={this.state.offset} count={this.state.count} limit={c_limit}/>

          </div>                    
                
            );
        }
}

export default SearchBox;

