'use strict';

/*module.exports = function (app) {
	app.dataSources.postgres.autoupdate(function (err, result) {
		if (err) {
			console.log('err:' + err);
		} else {
			console.log('result1' + result);
		}
	});
};*/


module.exports = function (app) {
	var db = app.datasources.postgres;

	db.autoupdate(function (err, result) {
		//if (err) throw err;
		if (err) {
			console.log('err:' + err);
		} else {
			console.log('result' + result);
		}
		console.log('\nAutomigrate completed');
	});
};
