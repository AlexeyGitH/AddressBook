var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./DataBase/database.sqlite3');
const fs = require('fs');

module.exports = {
    SelectData: function(offset, limit, callback) {
            //console.log('select..');
            db.all("SELECT * FROM Contacts WHERE additionals  = 1;", function(err, all) {
               // console.log('offset ' + offset);
                //console.log('limit '  + limit);
                callback(err, all);  
            });
    },

    SelectAllContacts: function(offset, limit, filter, callback) {
        if (filter === undefined) {
            db.all("SELECT * FROM Contacts ORDER BY l_FIO ASC LIMIT ?, ?;", [offset, limit], function(err, all) {
                //console.log('offset ' + offset);
                //console.log('limit '  + limit);
                //console.log('filter.filterFIO undefined');
                //console.log('db' + all);
                db.all("SELECT COUNT(*) as count FROM Contacts", function(err, count) {
                    //console.log('count ' + count);
                    if (count === undefined) {callback(err, all, 0)} else {callback(err, all, count[0].count)}; 
                });    

            });
        }
        else {
            let params = {$offset: offset, $limit: limit}
            let sql_req = "SELECT * FROM Contacts";
            let count_sql_req = "SELECT COUNT(*) as count FROM Contacts";

            let f_FIO = "";
            if (filter.filterFIO != '') {params.$FIO = '%'+filter.filterFIO.toLocaleLowerCase()+'%'; f_FIO = " l_FIO LIKE $FIO"};

            let f_dep = "";
            if (filter.filterDepartment != '') {params.$Department = '%'+filter.filterDepartment.toLocaleLowerCase()+'%'; f_dep = " l_department LIKE $Department"}
            if (f_FIO != "" && f_dep != "") {f_dep = ' AND' + f_dep};    

            let f_corp = "";
            if (filter.filterCorporation != '') {params.$Corporation = '%'+filter.filterCorporation.toLocaleLowerCase()+'%'; f_corp = " l_corporation LIKE $Corporation"}
            if ((f_FIO != "" || f_dep != "") && f_corp != "") {f_corp = ' AND' + f_corp};    


            let f_phone = "";
            //console.log('filter.filterTypePhone ' + filter.filterTypePhone);
            //console.log('filter.filterPhone ' + filter.filterPhone);
            if (filter.filterTypePhone === 'all' && filter.filterPhone != '') {params.$Phone = '%'+filter.filterPhone+'%'; f_phone = " (work_phone LIKE $Phone OR mobile_phone LIKE $Phone OR additional_phone LIKE $Phone)"}
            else if (filter.filterTypePhone === 'phone_additional' && filter.filterPhone != '') {params.$Phone = '%'+filter.filterPhone+'%'; f_phone = " (additional_phone LIKE $Phone)"}
            else if (filter.filterTypePhone === 'phone_work' && filter.filterPhone != '') {params.$Phone = '%'+filter.filterPhone+'%'; f_phone = " (work_phone LIKE $Phone)"}
            else if (filter.filterTypePhone === 'phone_mobile' && filter.filterPhone != '') {params.$Phone = '%'+filter.filterPhone+'%'; f_phone = " (mobile_phone LIKE $Phone)"}

            //console.log('f_phone: ' + f_phone);

            if ((f_FIO != "" || f_dep != "" || f_corp != "") && f_phone != "") {f_phone = ' AND' + f_phone};    




            if (f_FIO != "" || f_dep != "" || f_corp != "" || f_phone != "") {sql_req = sql_req + ' WHERE ' + f_FIO + f_dep + f_corp + f_phone;
                                                             count_sql_req = count_sql_req + ' WHERE ' + f_FIO + f_dep + f_corp + f_phone};    

            sql_req = sql_req +" ORDER BY l_FIO ASC LIMIT $offset, $limit;";

            db.all(sql_req, params, function(err, all) {
                let params_count = {};
                if (f_dep   != '') {params_count.$Department = params.$Department}
                if (f_FIO   != '') {params_count.$FIO = params.$FIO}
                if (f_corp  != '') {params_count.$Corporation = params.$Corporation}
                if (f_phone != '') {params_count.$Phone = params.$Phone}

                db.all(count_sql_req, params_count, function(err, count) {
                    //console.log('sql_req ' + sql_req);
                    if (count === undefined) {callback(err, all, 0)} else {/*console.log('data ' + all);*/ callback(err, all, count[0].count)}; 
                });    

                //console.log('filter.filterDepartment ' + filter.filterDepartment);
                //console.log('sql_req ' + sql_req);
                //console.log('params ' + JSON.stringify(params));
                
            });    
        }
    },


    InsertContactData: function(Data, callback) {
        //console.log('Data: ' +  JSON.stringify(Data));
        //console.log('service_number: ' +  Data.service_number);
        //console.log('code_number: ' +  Data.code_number);
        //console.log('base: ' +  Data.base);
        //console.log('birth_date: ' +  Data.birth_date);


        db.get('SELECT first_name, middle_name, last_name FROM Contacts WHERE service_number  = ? AND code_number  = ? AND base  = ? AND additionals = ?',
                 [Data.service_number, Data.code_number, Data.base, Data.additionals], function(err, row) {
                    //console.log('row', row);
                    if (err) {
                        callback(err);
                      }
                    else {
                        //console.log('ffff');

                        let photo = '';
                        let photo_file = '';
                        if (Data.photo != '') {
                            //let buff1 = fs.readFileSync('./server/static/img/Картинка.png');  
                            //let base64data = buff1.toString('base64');
                            //console.log('Image converted to base 64 is:\n\n' + base64data);  

                            photo_file = "./server/static/img/" + toTranslit(Data.id_man) + ".jpeg";
                            photo = "/img/" + toTranslit(Data.id_man) + ".jpeg";

                            Data.photo = Data.photo.replace(/\ /g, "+"); //1С какашка.. прячет знак +

                            let buff = Buffer.from(Data.photo, 'base64');  
                            //let buff = new Buffer(base64data, 'base64');  
                            fs.writeFile(photo_file, buff, function(err) {
                                if (err) {
                                    callback(err);
                                    //console.log(err);
                                  }
                                });

                            //  fs.writeFile("./server/static/img/1.txt", base64data, function(err) {
                            //    console.log(err);
                            //  });
                            //  fs.writeFile("./server/static/img/2.txt", Data.photo, function(err) {
                            //    console.log(err);
                            //  });


                        }    


                        //console.log('row: '  + row);
                        if (row !== undefined) {
                            //console.log('id_man: ' +  Data.id_man);
                            db.run("UPDATE Contacts SET first_name = ?, middle_name = ?, last_name = ?, department = ?, corporation = ?, work_phone = ?, mobile_phone = ?, additional_phone = ?, mail = ?, photo = ?, gender = ?, status = ?, status_begin = ?, status_end = ?, position = ?, l_FIO = ?, l_department = ? , l_corporation = ?, birth_date  = ?, id_man = ? WHERE service_number  = ? AND code_number  = ? AND base  = ? AND additionals = ?",
                                [Data.first_name, Data.middle_name, Data.last_name, Data.department, Data.corporation, Data.work_phone, Data.mobile_phone, Data.additional_phone, Data.mail, photo, Data.gender, Data.status, Data.status_begin, Data.status_end, Data.position, Data.last_name.toLocaleLowerCase() +' '+ Data.first_name.toLocaleLowerCase() +' '+ Data.middle_name.toLocaleLowerCase(), Data.department.toLocaleLowerCase(), Data.corporation.toLocaleLowerCase(), Data.birth_date,
                                    Data.id_man, Data.service_number, Data.code_number, Data.base, Data.additionals], function(err) {
                                        if (err) {
                                            //console.log('err', err);
                                            callback(err);
                                        }    

                            });
                        }    
                        else {
                           // console.log('Data: '  + Data.service_number +' '+ Data.code_number +' '+ Data.base +' '+ Data.additionals +' '+ Data.birth_date);
                            db.run("INSERT INTO Contacts (first_name, middle_name, last_name, service_number, code_number, base, additionals, department, corporation, work_phone, mobile_phone, additional_phone, mail, photo, gender, status, status_begin, status_end, position, l_FIO, l_department, l_corporation, birth_date, id_man) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                                [Data.first_name, Data.middle_name, Data.last_name, Data.service_number, Data.code_number, Data.base, Data.additionals, Data.department, Data.corporation, Data.work_phone, Data.mobile_phone, Data.additional_phone, Data.mail, photo, Data.gender, Data.status, Data.status_begin, Data.status_end, Data.position, Data.last_name.toLocaleLowerCase() +' '+ Data.first_name.toLocaleLowerCase() +' '+ Data.middle_name.toLocaleLowerCase(), Data.department.toLocaleLowerCase(), Data.corporation.toLocaleLowerCase(),  Data.birth_date, Data.id_man], function(err) {
                                    //console.log('err: ', err);
                                   // callback(err);
                            });
                        } 
                    }         
        });


    },

    SelectSearchFilter: function(filter, callback) {
        //console.log('filter ' + filter.filter);
        let s_filter = filter.filter;
        let v_filter = filter.v_filter;
        v_filter = '%' + v_filter.toLocaleLowerCase() +'%';
        //console.log('v_filter: ' + v_filter);
        //console.log('s_filter: ' + s_filter);

        let s_sql_filter = '';
        let sql_req_group = '';
        let sql_params;
        let sql_req;

        if (s_filter === 'search_corporation')
            {
                sql_req = 'SELECT department FROM Contacts';        
                sql_req_group = ' GROUP BY department'
                if (v_filter != '') {
                    sql_params = {$v_sql_filter: v_filter};
                    s_sql_filter = " WHERE l_corporation LIKE $v_sql_filter"
                }
            }

        if (s_filter === 'search_department')
        {
            sql_req = 'SELECT corporation FROM Contacts';        
            sql_req_group = ' GROUP BY corporation'
            if (v_filter != '') {
                sql_params = {$v_sql_filter: v_filter};
                s_sql_filter = " WHERE l_department LIKE $v_sql_filter"
            }
        }

        sql_req = sql_req + s_sql_filter + sql_req_group;

       // console.log('sql_req: ' + sql_req);
        if (s_sql_filter != "") {
            //console.log('sql_params '  + JSON.stringify(sql_params));
            db.all(sql_req, sql_params, function(err, all) {
               // console.log('all '  + all);
                callback(err, all);  
            });
        }
        else {
            db.all(sql_req, function(err, all) {
              //  console.log('all '  + all);
                callback(err, all);  
            });
        }    
    },

    DeleteData: async  function(id, path_image, callback) {


       //delete photo file
       //console.log('path_image ' + path_image);
       
        
            if (path_image !== null ) {
                    if (path_image != '' && ! path_image.includes('/img/default/')) { 
                            let photo_file = "./server/static/" + path_image;

                            try {
                                const res = await new Promise(function(resolve, reject) {
                                    fs.unlink(photo_file, function (err) {
                                        if (err) reject(err);
                                        // if no error, file has been deleted successfully
                                        console.log('File deleted: ' + photo_file);
                                        resolve('OK');
                                    });                                     

                                }    

                                )} catch (e) {
                                console.log('error delete file exeption: ', e);
                            }                                
                    };  
                };      
            
            //console.log('next step.. ');


           const res = await new Promise(function(resolve, reject) {
                db.run(`DELETE FROM Contacts WHERE id=?`, id, function(err)  {
                    if(err) reject("Delete SQL error: " + err.message)
                    else {
                        resolve('OK');
                    }
                })
            }) 
            
    },

    InsertAdditionalContactData: function(Data, callback) {

        //console.log('Data ' + JSON.stringify(Data));
        //console.log('Data birth_date' + Data.birth_date);


        id_contact = Data.id;
        id_man = 'additional_' + id_contact;

        if (Data.id != '') {
            db.run("UPDATE Contacts SET first_name = ?, middle_name = ?, last_name = ?, department = ?, corporation = ?, work_phone = ?, mobile_phone = ?, additional_phone = ?, mail = ?, photo = ?, gender = ?, status = ?, status_begin = ?, status_end = ?, position = ?, l_FIO = ?, l_department = ? , l_corporation = ?, birth_date  = ? WHERE additionals = ? AND id = ?",
            [Data.first_name, Data.middle_name, Data.last_name, Data.department, Data.corporation, Data.work_phone, Data.mobile_phone, Data.additional_phone, Data.mail, '', Data.gender, Data.status, Data.status_begin, Data.status_end, Data.position, Data.last_name.toLocaleLowerCase() +' '+ Data.first_name.toLocaleLowerCase() +' '+ Data.middle_name.toLocaleLowerCase(), Data.department.toLocaleLowerCase(), Data.corporation.toLocaleLowerCase(), Data.birth_date, 1, Data.id],
             function(err) {
                callback(err);
                save_photo(Data.photo, id_contact, id_man, Data.gender);
               // console.log('Data 1: ' + Data.work_phone + ' ' + Data.mobile_phone+ ' ' + Data.additional_phone);
            });

            
        }
        else {    
            db.run("INSERT INTO Contacts (first_name, middle_name, last_name, additionals, department, corporation, work_phone, mobile_phone, additional_phone, mail, gender, status, status_begin, status_end, position, l_FIO, l_department, l_corporation, birth_date, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [Data.first_name, Data.middle_name, Data.last_name, 1, Data.department, Data.corporation, Data.work_phone, Data.mobile_phone, Data.additional_phone, Data.mail, Data.gender, Data.status, Data.status_begin, Data.status_end, Data.position, Data.last_name.toLocaleLowerCase() +' '+ Data.first_name.toLocaleLowerCase() +' '+ Data.middle_name.toLocaleLowerCase(), Data.department.toLocaleLowerCase(), Data.corporation.toLocaleLowerCase(),  Data.birth_date, ''], function(err) {
                callback(err);
                //console.log('err ' + err);
                //console.log('lastID ' + this.lastID);
                id_contact = this.lastID;
                id_man = 'additional_' + id_contact;
                save_photo(Data.photo, id_contact, id_man, Data.gender);
                //console.log('Data 2: ' + Data.work_phone + ' ' + Data.mobile_phone);
            });
        }    

    },
    
    SelectContactData: function(id, callback) {
        //console.log('select..' + id);
        db.all("SELECT * FROM Contacts WHERE id = ?;", [id], function(err, all) {
            callback(err, all);  
        });
    },


};


var toTranslit = function (text) {
    return text.replace(/([а-яё])|([\s_-])|([^a-z\d])/gi,
        function (all, ch, space, words, i) {
            if (space || words) {
                return space ? '-' : '';
            }
            var code = ch.charCodeAt(0),
                index = code == 1025 || code == 1105 ? 0 :
                    code > 1071 ? code - 1071 : code - 1039,
                t = ['yo', 'a', 'b', 'v', 'g', 'd', 'e', 'zh',
                    'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p',
                    'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh',
                    'shch', '', 'y', '', 'e', 'yu', 'ya'
                ]; 
            return t[index];
        }
    );
}

var save_photo = function (photo, id_contact, id_man, gender) {
    let photo_file = '';
    let photo_url = '';

    //console.log('photo', photo);

    if (photo != '') {

        var regex = /^data:.+\/(.+);base64,(.*)$/;

        var matches = photo.match(regex);
        var ext = matches[1];
        var data = matches[2];

        photo_file = "./server/static/img/additionals/" + toTranslit(id_man) + "." + ext;

        photo_url = "/img/additionals/" + toTranslit(id_man) + "." + ext;
        let buff = Buffer.from(data, 'base64');  
        fs.writeFile(photo_file, buff, function(err) {
            if (err) {
                console.log(err);
            }
            });
    }    
    else {
        if (gender === 'жен') {
            photo_url = "/img/default/female.png";
        } 
        else {
            photo_url = "/img/default/male.png";
        }
    }


    db.run("UPDATE Contacts SET photo = ?, id_man = ? WHERE additionals = ? AND id = ?",
    [photo_url, id_man, 1, id_contact],
        function(err) {
            if (err) {
                console.log(err);
            }
    });

}

/*
var zemba = function () {
}
*/

  
