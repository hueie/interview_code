
var render = function (element, selector) {
	var target = document.querySelector(selector);
    if (!target) return;
    target.appendChild(element);
};
//var template = '<h1>Hello world!</h1>';
  
let PB = new ProgressBar();
PB.init(endpoint);
let Dom = new DomManipulation();
var template = Dom.init(endpoint);
render(template, '#root');


