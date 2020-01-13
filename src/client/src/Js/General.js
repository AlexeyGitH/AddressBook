
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
        let MM = n.slice(3);
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



/*
var zemba = function () {
}
*/
