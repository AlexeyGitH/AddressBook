import React from 'react';


class DropDownFilterCorporation extends React.Component {

    constructor(props) {
        super(props);
    }    

    /*
    componentDidUpdate(prevProps, prevState, snapshot){
       // console.log('drop down UPDATE' + this.props.fff);

        //console.log('prevProps' + JSON.stringify(prevProps.fff))
        //console.log('props' + this.props.fff);

        if (prevProps.Filter_Department != this.props.Filter_Department) {console.log('true'); this.render();} else {console.log('false')}
    }
*/

    render() {
        //console.log('render drop down');
       // console.log('this.props corp ' + JSON.stringify(this.props));
       // console.log('this.state corp ' + JSON.stringify(this.state));

        const numbers = this.props.FilterData;

        let cur_idx = 0;
        let listItems = [];

        let array_length = numbers.length;

        listItems.push(
            <a className="dropdown-item" href="#"  onClick={(e) => this.props.handleClickFilter(e, '', 'search_corporation')} key ={'search_corporation'}>{'<все организации>'}</a>
        );

        while (cur_idx < array_length) {

           let item = numbers[cur_idx];
           {/*console.log('item.corporation ' + item.corporation)*/}
           listItems.push(
            <a className="dropdown-item" href="#"  onClick={(e) => this.props.handleClickFilter(e, item.corporation, 'search_corporation')} key ={'search_corporation' + cur_idx}>{item.corporation}</a>
           );
            cur_idx = cur_idx + 1;
        }

            return ( 
                
                <div className="dropdown-menu">
                    {/*console.log('render corporation')*/}
                    {/*console.log('listItems ' + listItems)*/} 
                    {listItems}   
                    {/*<a className="dropdown-item" href="#"  onClick={(e) => this.props.handleClickFilter(e, 'Кист', this.props.filter)} >Кист222</a>*/}   
                </div>
            )    
    }
}        

export default DropDownFilterCorporation;

