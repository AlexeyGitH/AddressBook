import React from 'react';

class NavBarApp extends React.Component {
    render() {
        return ( 
            //console.log('CorpName', this.props.CorpName);
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <img src="\img\default\logo.svg" width="68" height="28" className="d-inline-block align-top" alt=""/>
                    &nbsp;
                    {this.props.CorpName}
                </a>
            </nav>
        )    
    }
}        
//   {this.props.CorpName}
export default NavBarApp;