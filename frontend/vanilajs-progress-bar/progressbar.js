
function ProgressBar(){
  this.selectedProgressbar = 0;
  this.buttons = [];
  this.bars = [];
  this.limit = 0;
}

ProgressBar.prototype.init = function(endpoint){
  this.buttons = endpoint.buttons;
  this.bars = endpoint.bars;
  this.limit = endpoint.limit;
}
ProgressBar.prototype.setSelectProgressBar = function(value){
  this.selectedProgressbar = value;
}
ProgressBar.prototype.calculateSum = function(idx, value){
  var sum = parseInt(this.bars[idx])  + parseInt(value) ;
  if( sum >= 0){
    return sum;
  } else {
    return 0;
  }
}

ProgressBar.prototype.changePercentage = function(idx, value){
  const sum = this.calculateSum(idx, value)
  var percentspan = document.getElementById('progress'+ idx);
  var SpanBar = document.getElementById('span-progress'+ idx);
  
  this.bars[idx] = sum;
  percentspan.innerText = sum +"%";

  SpanBar.style.width = this.checkBarStyle(sum).width;  
  SpanBar.style.backgroundColor = this.checkBarStyle(sum).backgroundColor;
}
ProgressBar.prototype.checkBarStyle = function(sum){
  if( sum > this.limit){
    return { width: "100%", backgroundColor: "red" };
  } else{
    return { width: sum/this.limit*100 +"%", backgroundColor: "skyblue" };
  }
}

function DomManipulation(){}

DomManipulation.prototype.createTitleArea = function(){
  const span = document.createElement('span');
  span.innerText = "Progess Bars Demo"
  span.id = "TitleSpan"
  return span
}
DomManipulation.prototype.createBarArea = function(endpoint){
  const BarDiv = document.createElement('div')
  for(var i=0; i < endpoint.bars.length; i++){
    var bar = document.createElement('div');
    bar.className = "meter";
    var percentspan = document.createElement('span');
    percentspan.className = "percentspan"
    percentspan.id = "progress" + i;
    sum = PB.calculateSum(i, 0);
    percentspan.innerText = sum + "%";
    
    var SpanBar = document.createElement('span');    
    SpanBar.id = "span-progress" + i;
    SpanBar.className = "barspan";
    SpanBar.style.width = PB.checkBarStyle(sum).width;
    SpanBar.style.backgroundColor = PB.checkBarStyle(sum).backgroundColor;
    
    bar.appendChild(SpanBar);
    bar.appendChild(percentspan);
    BarDiv.appendChild(bar);
  }
  return BarDiv;
}
DomManipulation.prototype.createSelectArea = function(endpoint){
  const BarSelect = document.createElement('select')
  for(var i=0; i < endpoint.bars.length; i++){
      var opts = document.createElement('option');
      opts.innerText = "#progress" + (i+1);
      opts.value = (i);
      BarSelect.appendChild(opts);
  }
  BarSelect.addEventListener("change", function() {
    PB.setSelectProgressBar(this.value);
  });
  return BarSelect;
}

DomManipulation.prototype.createButton = function(btnValue){  
  const btn = document.createElement('button');
  if(parseInt(btnValue) > 0){
    btn.innerText = "+" + btnValue;
  } else{
    btn.innerText = btnValue;
  }
  btn.value = btnValue;
  btn.addEventListener("click", function() {
    PB.changePercentage(PB.selectedProgressbar, this.value);
  });
  return btn;
}


DomManipulation.prototype.createButtonArea = function(endpoint){  
  const btnArea = document.createElement('span');
  for(var i=0; i < endpoint.buttons.length; i++){
    btnArea.appendChild(Dom.createButton(endpoint.buttons[i]));
  }
  return btnArea;
}


DomManipulation.prototype.init = function(endpoint){
  const createTitleArea = this.createTitleArea;
  const createBarArea = this.createBarArea;
  const createSelectArea = this.createSelectArea;
  const createButtonArea = this.createButtonArea;

  const wrapperArea = document.createElement('div');
  wrapperArea.appendChild(createTitleArea());
  wrapperArea.appendChild(createBarArea(endpoint));
  wrapperArea.appendChild(createSelectArea(endpoint));
  wrapperArea.appendChild(createButtonArea(endpoint));
  return wrapperArea;
}

DomManipulation.prototype.displayItem = function(item){
  const li = document.createElement('li');
  li.innerText = item.title
  return li;
}
DomManipulation.prototype.addTodoEvent = function(form, createTodo, unorderedList){
  const displayItem = this.displayItem;
  const id = new Date().getUTCMilliseconds();
  form.addEventListener('submit', function(e){
        e.preventDefault();
        const input = document.querySelector('input').value
        const item = {complete: false,id : id, title: input}
        createTodo(item);
        unorderedList.appendChild(displayItem(item))
    }) 
}