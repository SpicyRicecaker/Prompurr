// let pageVisible = true;
let dateToday;
const elementIds = [
    'todo-add',
    'todo-imp-container',
    'todo-input',
    'todo-area',
    'todo-item-area',
    'todo-item-template',
    'calendar-template',
    'todo-item-list',
];
const element = new Map();
// let previousFocus;
// Builds a lookup cache for faster element lookups
function buildElementCache() {
    for (let i = 0; i < elementIds.length; i += 1) {
        element.set(elementIds[i], document.getElementById(elementIds[i]));
    }
}
buildElementCache();
function updateDate() {
    dateToday = new Date();
}
// Generates a calendar (+6 months soon) based off today's date
function generateCalendar(someDate) {
    // Define an array of months
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    // First create a calendar skeleton from the template
    const documentFragment = document.importNode(element.get('calendar-template').content, true);
    // We need to actually target the section because for some reason the importnode just imports
    // a document fragment
    const calendarSection = documentFragment.querySelector('section');
    const table = calendarSection.querySelector('.calendar-table');
    // Collect the year, month, date currently
    const y = someDate.getFullYear();
    const m = someDate.getMonth();
    const d = someDate.getDate();
    // Get the first day, code inspired by
    // https://stackoverflow.com/questions/13571700/get-first-and-last-date-of-current-month-with-javascript-or-jquery
    const firstDay = new Date(y, m, 1).getDay();
    const lastDate = new Date(y, m + 1, 0).getDate();
    // First set the name of the month
    calendarSection.querySelector('.calendar-header').innerHTML = `${monthNames[m]}`;
    // Now we can start filling in our table
    let dayCount = 1;
    // The first loop is outside of the main for loop
    // because we want to start at the specific day of the week
    // of the first day of the month
    // keep in mind that the first row we're doing is 1 not 0 because
    // 1 is the day of the week
    // Take care of the middle rows
    for (let a = 1; a < 7; a += 1) {
        for (let b = 0; b < 7; b += 1) {
            // If we're in the first row and we're not at the first day yet
            if (a === 1 && b < firstDay) {
                table.rows[a].cells[b].innerHTML = '&nbsp;';
            }
            // If the day count is greater than the month length just leave
            else if (dayCount > lastDate) {
                table.rows[a].cells[b].innerHTML = '&nbsp;';
            }
            else {
                table.rows[a].cells[b].innerHTML = dayCount.toString();
                // Check if it's the special day, highlight it
                if (dayCount === d) {
                    table.rows[a].cells[b].setAttribute('id', 'calendar-selected');
                }
                dayCount += 1;
            }
        }
    }
    // Use event delegation to add an event listener to the calendar
    calendarSection.addEventListener('click', function inputDateConsole(e) {
        // Make sure the the element that was selected was a td element
        const el = e.target;
        if (el.nodeName === 'TD') {
            // Make sure that the date isn't null
            // (We should really add the previous & future
            // month dates greyed out...)
            if (el.innerHTML !== '&nbsp;') {
                // Append the month and date to our juicy console rn
                element.get('todo-input').value += ` ${monthNames[m]} ${el.innerHTML}`;
            }
        }
        // May change later
        // KEEP FOCUSING THE TEXTBOX CHARLESTON
        element.get('todo-input').focus();
    });
    document.getElementById('todo-imp-container').appendChild(calendarSection);
}
function init() {
    updateDate();
    generateCalendar(dateToday);
}
init();
function handleFocus() {
    // Replace console with button
    element.get('todo-input').style.display = 'none';
    element.get('todo-add').style.display = 'block';
    // Probably remove calendar as well
    document.getElementById('calendar-container').style.display = 'none';
}
// Hides an element when you click somewhere else.
// Takes in an element as a parameter, then
// sets up event listeners that are automatically disposed of
// when the element is closed
function hideOnBush(toHide) {
    // Defines what happens when we leave the console
    // element
    //   .get('todo-imp-container')
    //   .addEventListener('focusout', function closeConsole() {
    //     this.focus();
    //     console.log(document.activeElement);
    //     return;
    //     if (!this.contains(document.activeElement)) {
    //       window.setTimeout(handleFocus, 0);
    //     }
    //   });
    // const isVisible = (elem) =>
    //   !!elem &&
    //   !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    // Add an event listener to the whole document
    const scanForClicks = (e) => {
        // If the element to hide does not include the clicked element
        if (!toHide.contains(e.target)) {
            // Hide the element/place your function here
            handleFocus();
            // Cleanup the costly document event listener
            document.removeEventListener('click', scanForClicks);
        }
    };
    document.addEventListener('click', scanForClicks);
    // // On visibility change, update visibility state, and either store previous or focus previous el
    // document.addEventListener(
    //   'visibilitychange',
    //   function handleVisibilityChange() {
    //     // If going out of focus
    //     if (document.hidden) {
    //       // Update visibility state
    //       // pageVisible = false;
    //       // Store current focus
    //       previousFocus = document.activeElement;
    //     } else {
    //       // If we're coming into focus
    //       // Update visibility state
    //       // pageVisible = true;
    //       // Change focus to previous focus
    //       focusPrevious();
    //     }
    //   },
    // );
    // // On focus, update visibility state and focus previous
    // window.addEventListener('focus', function focusVisible() {
    //   // pageVisible = true;
    //   focusPrevious();
    // });
    // // On visibility change, update visibility state and store previous
    // window.addEventListener('blur', function blurHidden() {
    //   // pageVisible = false;
    //   previousFocus = document.activeElement;
    // });
}
function openConsole(e) {
    e.stopPropagation();
    // Replace button with console
    element.get('todo-add').style.display = 'none';
    element.get('todo-input').style.display = 'block';
    // Focus console
    element.get('todo-input').focus();
    // Show calendar
    document.getElementById('calendar-container').style.display = 'block';
    // Define hide behavior
    hideOnBush(element.get('todo-imp-container'));
}
// Defines default add-todo clicked button behavior true
element
    .get('todo-add')
    .addEventListener('click', (e) => openConsole(e));
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
// function focusPrevious() {
//   if (previousFocus === element.get('todo-input')) {
//     openConsole();
//     previousFocus.focus();
//   }
// }
// On input to the console
element
    .get('todo-input')
    .addEventListener('change', function updateSemantics() {
    // Register/record this date
    // Then eventually give suggestions on how to type this date
});
