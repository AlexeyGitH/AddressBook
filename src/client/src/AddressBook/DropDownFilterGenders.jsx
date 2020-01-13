import React from 'react';


class DropDownFilterGenders extends React.Component {

    render() {

        let listItems = [];

        listItems.push(
            <a className="dropdown-item" href="#" onClick={(e) => this.props.handleClickFilter(e, 'муж', 'gender')} key ={'male'}>{'муж'}</a>
        );

        listItems.push(
            <a className="dropdown-item" href="#" onClick={(e) => this.props.handleClickFilter(e, 'жен', 'gender')} key ={'female'}>{'жен'}</a>
        );

        return ( 
            
            <div className="dropdown-menu">
                {listItems}   
            </div>
        )    
    }
}        

export default DropDownFilterGenders;

