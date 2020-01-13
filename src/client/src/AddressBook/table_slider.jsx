import React from 'react';

class table_slider extends React.Component {
    
  constructor(props) {
    super(props);
    this.TableRight = this.TableRight.bind(this);
    this.TableLeft = this.TableLeft.bind(this);
}

TableRight(event) {
  this.props.UpdateOfset(1);
}

TableLeft(event) {
  this.props.UpdateOfset(-1);
}

    render() {
        let dis_left = false;
        let dis_right = false;
        if (this.props.offset === 0) {dis_left = true};
        if (this.props.limit*(this.props.offset+1) > this.props.count) {dis_right = true};  
        
        //console.log('table_slider count ' + this.props.count + ' vvv '  + this.props.limit +' fff ' + this.props.offset + ' result ' + this.props.limit*(this.props.offset+1));
        return (
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-secondary" onClick={this.TableLeft} disabled = {dis_left}>&larr;</button>
            <button type="button" className="btn btn-secondary" onClick={this.TableRight} disabled = {dis_right}>&rarr;</button>
          </div>            
      );
   }
}

export default table_slider;

