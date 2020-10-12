
export const isNullValue = (n)=>{
    let result = '';
    if (n === '' || n === null) {result = ''}  else {result = n} ;                
    return result;
}

export const Date_RU_DD_MMMM = (n)=>{
    let result = '';

    
    if (n.length ===5)
    {
        let DD = n.slice(0, 2);
        let MM = n.slice(3,5);
        let MM_ru = '';
        if      (MM === '01') {MM_ru = 'января'}
        else if (MM === '02') {MM_ru = 'февраля'}
        else if (MM === '03') {MM_ru = 'марта'}
        else if (MM === '04') {MM_ru = 'апреля'}
        else if (MM === '05') {MM_ru = 'мая'}
        else if (MM === '06') {MM_ru = 'июня'}
        else if (MM === '07') {MM_ru = 'июля'}
        else if (MM === '08') {MM_ru = 'августа'}
        else if (MM === '09') {MM_ru = 'сентября'}
        else if (MM === '10') {MM_ru = 'октября'}
        else if (MM === '11') {MM_ru = 'ноября'}
        else if (MM === '12') {MM_ru = 'декабря'}

        if (DD.slice(0, 1) === '0') {DD = DD.slice(1, 2)}

        
        result = DD + ' ' + MM_ru;
    }
        
    return result;
}


export const Date_YYYY_MM_DD = (n)=>{
    let result = '';
    if (n.length === 10)
    {
        let DD = n.slice(0, 2);
        let MM = n.slice(3,5);
        let YYYY = n.slice(6);
        //console.log('base n  ' +  n);
        //console.log('DD  ' +  DD);
        //console.log('MM  ' +  MM);
        //console.log('YYYY  ' +  YYYY);
        result = YYYY +'-'+ MM+'-'+ DD;
    }
        
    return result;
}

export const Date_DD_MM = (n)=>{
    let result = '';
    if (n.length === 10)
    {
        let DD = n.slice(0, 2);
        let MM = n.slice(3,5);
        result = DD+'-'+MM;
    }
        
    return result;
}

export const DatePicker_YYYY_MM_DD = (n)=>{
    //let result = '0001-01-01';
    //console.log('birth_date  ' +  n);
    //console.log('typeof birth_date  ' +  typeof  n);

    let result = null;
    if (n == null || n == '') {return result;}

    //console.log('n.getMonth  ' +  typeof  n.getMonth);
    if (typeof  n.getMonth === 'function')
    {
        result = [
            n.getFullYear(),
            addLeadZero(n.getMonth() + 1),
            addLeadZero(n.getDate())
          ].join('-');
        //console.log('result  ' +  result);
    }

    //console.log('n  ' +  n);
    if (typeof n === 'string')
    {
        result =  Date_YYYY_MM_DD(n);
    }
    //console.log('result  ' +  result);

    return result;
}

var addLeadZero = function (val) {
    if (+val < 10) return '0' + val;
    return val;
};




/*
var zemba = function () {
}
*/
