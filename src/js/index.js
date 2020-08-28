const elementIds = [
    'todo-add',
    'todo-input',
    'todo-area',
    'todo-item-area',
    'todo-item-template',
    'todo-item-list',
];
const element = new Map();
let previousFocus;
// Builds a lookup cache for faster element lookups
function buildElementCache() {
    for (let i = 0; i < elementIds.length; i += 1) {
        element.set(elementIds[i], document.getElementById(elementIds[i]));
    }
}
function init() {
    buildElementCache();
}
init();
function openConsole() {
    // Replace button with console
    element.get('todo-add').style.display = 'none';
    element.get('todo-input').style.display = 'block';
    // Focus console
    element.get('todo-input').focus();
}
// Defines default add-todo clicked button behavior true
element
    .get('todo-add')
    .addEventListener('click', () => openConsole());
function handleFocus() {
    // Replace console with button
    element.get('todo-input').style.display = 'none';
    // this.value = '';
    // Probably should wipe console inner html too
    element.get('todo-add').style.display = 'block';
}
// Defines what happens when we leave the console
element
    .get('todo-input')
    .addEventListener('focusout', function closeConsole() {
    window.setTimeout(handleFocus, 0);
});
// Defines what happens when we press 'enter' in the console
element
    .get('todo-input')
    .addEventListener('keydown', function createTodoItem(e) {
    if (e.key === 'Enter') {
        // Create a new div based on the current values via template
        const tmp = document.importNode(element.get('todo-item-template').content, true);
        // Select the span element inside and set it equal to the console
        tmp.querySelector('.todo-item-value').innerHTML = this.value;
        // Clear console
        element.get('todo-input').value = '';
        // Append div to document
        element.get('todo-item-list').appendChild(tmp);
    }
});
// Event delegation to todo-item-area
// Have to use 'as' profusely as a cast in typescript
// On click, remove the item
element
    .get('todo-item-list')
    .addEventListener('click', function removeTodoItem(e) {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        el.parentNode.remove();
    }
});
// On hover, show x
element
    .get('todo-item-list')
    .addEventListener('mouseover', function showTimes(e) {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        el.innerHTML = '&times;';
    }
});
// On not hovering, show bullet
element
    .get('todo-item-list')
    .addEventListener('mouseout', function showBull(e) {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        el.innerHTML = '&bull;';
    }
});
document.addEventListener('visibilitychange', function preserveFocus() {
    console.log('visibly out');
    // If we're coming into focus
    if (document.visibilityState === 'visible') {
        // Change focus to previous focus
        if (previousFocus !== undefined) {
            if (previousFocus === element.get('todo-input')) {
                openConsole();
                previousFocus.focus();
            }
        }
    }
    else {
        // If going out of focus, store current focus
        previousFocus = document.activeElement;
    }
});
