var fs = require('fs');

module.exports = function(file){
  fs.readFile('./partials/header.html', 'utf8', function (err,data) {

    console.log(data)
  // if (err) {
  //   return console.log(err);
  // }

  //   return data;
  // })
  });
};
