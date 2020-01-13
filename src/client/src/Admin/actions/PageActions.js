export const GET_CONTACT_CHANGE = 'GET_CONTACT_CHANGE'
export const CHANGE_LAST_NAME = 'CHANGE_LAST_NAME'
export const CHANGE_FIRST_NAME = 'CHANGE_FIRST_NAME'
export const CHANGE_MIDDLE_NAME = 'CHANGE_MIDDLE_NAME'
export const CHANGE_BIRTH_DATE = 'CHANGE_BIRTH_DATE'
export const CHANGE_GENDER = 'CHANGE_GENDER'
export const CHANGE_ID = 'CHANGE_ID', CHANGE_CORPORATION = 'CHANGE_CORPORATION', CHANGE_DEPARTMENT = 'CHANGE_DEPARTMENT'
export const CHANGE_POSITION = 'CHANGE_POSITION', CHANGE_WORK_PHONE = 'CHANGE_WORK_PHONE', CHANGE_MOBILE_PHONE = 'CHANGE_MOBILE_PHONE'
export const CHANGE_ADDITIONAL_PHONE = 'CHANGE_ADDITIONAL_PHONE', CHANGE_MAIL = 'CHANGE_MAIL'
export const CHANGE_STATUS = 'CHANGE_STATUS', CHANGE_STATUS_BEGIN = 'CHANGE_STATUS_BEGIN', CHANGE_STATUS_END = 'CHANGE_STATUS_END'

export function getContact(data_contact) {
  return dispatch => {
    //console.log('data_contact' + data_contact.last_name);
    dispatch({
      type: GET_CONTACT_CHANGE,
      payload: data_contact,
    })
  }
}

export function change_last_name(event) {
  return dispatch => {
    //console.log('data_contact action: ' + event.target.value);
    dispatch({
      type: CHANGE_LAST_NAME,
      payload: event.target.value,
    })
  }
}

export function change_first_name(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_FIRST_NAME,
      payload: event.target.value,
    })
  }
}

export function change_middle_name(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_MIDDLE_NAME,
      payload: event.target.value,
    })
  }
}

export function change_gender(value) {
  return dispatch => {
    dispatch({
      type: CHANGE_GENDER,
      payload: value,
    })
  }
}

export function change_birth_date(event) {
  return dispatch => {
    console.log('event date ' + event);
    dispatch({
      type: CHANGE_BIRTH_DATE,
      payload: event,
    });
  }
}


export function change_id(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_ID,
      payload: event.target.value,
    });
  }
}

export function change_corporation(value) {
  return dispatch => {
    dispatch({
      type: CHANGE_CORPORATION,
      payload: typeof value == "object" ? value.target.value : value,
    });
  }
}

export function change_department(value) {
  return dispatch => {
    dispatch({
      type: CHANGE_DEPARTMENT,
      payload: typeof value == "object" ? value.target.value : value,
    });
  }
}

export function change_position(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_POSITION,
      payload: event.target.value,
    });
  }
}

export function change_work_phone(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_WORK_PHONE,
      payload: event.target.value,
    });
  }
}

export function change_mobile_phone(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_MOBILE_PHONE,
      payload: event.target.value,
    });
  }
}

export function change_additional_phone(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_ADDITIONAL_PHONE,
      payload: event.target.value,
    });
  }
}



export function change_mail(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_MAIL,
      payload: event.target.value,
    });
  }
}

export function change_status(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_STATUS,
      payload: event.target.value,
    });
  }
}

export function change_status_begin(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_STATUS_BEGIN,
      payload: event,
    });
  }
}

export function change_status_end(event) {
  return dispatch => {
    dispatch({
      type: CHANGE_STATUS_END,
      payload: event,
    });
  }
}
