import React from 'react';


class DropDownFilterDepartament extends React.Component {

    constructor(props) {
        super(props);
    }    

/*    
    componentDidUpdate(prevProps, prevState, snapshot){
       //console.log('this.props' + JSON.stringify(this.props));

        //console.log('prevProps' + JSON.stringify(prevProps.fff))
        //console.log('props' + this.props.fff);

        if (prevProps.Filter_Corporation != this.props.Filter_Corporation) {console.log('true'); this.render();} else {console.log('false')}
    }
*/

    render() {
        //console.log('render drop down');
        //console.log('this.props depart ' + JSON.stringify(this.props));
        //console.log('this.state depart ' + JSON.stringify(this.state));
        const numbers = this.props.FilterData;

        let cur_idx = 0;
        let listItems = [];

        let array_length = numbers.length;

        listItems.push(
            <a className="dropdown-item" href="#"  onClick={(e) => this.props.handleClickFilter(e, '', 'search_department')} key ={'search_department'}>{'<все подразделения>'}</a>
        );

        while (cur_idx < array_length) {

           let item = numbers[cur_idx];
           listItems.push(
            <a className="dropdown-item" href="#"  onClick={(e) => this.props.handleClickFilter(e, item.department, 'search_department')} key ={'search_department' + cur_idx}>{item.department}</a>
           );
            cur_idx = cur_idx + 1;
        }

            return ( 
                <div className="dropdown-menu">
                    {/*console.log('render department')*/}
                    {listItems}   
                    {/*<a className="dropdown-item" href="#"  onClick={(e) => this.props.handleClickFilter(e, 'Кист', this.props.filter)} >Кист222</a>*/}   
                </div>
            )    
    }
}        

export default DropDownFilterDepartament;

