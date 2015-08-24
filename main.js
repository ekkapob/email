var Handlebars = require('handlebars');
var Juice = require('juice');
var h =  require('./partials/header');

// process.argv.forEach(function(val,index, array){
//   console.log(index + ':' + val);
// })

if (process.argv[2]) {
  console.log('we got ', process.argv[2]);
}

var source = '{{> header}}<div>content</div>';
// var d;
// var fs = require('fs');
// d = fs.readFileSync('./partials/header.html', {encoding: 'utf8'});

// var template = Handlebars.compile(source);
//   Handlebars.registerPartial('header', d)
// var result = template();
// console.log(result);

console.log(Juice.inlineContent('<div class="testInline second">hello</div>', '.testInline{color:red;font-size:20px;}.second{color:black;}'));

