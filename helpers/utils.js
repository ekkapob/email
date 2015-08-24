var fs = require('fs');
var Juice = require('juice');

exports.Fetch = function(url){
  return fs.readFileSync(url, {encoding: 'utf8'});
}

exports.EmbedCss = function (html, css){
  return Juice.inlineContent(html, css)
}

exports.FileExist = function(url) {
  return fs.existsSync(url);
}

exports.WriteFile = function(fileName, data) {
  try {
    fs.writeFileSync(fileName, data);
  } catch(err) {
    return console.log('[ERROR] ' + fileName);
  }
  console.log('[CREATED] ' + fileName);
}