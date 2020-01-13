import React  from 'react';
import ReactDom from 'react-dom';
import "isomorphic-fetch";
class Login_Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {ValueUser:'', ValuePassword:'', isFetching: true};

    this.LogIn = this.LogIn.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);       
    this.handleChangePassword = this.handleChangePassword.bind(this);       
}

handleChangeUser(event) {
  this.setState({ValueUser: event.target.value});
}

handleChangePassword(event) {
  this.setState({ValuePassword: event.target.value});
}


LogIn(event) {
  //alert(this.state.ValueUser + ' ' + this.state.ValuePassword);
  //console.log('fdfdfdfdfdfdfdfdfdfdfdfdfdfdfdfd dfd');

  
 // console.log(this.state.ValueUser + ' // ' + this.state.ValuePassword);
 event.preventDefault();

//body: JSON.stringify({email: 'max@test.com', password: '12345'}),
 
fetch('/auth',{
  method: 'POST',
  body: JSON.stringify({
    'username': this.state.ValueUser, 'password': this.state.ValuePassword 
  }),
  headers: {"Content-Type": "application/json"}
}).then(res => 
    {
      
      if (res.url.includes('dashboards_admin')) {document.location.href = document.location.protocol + "//" + document.location.host + "/dashboards_admin.html"}
      else { $("#ErrorModal").modal();}
      //console.log(res.url);
     
    }
  );
}

  render() {
    return (
        <div className="row justify-content-center align-items-center" style={{marginTop: 8 + '%'}}>
          <div className="card bg-light" style={{width: 22 + 'rem'}}>
          <div className="card-header"><h5>LogIn</h5></div>
          <div className="card-body">  
              <form>
                <div className="form-group">
                  <label htmlFor="InputUser">User</label>
                  <input type="user" id="InputUser" className="form-control" aria-describedby="User" placeholder="User" value={this.state.valueName} onChange={this.handleChangeUser}/>
                </div>
                <div className="form-group">
                  <label htmlFor="InputPassword">Password</label>
                  <input type="password" className="form-control" id="InputPassword" placeholder="Password" value={this.state.valueName} onChange={this.handleChangePassword}/>
                </div>
                <div className="text-center"> 
                  <button type="submit" className="btn btn-primary" onClick={this.LogIn}>LogIn</button>
                </div>  
              </form>
            </div>
          </div>


          <div className="modal fade" id="ErrorModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  style={{marginTop: 8 + '%'}}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Ошибка</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Ошибка авторизации, попробуйте снова!
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

        </div>

    );
  }

} 
export default Login_Form;
  

ReactDom.render(<Login_Form/> , document.getElementById('react-app'));