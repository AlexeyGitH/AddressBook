var express = require('express');
var router = express.Router();

//const fs = require('fs');
var bodyParser = require('body-parser')


var isAuthenticated = function (req, res, next) {
	
	//console.log('error login 1-1');

	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	//console.log('error login 1');
	//if (req.isAuthenticated())
	//	{res.redirect('/dashboards_admin.html'), console.log('error login 1-2');}
		//return next();
	// if the user is not authenticated then redirect him to the login page
	//console.log('error login 2');

	//console.log('error login 1-3');
	//res.redirect('/admin.html');
	


	if (req.isAuthenticated())
		return next();

	res.redirect('/admin.html');
}

module.exports = function(passport, fs){

    /* Handle Login POST */
    router.post('/auth', passport.authenticate('local', {
         successRedirect: '/dashboards_admin.html',
         failureRedirect: '/admin.html'
    }));


    router.post('/api', function (req, res) {
		/*
		//console.log('api 0');
        const itemlist = JSON.parse(fs.readFileSync('server/static/data/data.json', 'utf8'));
		res.send(itemlist);
		*/
		//console.log('data o: ' + JSON.stringify(req.body));
		
		require('../base/Data').SelectAllContacts(req.body.offset, req.body.limit, req.body.filter, function(err, all, count) {

			var json_values = {
				"data" : all,
				"count" : count,
				};


			
			//console.log('json_values : ' + json_values);
			res.send(JSON.stringify(json_values));

			//console.log('count : ' + JSON.stringify(res_data));
			//console.log('data o: ' + JSON.stringify(json_values));
			//res.send(JSON.stringify(res_data));
		});
	

      });



	/* GET Home Page */
	router.get('/dashboards_admin', isAuthenticated, function(req, res){
		//console.log('error login 0');
		//console.log(req.user);
		res.send(req.user);
	});

    /* Handle Logout */
    /*
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
    */

   router.post('/additional_contacts', function(req, res){
	//var d = require('../base/Data').UpdateData('Update function');   
	//console.log('parapm1 ' + req.body.offset);
	//console.log('fff');
	var json_values;

	require('../base/Data').SelectData(10, 33, function(err, all) {
		json_values = all;
		//console.log('data o: ' + JSON.stringify(json_values));
		res.send(JSON.stringify(json_values));
		});
	});


	router.post('/contact_data', function(req, res){
		var json_values;
		//console.log('id: ' + req.body.id);
	
		require('../base/Data').SelectContactData(req.body.id, function(err, all) {
			json_values = all;
			if (json_values.length > 0) {json_values = json_values[0];};
			//console.log('data ' + JSON.stringify(json_values[0]))

			//console.log('data o: ' + JSON.stringify(json_values));
			res.send(JSON.stringify(json_values));
			});
		});	

	router.post('/POST_JSON_Data', function(req, res) {
  		//console.log(req.body.aData);
  		//console.log("body: %j", req.body);
		//app.use(bodyParser.json({limit: '80mb'}));
		
		
		let data = JSON.parse(req.body.aData); 
		
		//fs.writeFile('public/data/data.json', JSON.stringify(data), function (err) {
		//  if (err) throw err;
		//});
		//console.log("data: ", data);

		let array_length = data.length;
		//console.log("array_length: ", array_length);
		//let row_index =1;
		let cur_idx = 0;
        while (cur_idx < array_length) {
			let item = data[cur_idx];
			cur_idx = cur_idx + 1;
			//console.log("item: ", item);
			require('../base/Data').InsertContactData(item, function(err) {
				console.log('err InsertContactData', err);
			});	
		}
		
		res.send('OK');	
	  });

	router.post('/search_filter', function(req, res){
	var json_values;
	//console.log('req.body ' + req.body);
	require('../base/Data').SelectSearchFilter(req.body, function(err, all) {
		json_values = all;
		//console.log("item: ", json_values);
		res.send(JSON.stringify(json_values));
		});
	});

	router.post('/delete_all_contacts', async function(req, res){
		
		//console.log('delete req.body: ' + req.body);
		//console.log('delete req.body id: ' + req.body.id);
		//console.log('delete req.body filter: ' + req.body.aFilter);
		if (req.body.id == undefined) {
			res.json({
				success: false,
			});				
			return;
		}

		let id_data = req.body.id;
		

		//var promise = new Promise((resolve, reject) => {
			
			require('../base/Data').SelectAllContacts(0, -1, undefined, async function(err, all, count) {

			let array_length = count;
			//console.log("array_length: ", array_length);
			//let row_index =1;
			let cur_idx = 0;
			while (cur_idx < array_length) {
				//console.log("cur_idx: ", cur_idx);
				//console.log("id_data: ", id_data);
				//console.log("cur_idx: " + cur_idx);
				let item = all[cur_idx];
				if (id_data == item.id) {	
					//console.log("item: ", item);
					//console.log("id_data: ", id_data);
					const res = await require('../base/Data').DeleteData(item.id, item.photo);	
				}
				else if (id_data == 'base')
				{	
					let aFilter = JSON.parse(req.body.aFilter); 
					let f_base = aFilter.base;
					let f_additionals = aFilter.additionals;
					//console.log("base 1c: ", f_base);
					//console.log("base item: ", item.base);
					
					if (f_base !== undefined)
					{
						if (f_base == item.base & f_additionals == item.additionals)
						//console.log("item: ", item.last_name);
						{
							const res = await require('../base/Data').DeleteData(item.id, item.photo);	
						}	
					}		

				};

				cur_idx = cur_idx + 1;
			};

			res.send(JSON.stringify({success: true,}));
			//console.log("Delete OK: ");

		});

	//});	
	
		// promise.then(
		// 	result => {res.json({
		// 		success: true,
		// 	})
		// 	; //console.log("Delete OK: ");
		// }
		// 	, 
		// 	error => res.json({
		// 		success: false,
		// 	})
		// );

	});  
	
	
	router.post('/Post_Additional_Contacts', function(req, res) {
	  
	  //console.log("last_name: ", req.body.last_name);

		
	  //console.log("data: ", req.body);

	  require('../base/Data').InsertAdditionalContactData(req.body, function(err) {
		console.log(err);
	  });	

	  res.send('OK');	
	});

	return router;
}