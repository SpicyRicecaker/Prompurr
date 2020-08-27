const elementIds = ['todo-add', 'todo-input', 'todo-area'];
const element = [];

// Builds a lookup cache for faster element lookups
function buildElementCache() {
  for (let i = 0; i < elementIds.length; i += 1) {
    element[elementIds[i]] = document.getElementById(elementIds[i]);
  }
}

function init() {
  buildElementCache();
}

init();

// Defines default add-todo clicked button behavior
element['todo-add'].addEventListener('click', function openConsole() {
  // Replace button with console
  this.style.display = 'none';
  element['todo-input'].style.display = 'block';
  // Focus console
  element['todo-input'].focus();
});

// Defines what happens when we leave the console
element['todo-input'].addEventListener('focusout', function closeConsole() {
  // Replace console with button
  this.style.display = 'none';
  this.value = '';
  // Probably should wipe console inner html too
  element['todo-add'].style.display = 'block';
});

// Defines what happens when we press 'enter' in the console
element['todo-input'].addEventListener('keydown', function createTodoItem (e) {
  if(e.key === 'Enter'){
    // Create a new div based on the current values
    const t = document.createElement('div');
    t.setAttribute('class', 'todo-item');
    t.innerHTML = this.value;

    // Clear console
    element['todo-input'].value = '';
    // Append div to document
    element['todo-area'].appendChild(t);
  }
});

document.getElementsByClassName('todo-item-bullet')[0].addEventListener('mouseover', function showTimes(){
  this.innerHTML = '&times;';
});

document.getElementsByClassName('todo-item-bullet')[0].addEventListener('mouseout', function showBull(){
  this.innerHTML = '&bull;';
});

document.getElementsByClassName('todo-item-bullet')[0].addEventListener('click', function deleteTodoItem(){
  this.parentNode.remove();
});


