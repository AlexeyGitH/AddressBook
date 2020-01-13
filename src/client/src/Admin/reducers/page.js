import {
  GET_CONTACT_CHANGE,
  CHANGE_LAST_NAME,
  CHANGE_FIRST_NAME,
  CHANGE_MIDDLE_NAME,
  CHANGE_BIRTH_DATE,
  CHANGE_GENDER,
  CHANGE_ID,
  CHANGE_CORPORATION,
  CHANGE_DEPARTMENT,
  CHANGE_POSITION,
  CHANGE_WORK_PHONE,
  CHANGE_MOBILE_PHONE,
  CHANGE_ADDITIONAL_PHONE,
  CHANGE_MAIL,
  CHANGE_STATUS,
  CHANGE_STATUS_BEGIN,
  CHANGE_STATUS_END                
} from '../actions/PageActions'



function getInitialContacts() {
  const API = document.location.protocol + "//" + document.location.host + "/dashboards_admin";
  
  fetch(API)
  .then(response => {if (response.url.includes('dashboards_admin')) {return response.json()} else {throw new Error("No JSON")}}) 
  //.then(response => {console.log(response); this.setState({DataUser: response.url, isFetching: false });})
  //.then(response => {if (/*response.ok ||*/ IsJsonString(response)) {console.log(response.json()); return response.json()} else {console.log('error resp');this.setState({DataUser: null, isFetching: false })}})
  //.then(response => {try {return response.json()} catch (e) {console.log('error resp');this.setState({DataUser: null, isFetching: false })}}  )
  .then(dataU => {/*console.log(dataU);*/ this.setState({DataUser: dataU, isFetching: false });})
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ', e.message);
    this.setState({hasError: true});
  });
}

const initialState = {
    last_name: '',
    first_name: '',
    middle_name: '',
    birth_date: '',
    gender: '',
    photo: '',
    id: '',
    corporation: '',
    department: '',
    position: '',
    work_phone: '',
    mobile_phone: '',
    additional_phone: '',
    mail: '',
    status: '',
    status_begin: '',
    status_end: ''
}

export function pageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACT_CHANGE:
      //console.log('action.payload.last_name '+ action.payload);
      if (action.payload.length == 0)
        {//console.log('action yes ' + action.payload.length );
          //return { ...state, initialState}
          return initialState;
        }
      else
        {//console.log('action no ');
          //let ret_v = {j_data_contact:action.payload};
          return { ...state, last_name: action.payload.last_name
          , first_name: action.payload.first_name, middle_name: action.payload.middle_name
          , birth_date: action.payload.birth_date, gender: action.payload.gender
          , photo: action.payload.photo, id: action.payload.id, corporation: action.payload.corporation
          , department: action.payload.department, position: action.payload.position, work_phone: action.payload.work_phone
          , mobile_phone: action.payload.mobile_phone, mail: action.payload.mail, status: action.payload.status
          , additional_phone: action.payload.additional_phone
          , status_begin: action.payload.status_begin, status_end: action.payload.status_end }}  
      
    case CHANGE_LAST_NAME:
        return { ...state, last_name: action.payload}
    case CHANGE_FIRST_NAME:
      return { ...state, first_name: action.payload}
    case CHANGE_MIDDLE_NAME:
      return { ...state, middle_name: action.payload}
    case CHANGE_BIRTH_DATE:
      return { ...state, birth_date: action.payload}
    case CHANGE_GENDER:
      return { ...state, gender: action.payload}
    case CHANGE_ID:
      return { ...state, id: action.payload}
    case CHANGE_CORPORATION:
      return { ...state, corporation: action.payload}
    case CHANGE_DEPARTMENT:
      return { ...state, department: action.payload}
    case CHANGE_POSITION:
      return { ...state, position: action.payload}
    case CHANGE_WORK_PHONE:
      return { ...state, work_phone: action.payload}
    case CHANGE_MOBILE_PHONE:
      return { ...state, mobile_phone: action.payload}
    case CHANGE_ADDITIONAL_PHONE:
      return { ...state, additional_phone: action.payload}
    case CHANGE_MAIL:
      return { ...state, mail: action.payload}
    case CHANGE_STATUS:
      return { ...state, status: action.payload}
    case CHANGE_STATUS_BEGIN:
      return { ...state, status_begin: action.payload}
    case CHANGE_STATUS_END:
      return { ...state, status_end: action.payload}
    default:
        //let ret_v = {data_contact:initialState};
      return initialState
  }
}
