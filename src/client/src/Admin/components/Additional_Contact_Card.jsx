import React from 'react';
import "isomorphic-fetch";
import { connect } from 'react-redux';
import { getContact, change_last_name
    , change_first_name, change_middle_name, change_gender, change_birth_date
    , change_id, change_corporation, change_department, change_position, change_work_phone
    , change_mobile_phone, change_additional_phone, change_mail, change_status
    , change_status_begin, change_status_end
} from '../actions/PageActions';

import DatePicker from "react-datepicker";
import DropDownFilterDepartament from '../../AddressBook/DropDownFilterDepartament.jsx';
import DropDownFilterCorporation from '../../AddressBook/DropDownFilterCorporation.jsx';
import DropDownFilterGenders from '../../AddressBook/DropDownFilterGenders.jsx';

import moment from 'moment';

const API_change = document.location.protocol + "//" + document.location.host + "/Post_Additional_Contacts";
const API_data = document.location.protocol + "//" + document.location.host + "/contact_data";
const APIDropDown = document.location.protocol + "//" + document.location.host + "/search_filter";


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
  


function  isNullValue(Value) {
    let result = '';
    if (typeof(Value) !== "undefined") {
        if (Value === '' || Value === null) {result = ''}  else {result = Value} ;                
    };
    //console.log("res", result=='');
    return result;
}  

class Additional_Contacts_Grid extends React.Component {


    constructor(props) {
        super(props);
        this.state = {itemList: [], itemListDropDownDepartament: [], itemListDropDownCorporation: [],
        image: '', img_default: true 
        };

        this.componentDidMount = this.componentDidMount.bind(this);

        this.ViewContactData = this.ViewContactData.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.handleChangeDate1 = this.handleChangeDate1.bind(this);
        this.handleChangeDate2 = this.handleChangeDate2.bind(this);

        this.handleChangeImage = this.handleChangeImage.bind(this);


        this.handleClickFilter = this.handleClickFilter.bind(this);

        //this.CloseContact = this.CloseContact.bind(this);
        //this.handleChangeDateBirth = this.handleChangeDateBirth.bind(this);



    }

    componentDidMount() {

        this.ViewContactData(this.props.id_contact);
    }

    ViewContactData(contact_id){

        //console.log('contact_id', contact_id);

        let fetchData = {

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },            
            method: 'POST',
            body: JSON.stringify({
                id: contact_id,
            })
          }

        fetch(API_data, fetchData)
          .then(response => {if (response.ok) {return response.json();} else {throw new Error('Network response was not ok.'); }})
          .then(data => {
            fetchDataFilter.body = JSON.stringify({filter: 'search_corporation', v_filter: ''});       
            fetch(APIDropDown, fetchDataFilter)
            .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownDepartament: []}); throw new Error('Network response was not ok.'); }})
            .then(data_2 => {
                fetchDataFilter.body = JSON.stringify({filter: 'search_department', v_filter: ''});       
                fetch(APIDropDown, fetchDataFilter)
                .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownCorporation: []}); throw new Error('Network response was not ok.'); }})
                .then(data_3 => {

                    let self = this;
                    let reader = new FileReader();
                    let img_path = '/img/default/NoPhoto.png';

                    if ( isNullValue(data.photo) != '') {
                        if (!data.photo.includes('male.png')) {img_path = data.photo; self.setState({img_default: false})};
                    };
            
                    fetch(img_path)
                    .then(r => {return r.blob()})
                    .then(data => {
            
                            reader.onload = function(upload) {
                                self.setState({image: upload.target.result}, function() {
                                    //   console.log(self.state.image);
                                    //  console.log("Uploaded");
                                    });
                            };
                            reader.readAsDataURL(data);
                    })
                    .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });
            

                  //console.log("data_2: " + JSON.stringify(data));
                  //console.log('change state corp initial' + JSON.stringify(data_2));
                  this.props.selectContact_action(data);
                  this.setState({itemListDropDownDepartament: data_2, itemListDropDownCorporation: data_3});
                 //this.state = {itemListDropDownDepartament: data_2, itemListDropDownCorporation: data_3};
                
                });
            })
          })    
          .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });  
    }    


    handleChange(event){
        //his.setState({last_name: event.target.value});
        //this.props.ch_last_name(event.target.value);
    }

    handleChangeDate1(date){
        this.setState({
            status_begin: date
        });
      };

    handleChangeDate2(date){
    this.setState({
        status_end: date
    });
    };
/*
    handleChangeDateBirth(date){
        $('#input_birth_date').selected = date;
    };
*/

    ChangeContact(event) {
        //console.log('id event: ' + JSON.stringify(event));
        
        let fetchData = {

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },            
            method: 'POST',
            body: JSON.stringify({
                id: event,
            })
          }

        fetch(API_data, fetchData)
          .then(response => {if (response.ok) {return response.json();} else {throw new Error('Network response was not ok.'); }})
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
                  this.props.selectContact_action(data);
                  this.setState({itemListDropDownDepartament: data_2, itemListDropDownCorporation: data_3})
                });
            })
          })    

          .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });  
       
    }

    PostContact(img, img_default) {
        //console.log('Post contact... ');
        
        //console.log('image: ', event);

        let Nodes_contact_input = $(".form-group input");
        Nodes_contact_input.each(function(index, element) {
            let el = String(element.id.replace("input_", ""));
            let val = element.value;

            if (el === "photo" &  ! img_default) { val = img};

            let v_js = JSON.parse(fetchData.body);
            v_js[el] = val;


            fetchData.body = JSON.stringify(v_js);
            //console.log('this: ' + index +'  '+element.id);

        });
        //console.log('JSON body: ' +  fetchData.body);


        fetch(API_change, fetchData)
        .then(response => {if (response.ok) {/*console.log('Change OK');  this.ViewData();*/ this.props.SetGrid();} else {console.log('Change not OK'); 'not OK'; throw new Error('Network response was not ok.'); }})
        .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });      
    }
    
    handleClickFilter(e, value, filter) {
        
        fetchDataFilter.body = JSON.stringify({filter: filter, v_filter: value});    

        //console.log('filter ', filter);


        if (filter  === 'search_department')
        {
          //console.log('search_department');
          //console.log('fetchDataFilter' + fetchDataFilter);

          //this.setState({valueDepartment: value});

          //document.getElementById('f_Department').value = value;
          this.props.ch_department(value);

          fetch(APIDropDown, fetchDataFilter)
          .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownCorporation: []}); throw new Error('Network response was not ok.'); }})
          .then(data => {this.setState({itemListDropDownCorporation: data}); /*console.log('data fetch: ' + data);*/})
          .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });

        }
        if (filter  === 'search_corporation')
        {
          //console.log('search_corporation');
          
          //this.setState({valueCorporation: value});
          //document.getElementById('f_Corporation').value = value;
          this.props.ch_corporation(value);

          //console.log('search_corporation' + value);

          fetch(APIDropDown, fetchDataFilter)
          .then(response => {if (response.ok) {return response.json();} else {this.setState({itemListDropDownDepartament: []}); throw new Error('Network response was not ok.'); }})
          .then(data => {this.setState({itemListDropDownDepartament: data}); /*console.log('data fetch: ' + data);*/})
          .catch(function(error) {console.log('There has been a problem with your fetch operation: ' + error.message); });
        }

        if (filter  === 'gender')
        {
          //console.log('search_gender', + value);
          this.props.ch_gender(value);
        }
        e.preventDefault();
    }  

    handleChangeImage(evt) {
        //console.log("Uploading");
        let self = this;
        var reader = new FileReader();
        var file = evt.target.files[0];
    
        reader.onload = function(upload) {
            self.setState({image: upload.target.result, img_default: false});
        };
        reader.readAsDataURL(file);
    }   
    
    
    CloseContact(evt) {
        evt.props.SetGrid();
    }

    render() {
            const {last_name, first_name, middle_name, birth_date, gender, id, corporation,
                   department, position, work_phone, mobile_phone, additional_phone, mail, status,
                   status_begin, status_end} = this.props.j_data_contact;
            
            //let j_data_contact_z = this.props.j_data_contact;

            const numbers = this.state.itemList;

            //console.log('j_data_contact props '+ JSON.stringify(this.props));
           // console.log('birth_date 2 '+ birth_date);


            return (
                <div className="row justify-content-center align-items-center" style={{marginTop: 3 + '%', marginBottom: 3 + '%'}}>
                    <div className="card bg-light" style={{width: 66 + 'rem'}}>
                        <div className="card-header">
                            <h6 className="text_color1">Личные данные</h6>
                        </div>
                        <div className="card-body">  
                            <form>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="input_photo" className="col-form-label">Фото:</label>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="input_photo" onChange={this.handleChangeImage}></input>
                                                    <label className="custom-file-label" htmlFor="customFile" data-browse="Обзор">Выбрать файл</label>
                                                </div>                                                        
                                            </div>
                                            <img src={this.state.image} className="img-fluid vertical-center" id="photo_base64"/>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label htmlFor="input_last_name" className="col-form-label">Фамилия:</label>
                                                <input type="text" className="form-control" id="input_last_name" value={last_name} onChange={this.props.ch_last_name}></input>
                                                {/*console.log('ffff 1 ' + JSON.stringify(j_data_contact) + ' json ' + last_name)*/}
                                                
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="input_first_name" className="col-form-label">Имя:</label>
                                                <input type="text" className="form-control" id="input_first_name" value={first_name} onChange={this.props.ch_first_name}></input>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="input_middle_name" className="col-form-label">Отчество:</label>
                                                <input type="text" className="form-control" id="input_middle_name" value={middle_name} onChange={this.props.ch_middle_name}></input>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label htmlFor="input_gender" className="col-form-label">Пол:</label>
                                                        <div className="btn-group d-flex">                    
                                                            <div className="dropdown">                    
                                                                <DropDownFilterGenders handleClickFilter={this.handleClickFilter} />
                                                                <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <span className="sr-only">Toggle Dropdown</span>
                                                                </button>
                                                            </div>  
                                                            <input type="text" className="form-control" id="input_gender" value={gender} onChange={this.props.ch_gender}></input>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
                                                    <div className="form-group">
                                                        <label htmlFor="input_birthday" className="col-form-label">День рождения:</label>
                                                        {/*console.log('birth_date 111111 ' +  new Date(moment(birth_date, 'DD/MM/YYYY').format('YYYY-MM-DD')))*/}
                                                        {/*console.log('birth_date момент ' + moment(birth_date, 'DD/MM/YYYY').isValid())*/}

                                                        {
                                                        <DatePicker id="input_birth_date" className="form-control"  
                                                            selected={moment(birth_date, 'DD/MM/YYYY').isValid() ? new Date(moment(birth_date, 'DD/MM/YYYY').format('YYYY-MM-DD')) : ""}
                                                            onChange={this.props.ch_birth_date}
                                                            dateFormat="dd/MM/yyyy"
                                                        />
                                                        }
                                                    </div>
                                                </div>

                                            </div>   

                                        </div>                                        
                                    </div>

                                    <div className="row d-none">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="input_id" className="col-form-label">ID:</label>
                                                <input type="text" className="form-control" id="input_id" value={id} onChange={this.props.ch_id}></input>
                                                {/*console.log('id log ' + j_data_contact.id)*/}
                                            </div>
                                        </div>
                                    </div>

                                </div>  
                            </form>
                        </div> 

                        <div className="card-header">
                            <h6 className="text_color1">Место работы</h6>
                        </div>

                        <div className="card-body">  
                            <form>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="input_corporation" className="col-form-label">Организация:</label>
                                                <div className="btn-group d-flex">                    
                                                    <div className="dropdown">                    
                                                        <DropDownFilterCorporation handleClickFilter={this.handleClickFilter} FilterData = {this.state.itemListDropDownCorporation}/>
                                                        <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">  
                                                            <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                    </div>                    
                                                    <input type="text" className="form-control" id="input_corporation" value={corporation} onChange={this.props.ch_corporation} onBlur={this.handleChangeCorporation}></input>    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="input_department" className="col-form-label">Подразделение:</label>

                                                <div className="btn-group d-flex">                    
                                                    <div className="dropdown">                    
                                                        <DropDownFilterDepartament handleClickFilter={this.handleClickFilter} FilterData = {this.state.itemListDropDownDepartament}/>
                                                        <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <span className="sr-only">Toggle Dropdown</span>
                                                        </button>
                                                    </div>  
                                                    <input type="text" className="form-control" id="input_department" onBlur={this.handleChangeDepartment} value={department} onChange={this.props.ch_department}></input>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="input_position" className="col-form-label">Должность:</label>
                                                <input type="text" className="form-control" id="input_position" value={position} onChange={this.props.ch_position}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>            


                        <div className="card-header">
                            <h6 className="text_color1">Контактная информация</h6>
                        </div>

                        <div className="card-body">  
                            <form>
                                <div className="form-group">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input_phone1" className="col-form-label">Рабочий телефон:</label>
                                                <input type="text" className="form-control" id="input_work_phone" value={work_phone} onChange={this.props.ch_work_phone}></input>

                                                <label htmlFor="input_phone3" className="col-form-label">Добавочный телефон:</label>
                                                <input type="text" className="form-control w-50" id="input_additional_phone" value={additional_phone} onChange={this.props.ch_additional_phone}></input>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="input_phone2" className="col-form-label">Мобильный телефон:</label>
                                                <input type="text" className="form-control" id="input_mobile_phone" value={mobile_phone} onChange={this.props.ch_mobile_phone}></input>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="input_mail" className="col-form-label">Почта:</label>
                                                <input type="text" className="form-control" id="input_mail" value={mail} onChange={this.props.ch_mail}></input>
                                            </div>
                                        </div>
                                    </div>

                                </div>  
                            </form>
                        </div>

                        <div className="card-header">
                            <h6 className="text_color1">Текущий статус</h6>
                        </div>

                        <div className="card-body">  
                            <form>
                                <div className="form-group">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input_status" className="col-form-label">Статус:</label>
                                                <input type="text" className="form-control" id="input_status" value={status} onChange={this.props.ch_status}></input>
                                            </div>
                                        </div>
 
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="input_status_begin" className="col-form-label">Дата начала:</label>
                                                <DatePicker id="input_status_begin" className="form-control"  
                                                    selected={moment(status_begin, 'DD/MM/YYYY').isValid() ? new Date(moment(status_begin, 'DD/MM/YYYY').format('YYYY-MM-DD')) : ""}
                                                    onChange={this.props.ch_status_begin}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>
                                        </div>                                        
                                        
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="input_status_end" className="col-form-label">Дата завершения:</label>
                                                <DatePicker id="input_status_end" className="form-control"  
                                                    selected={moment(status_end, 'DD/MM/YYYY').isValid() ? new Date(moment(status_end, 'DD/MM/YYYY').format('YYYY-MM-DD')) : ""}
                                                    onChange={this.props.ch_status_end}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                </div>  
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.CloseContact.bind(this, this)}>Закрыть</button>
                            <button type="button" className="btn btn-primary" onClick={this.PostContact.bind(this, this.state.image, this.state.img_default)}>Сохранить</button>
                        </div>

                    </div>    
                </div>

            );    
          
}};

//export default Additional_Contacts_Grid;


// приклеиваем данные из store
const mapStateToProps = store => {
  //console.log('store ' + JSON.stringify(store.page)); 
  //console.log('store.name: ' + store.page.j_data_contact.last_name);
  return {
    j_data_contact: store.page
  }
}

const mapDispatchToProps = dispatch => {
    return {
    selectContact_action: data_contact => dispatch(getContact(data_contact)),
    ch_last_name: data_contact => dispatch(change_last_name(data_contact)),
    ch_first_name: data_contact => dispatch(change_first_name(data_contact)),
    ch_middle_name: data_contact => dispatch(change_middle_name(data_contact)),
    ch_birth_date: data_contact => dispatch(change_birth_date(data_contact)),
    ch_gender: data_contact => dispatch(change_gender(data_contact)),

    
    ch_id: data_contact => dispatch(change_id(data_contact)),
    ch_corporation: data_contact => dispatch(change_corporation(data_contact)),
    ch_department: data_contact => dispatch(change_department(data_contact)),
    ch_position: data_contact => dispatch(change_position(data_contact)),
    ch_work_phone: data_contact => dispatch(change_work_phone(data_contact)),
    ch_mobile_phone: data_contact => dispatch(change_mobile_phone(data_contact)),
    ch_additional_phone: data_contact => dispatch(change_additional_phone(data_contact)),
    ch_mail: data_contact => dispatch(change_mail(data_contact)),
    ch_status: data_contact => dispatch(change_status(data_contact)),
    ch_status_begin: data_contact => dispatch(change_status_begin(data_contact)),
    ch_status_end: data_contact => dispatch(change_status_end(data_contact))
    
    }
}

// в наш компонент App, с помощью connect(mapStateToProps)
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Additional_Contacts_Grid)
