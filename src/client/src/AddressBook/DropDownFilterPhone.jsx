import React from 'react';


class DropDownFilterPhone extends React.Component {

    render() {

        let listItems = [];

        listItems.push(
            <a className="dropdown-item" href="#" onClick={(e) => this.props.handleClickFilter_Type_Phone(e, 'все')} key ={'type_phone'}>{'все'}</a>
        );

        listItems.push(
            <a className="dropdown-item" href="#" onClick={(e) => this.props.handleClickFilter_Type_Phone(e, 'доб.')} key ={'type_phone_additional'}>{'добавочный'}</a>
        );

        listItems.push(
            <a className="dropdown-item" href="#" onClick={(e) => this.props.handleClickFilter_Type_Phone(e, 'раб.')} key ={'type_phone_work'}>{'рабочий'}</a>
        );

        listItems.push(
            <a className="dropdown-item" href="#" onClick={(e) => this.props.handleClickFilter_Type_Phone(e, 'моб.')} key ={'type_phone_mobile'}>{'мобильный'}</a>
        );


        return ( 
            
            <div className="dropdown-menu">
                {listItems}   
            </div>
        )    
    }
}        

export default DropDownFilterPhone;

