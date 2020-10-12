import React from 'react';
import {isNullValue,  Date_RU_DD_MMMM, Date_YYYY_MM_DD, Date_DD_MM} from '../Js/General';

class Contacts_Grid extends React.Component {

    render() {
        

        const numbers = this.props.item_list;
        //const listItems = numbers.map((number) =>
        //<div>{number.name}</div>);
        let cur_idx = 0;
        let listItems = [];

        let path_img = '';


        //list_items.append(<Row>);
        let array_length = numbers.length;
        let row_index =1;

        
        while (cur_idx < array_length) {
            let RowItems = [];
            for (var i = 0; i < 1; i++) {
                if (cur_idx < array_length){RowItems.push(numbers[cur_idx]);} else {break};
                cur_idx = cur_idx + 1;
            };

            let RowItems_ROW_ELEMENT = [];
            for (var ii = 0; ii < RowItems.length; ii++) {
                let item = RowItems[ii];
                //console.log(item)
                let img_file = '';

                //if  (item.photo === '') {if (item.gender === 'female') {img_file = 'female.png'} else {img_file = 'male.png'}} else {img_file = item.photo};
                //if  (item.photo === '') {path_img = '/public/img/default/'} else {path_img = '/public/img/'};
                //img_file = path_img + img_file;

                if  (isNullValue(item.photo) === '') {if (item.gender === 'female') {img_file = 'female.png'} else {img_file = 'male.png'}} else {img_file = item.photo};                
                //if  (isNullValue(item.photo) === '') {path_img = '/img/default/'} else {path_img = 'data:image/jpeg;base64,'};
                if  (isNullValue(item.photo) === '') {path_img = '/img/default/'} else {path_img = ''};
                img_file = path_img + img_file;

                let status_value = "Работа";
                var currentDate = new Date();
                
                if (currentDate >= new Date(Date_YYYY_MM_DD(item.status_begin)) && currentDate <= new Date(Date_YYYY_MM_DD(item.status_end)).setHours(23,59,59,999)) {status_value = item.status}

                let text_additional_phone = "";
                if (item.additional_phone) {text_additional_phone = "доб. " + item.additional_phone};

                let text_mailto = "mailto:"+ item.mail;


                RowItems_ROW_ELEMENT.push(


<div className="row mb-2" style={{border: '1px solid #d3deed'}} key ={item.id}>
    <div className="col-lg-1 px-0">
        <img src={img_file} className="img-fluid vertical-center"/>
    </div>

    <div className="col-lg-11">
      <div className="container-fluid">
        <div className="row">
            <p className="mb-1 h4">
                <strong>{item.last_name + " " +item.first_name + " " + item.middle_name}</strong>
            </p>
        </div>    
        <div className="row">
            <div className="col-lg-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 px-0">
                            Должность: 
                        </div>
                        <div className="col">
                            <span className="text_color1">{item.position}</span><br/>    
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 px-0">
                            Подразделение: 
                        </div>
                        <div className="col">
                            <span className="text_color1">{item.department}</span><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 px-0">
                            Организация: 
                        </div>
                        <div className="col">
                            <span className="text_color1">{item.corporation}</span>
                        </div>
                    </div>
                </div>
            </div> 


            <div className="col-lg-2 pr-0">
              <div className="container-fluid">
                <div className="row">
                        <div className="col-3 px-0">
                            Статус: 
                        </div>
                        <div className="col">
                            <span className="text_color1">{status_value}</span><br/>   
                        </div>
                    </div>              
                </div>
             </div>   

            <div className="col-lg-5 pr-0">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 px-0">
                             Рабочий тел.: 
                        </div>
                        <div className="col">
                             <span className="text_color1">{item.work_phone} {text_additional_phone}</span><br/>   
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 px-0">
                             Мобильный тел.: 
                        </div>
                        <div className="col">
                            <span className="text_color1">{item.mobile_phone}</span><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 px-0">
                             Дата рождения: 
                        </div>
                        <div className="col">
                             <span className="text_color1">{ Date_RU_DD_MMMM(Date_DD_MM(item.birth_date))}</span><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3 px-0">
                            Почта: 
                        </div>
                        <div className="col">
                            <a href={text_mailto} className="text_color1">{item.mail}</a>
                        </div>
                    </div>                    
                </div>
                
            </div> 


        </div>    

      </div>     

    </div>

</div>                          


                );    
            };
            /*
            listItems.push(<Row className="show-grid" key={'row_' + row_index}> {RowItems_ROW_ELEMENT.map((el_item) =>
                el_item)}</Row>
            );
            */

           /* 
           listItems.push(<div className="row" key = {'row_' + row_index}>{RowItems_ROW_ELEMENT.map((el_item) =>
            el_item)}</div> ); 
            */

           listItems.push(RowItems_ROW_ELEMENT.map((el_item) =>
            el_item)); 

            row_index = row_index + 1;
          }
        
      return (
        <div className="container-fluid">
            {listItems}            
        </div>  
    );
    }
}
export default Contacts_Grid;

