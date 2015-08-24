var Handlebars = require('handlebars');
var Fetch = require('./helpers/utils').Fetch;
var EmbedCss = require('./helpers/utils').EmbedCss;
var FileExist = require('./helpers/utils').FileExist;
var WriteFile = require('./helpers/utils').WriteFile;
var Config = require('./config.json');
var _ = require('lodash');

var TEMPLATES = [
  'Bids.Recieved', 'Bids.Accept',
  // 'Order.Delivery.Receipt'
];

(function (){
  var templates = (process.argv[2]) ? [process.argv[2]] : TEMPLATES;
  templates.forEach(function(template){
    console.log('Creating template: "' + template + '"');
    var component = _.get(Config, template);
    if (!component) {
      return;
    }
    var hbsTemplate = compileTemplate(component.template);
    compilePartials(component.partials);
    WriteFile('./dist/templates/' + component.template + '.html', hbsTemplate());
  });
})();

function compileTemplate(name){
  var html = getCssInlinedHtml(name);
  return Handlebars.compile(html.embeded || html.raw);
}

function compilePartials(partials){
  partials.forEach(function(partial){
    var html = getCssInlinedHtml(partial, true);
    Handlebars.registerPartial(partial, html.embeded || html.raw);
  });
}

function getCssInlinedHtml(name, isPartial) {
  var source = {
    raw: Fetch('./templates/' + ((isPartial) ? 'partials/' : '') + name + '.hbs')
  }
  var cssPath = './stylesheets/' + ((isPartial) ? 'partials/' : '') + name + '.css';
  if(FileExist(cssPath)){
    source.css = Fetch(cssPath);
    source.embeded = EmbedCss(source.raw, source.css);
  }
  return source;
}
