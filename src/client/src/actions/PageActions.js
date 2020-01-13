export const GET_CONTACTS_REQUEST = 'GET_PHOTOS_REQUEST'
export const GET_CONTACTS_SUCCESS = 'GET_PHOTOS_SUCCESS'
export const GET_CONTACTS_FAIL = 'GET_PHOTOS_FAIL'

let photosArr = []
let cached = false

export function getContacts(year) {
  return dispatch => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year,
    })

    if (cached) {
      let photos = makeYearPhotos(photosArr, year)
      dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: photos,
      })
    } else {
      getMorePhotos(0, 200, year, dispatch)
    }
  }
}
