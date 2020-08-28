const elementIds = [
    'todo-add',
    'todo-input',
    'todo-area',
    'todo-item-area',
    'todo-item-template',
    'todo-item-list',
];
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
// Defines default add-todo clicked button behavior true
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
    // this.value = '';
    // Probably should wipe console inner html too
    element['todo-add'].style.display = 'block';
});
// Defines what happens when we press 'enter' in the console
element['todo-input'].addEventListener('keydown', function createTodoItem(e) {
    if (e.key === 'Enter') {
        // Create a new div based on the current values via template
        const tmp = document.importNode(element['todo-item-template'].content, true);
        // Select the span element inside and set it equal to the console
        tmp.querySelector('.todo-item-value').innerHTML = this.value;
        // Clear console
        element['todo-input'].value = '';
        // Append div to document
        element['todo-item-list'].appendChild(tmp);
    }
});
// Event delegation to todo-item-area
// Have to use 'as' profusely as a cast in typescript
// On click, remove the item
element['todo-item-list'].addEventListener('click', function removeTodoItem(e) {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        el.parentNode.remove();
    }
});
// On hover, show x
element['todo-item-list'].addEventListener('mouseover', function showTimes(e) {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        el.innerHTML = '&times;';
    }
});
// On not hovering, show bullet
element['todo-item-list'].addEventListener('mouseout', function showBull(e) {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        el.innerHTML = '&bull;';
    }
});
