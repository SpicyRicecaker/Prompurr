"use strict";
// What will happen is that we'll try to load user
// data from a file in the server, but in the case
// that a request is invalid / there is a new user,
// we'll use a guest template instead
let userData = {
    username: 'bob1',
    password: 'joe2',
    tasks: [],
};
// Cache of currently loaded tasks
const taskCache = new Map();
// For now though, in the short term, we'll just implement
// a load button, which will load user with username 'spicyricecaker'
// and a save button, which will write all info including tasks of current username
// to a prompurrData.json file
let dateToday;
// const elementIds: string[] = [
//   'todo-add',
//   'todo-imp-container',
//   'todo-textarea',
//   'todo-area',
//   'todo-item-area',
//   'todo-item-template',
//   'calendar-template',
//   'todo-item-list',
//   'title-date-time',
//   'todo-overlay',
// ];
// const element = new Map<string, HTMLElement>();
// // Builds a lookup cache for faster element lookups
// function buildElementCache() {
//   for (let i = 0; i < elementIds.length; i += 1) {
//     element.set(
//       elementIds[i],
//       document.getElementById(elementIds[i]) as HTMLElement,
//     );
//   }
// }
// buildElementCache();
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
function updateDate() {
    dateToday = new Date();
}
const cacheToUser = () => {
    return new Promise((resolve) => {
        taskCache.forEach((value) => {
            userData.tasks.push(value);
        });
        resolve();
    });
};
// function replaceElement(toReplace: HTMLElement, toAppend: HTMLElement) {
//   const p = toReplace.parentElement;
//   toReplace.remove();
//   p.appendChild(toAppend);
// }
// Function that takes in a string, styles keywords, and returns as a string
function prompurrCompile(vanilla) {
    let modded = vanilla;
    modded = modded.replaceAll(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}/gi, '<span style="color: #d5a6bd;">$&</span>');
    modded = modded.replaceAll(/\d{1,2}:\d{2}[pa]/gi, '<span style="color: #76a5af;">$&</span>');
    return modded;
}
// Generates a calendar (+6 months soon) based off today's date & some other date
function generateCalendar(currentDate, visible) {
    const someDate = new Date();
    Object.assign(someDate, currentDate);
    // First create a calendar skeleton from the template
    const documentFragment = document.importNode(document.getElementById('calendar-template')
        .content, true);
    // We need to actually target the section because for some reason the importnode just imports
    // a document fragment
    const calendarSection = documentFragment.querySelector('section');
    const table = calendarSection.querySelector('.calendar-table');
    // Numbers for currentdate
    const cy = currentDate.getFullYear();
    const cm = currentDate.getMonth();
    // Our current day cell
    let cell;
    // Numbers for somedate
    let y;
    let m;
    function updateTableAndHeader() {
        // Collect the year, month, date currently
        y = someDate.getFullYear();
        m = someDate.getMonth();
        const d = currentDate.getDate();
        // Get the first day, code inspired by
        // https://stackoverflow.com/questions/13571700/get-first-and-last-date-of-current-month-with-javascript-or-jquery
        const firstDay = new Date(y, m, 1).getDay();
        const lastDate = new Date(y, m + 1, 0).getDate();
        // First set the name of the month
        calendarSection.querySelector('.calendar-header').innerHTML = `${monthNames[m]} ${y}`;
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
                    if (dayCount === d && cm === m && cy === y) {
                        table.rows[a].cells[b].setAttribute('id', 'calendar-selected');
                        cell = table.rows[a].cells[b];
                    }
                    dayCount += 1;
                }
            }
        }
    }
    updateTableAndHeader();
    // Use event delegation to add an event listener to the calendar
    calendarSection.addEventListener('click', (e) => {
        // Make sure the the element that was selected was a td element
        const el = e.target;
        if (el.nodeName === 'TD') {
            // Make sure that the date isn't null
            // (We should really add the previous & future
            // month dates greyed out...)
            if (el.innerHTML !== '&nbsp;') {
                // Append the month and date to our juicy console rn
                document.getElementById('todo-textarea').value += ` ${monthNames[m]} ${el.innerHTML}`;
            }
        }
        // May change later
        // KEEP FOCUSING THE TEXTBOX CHARLESTON
        document.getElementById('todo-textarea').focus();
        // COMPILE XD
        document.getElementById('todo-overlay').innerHTML = prompurrCompile(document.getElementById('todo-textarea').value);
    });
    // Also add event listeners to the buttons that will call generate calendar with a new date if needed
    calendarSection.querySelector('#calendar-arrow-left').addEventListener('click', () => {
        someDate.setMonth(m - 1);
        cell.setAttribute('id', '');
        updateTableAndHeader();
    });
    calendarSection.querySelector('#calendar-arrow-right').addEventListener('click', () => {
        someDate.setMonth(m + 1);
        cell.setAttribute('id', '');
        updateTableAndHeader();
    });
    calendarSection.querySelector('#calendar-reset').addEventListener('click', () => {
        someDate.setMonth(cm);
        someDate.setFullYear(cy);
        updateTableAndHeader();
    });
    calendarSection.querySelector('#calendar-time-noon').addEventListener('click', () => {
        document.getElementById('todo-textarea').value +=
            ' 12:00p';
    });
    calendarSection.querySelector('#calendar-time-midnight').addEventListener('click', () => {
        document.getElementById('todo-textarea').value +=
            ' 11:59p';
    });
    // calendarSection.querySelector('#calendar-time-other').addEventListener('click', ()=> {
    // })
    calendarSection.setAttribute('class', 'dropdown-content');
    switch (visible) {
        case true: {
            calendarSection.style.display = 'block';
            break;
        }
        case false: {
            calendarSection.style.display = 'none';
            break;
        }
        default: {
            break;
        }
    }
    return calendarSection;
}
function createTodoItem(description, currentDate, dueDate, valid) {
    // Create a new div based on the current values via template
    const documentFragment = document.importNode(document.getElementById('todo-item-template')
        .content, true);
    const todoItem = documentFragment.querySelector('.todo-item');
    // This reallly should have its own method VVV
    let modifier;
    // Select the span element inside and set it equal to the console
    if (!valid) {
        modifier = '<span style="color: #ffe599;"> sometime?</span>';
    }
    else if (currentDate < dueDate) {
        if (dueDate.getDate() === currentDate.getDate()) {
            modifier = '<span style="color: #ea9999;"> today!</span>';
        }
        else {
            // Get difference in mili
            const timeDiff = dueDate.getTime() - currentDate.getTime();
            // Find number of days until deadline
            const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
            if (dayDiff !== 1) {
                modifier = `<span style="color: #a2c4c9;"> in ${dayDiff} days</span>`;
            }
            else {
                modifier = '<span style="color: #f9cb9c;"> tomorrow</span>';
            }
        }
    }
    else {
        modifier = '<span style="color: #b6d7a8;"> pick new path?</span>';
    }
    todoItem.querySelector('.todo-item-value').innerHTML =
        description + modifier;
    // Append div to document
    document.getElementById('todo-item-list').appendChild(todoItem);
    return todoItem;
}
function cacheTasks() {
    for (let i = 0; i < userData.tasks.length; i += 1) {
        // Create todo item
        taskCache.set(createTodoItem(userData.tasks[i].description, new Date(userData.tasks[i].dateCreated), new Date(userData.tasks[i].dateDue), true), userData.tasks[i]);
    }
}
// Makes a request to the server to
// retrieve the json data and returns it
const sendHttpRequest = (method, url, data) => {
    return new Promise((resolve, reject) => {
        // First create a request
        const httpRequest = new XMLHttpRequest();
        // Now we need to open it
        // Request method, url, async t/f
        httpRequest.open(method, url, true);
        // Now onready state 4, when we're read to serve the data
        httpRequest.responseType = 'json';
        httpRequest.onload = () => {
            if (httpRequest.status >= 400) {
                reject(httpRequest.response);
            }
            resolve(httpRequest.response);
        };
        httpRequest.onerror = () => {
            reject();
        };
        httpRequest.send(data);
    });
};
function init() {
    updateDate();
    // Generate calendar then append it
    document
        .getElementsByClassName('dropdown')[0]
        .appendChild(generateCalendar(dateToday, false));
    // Load user data from db once we figure that out
    // loadDataJSON()
    //   .then((data) => {
    //     userData = JSON.parse(data);
    //   })
    //   .then((res) => cacheTasks())
    //   .catch((err) => console.log(`file not found: ${err}`));
    // Load todo-items from our user variable and also cache it
}
init();
function updateClock() {
    function tick() {
        updateDate();
    }
    function render() {
        const hours = dateToday.getHours();
        const hourTwelve = hours % 12 === 0 ? 12 : hours % 12;
        const minutes = dateToday.getMinutes();
        const minuteZero = minutes >= 10 ? minutes : `0${minutes}`;
        const modS = hours >= 12 ? 'p' : 'a';
        const monthS = monthNames[dateToday.getMonth()];
        const dateS = dateToday.getDate();
        document.getElementById('title-date-time-label').innerHTML = `${hourTwelve}:${minuteZero}${modS} ${monthS} ${dateS}`;
    }
    (function core() {
        tick();
        render();
        setTimeout(core, 60000);
    })();
}
updateClock();
function handleFocus() {
    // Replace console with button
    document.getElementById('todo-imp-container').style.display = 'none';
    document.getElementById('todo-add').style.display =
        'block';
    // Probably remove calendar as well
    document.getElementById('calendar-container').style.display = 'none';
}
// Hides an element when you click somewhere else.
// Takes in an element as a parameter, then
// sets up event listeners that are automatically disposed of
// when the element is closed
function hideOnBush(toHide, exceptions) {
    const scanForClicks = (e) => {
        // e.stopPropagation();
        // If the element to hide does not include the clicked element
        if (exceptions !== undefined) {
            for (let i = 0; i < exceptions.length; i += 1) {
                if (exceptions[i].contains(e.target)) {
                    return;
                }
            }
        }
        if (!toHide.contains(e.target)) {
            // Hide the element/place your function here
            handleFocus();
            // Cleanup the costly document event listener
            document.removeEventListener('click', scanForClicks);
        }
    };
    document.addEventListener('click', scanForClicks);
}
function openConsole(e) {
    e.stopPropagation();
    // Replace button with console
    document.getElementById('todo-add').style.display =
        'none';
    document.getElementById('todo-imp-container').style.display = 'block';
    // Focus console
    document.getElementById('todo-textarea').focus();
    // Show calendar
    document.getElementById('calendar-container').style.display = 'block';
    // Define hide behavior
    hideOnBush(document.getElementById('todo-imp-container'), [
        document.getElementsByClassName('center')[0],
    ]);
}
// Defines default add-todo clicked button behavior true
document.getElementById('todo-add').addEventListener('click', (e) => openConsole(e));
// Takes console input and converts it into data
function extractData(rawInput) {
    let exDesc;
    let rawMonthDate = '';
    let rawTime = '';
    // First we gotta select the month and date
    // When we find a match, store it, and replace it with ''
    exDesc = rawInput.replaceAll(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}/gi, function findRemoveRawDate(raw) {
        rawMonthDate = raw;
        return '';
    });
    // Then select the time
    // When we find match, store it, and replace it with ''
    exDesc = exDesc.replaceAll(/\d{1,2}:\d{2}[pa]/gi, function findRemoveRawTime(raw) {
        rawTime = raw;
        return '';
    });
    // At this point exDesc should be final.
    // Now we can make a new date and start setting it to our heart's content
    const exDate = new Date();
    exDate.setSeconds(0);
    let exMonth;
    let exDay;
    let exHour;
    let exMinute;
    let counter = 0;
    // If we matched a rawMonthDate
    if (rawMonthDate !== '') {
        // Set exMonth and exDay to it
        const splitMonthDate = rawMonthDate.split(/\s+/);
        exMonth = monthNames.indexOf(splitMonthDate[0]);
        exDay = parseInt(splitMonthDate[1], 10);
    }
    else {
        counter += 1;
        exMonth = dateToday.getMonth();
        exDay = dateToday.getDate();
    }
    // If we matched a time
    if (rawTime !== '') {
        // Set hour & minute
        const splitHourMin = rawTime.split(':');
        exHour = parseInt(splitHourMin[0], 10);
        exMinute = parseInt(splitHourMin[1].substring(0, 2), 10);
        const extension = splitHourMin[1].substring(2, 3);
        if (exHour === 12) {
            exHour -= 12;
        }
        if (extension === 'p') {
            exHour += 12;
        }
    }
    else {
        counter += 1;
        exHour = 23;
        exMinute = 59;
    }
    exDate.setMonth(exMonth);
    exDate.setDate(exDay);
    exDate.setHours(exHour);
    exDate.setMinutes(exMinute);
    // To find month and date, split our matched string and use substring
    return counter !== 2 ? [exDesc, exDate, true] : [exDesc, exDate, false];
}
// Defines what happens when we press 'enter' in the console
document.getElementById('todo-textarea').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const [exDesc, exDate, valid] = extractData(e.currentTarget.value);
        // First we gotta extract the date from the string
        // DEBUGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
        taskCache.set(createTodoItem(exDesc, dateToday, exDate, valid), {
            description: exDesc,
            dateCreated: dateToday,
            dateDue: exDate,
        });
        // Clear console
        e.currentTarget.value = '';
        e.currentTarget.style.height = 'auto';
        // Clear overlay
        document.getElementById('todo-overlay').innerHTML = '';
    }
});
// Event delegation to todo-item-area
// Have to use 'as' profusely as a cast in typescript
// On click, remove the item
document.getElementById('todo-item-list').addEventListener('click', (e) => {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        // Register the actual div containing the full thing
        const parent = el.parentNode;
        // Remove the corresponding map value & key pair
        taskCache.delete(parent);
        // Then delete the html
        parent.remove();
    }
});
// On hover, show x
document.getElementById('todo-item-list').addEventListener('mouseover', (e) => {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        el.innerHTML = '&times;';
    }
});
// On not hovering, show bullet
document.getElementById('todo-item-list').addEventListener('mouseout', (e) => {
    const el = e.target;
    if (el.nodeName === 'BUTTON') {
        el.innerHTML = '&bull;';
    }
});
// Code from https://stackoverflow.com/a/42769683/11742422
// getComputedStyle() returns all the css styles on an element,
// document.documentElement literally is the <html> document
// By getting the default size of a rem in px, we can multiply
// a rem value we pass in
function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
// On input to the console
document.getElementById('todo-textarea').addEventListener('input', (e) => {
    // Make sure to resize textarea if needed
    // Code inspired by https://www.geeksforgeeks.org/how-to-create-auto-resize-textarea-using-javascript-jquery/
    // Basically resets the height of the textarea, in which
    // the browser will automatically compute the height of the
    // textarea and put scrollbars on it
    // Then we take advantage of this calculation to find the true
    // scrollheight and set the height to it
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = `${e.currentTarget.scrollHeight -
        convertRemToPixels(2)}px`;
    const renderOverlay = () => {
        document.getElementById('todo-overlay').innerHTML = prompurrCompile(e.currentTarget.value);
    };
    renderOverlay();
    // Register/record this date
    // Then eventually give suggestions on how to type this date
});
// On click of the button show cal
document.getElementById('title-date-time').addEventListener('click', () => {
    if (document.getElementById('calendar-container').style
        .display === 'none') {
        document.getElementById('calendar-container').style.display = 'block';
        hideOnBush(document.getElementsByClassName('center')[0], [
            document.getElementById('todo-imp-container'),
        ]);
    }
    else {
        document.getElementById('calendar-container').style.display = 'none';
    }
});
// On save we're looking to make a server request to write current data
document.getElementById('save-data').addEventListener('click', () => {
    cacheToUser().then((none) => {
        sendHttpRequest('POST', `${window.location.href}data.json`, JSON.stringify(userData));
    });
});
// On load we're looking to make a server request to load json data
document.getElementById('load-data').addEventListener('click', () => {
    // First clear html
    taskCache.forEach((value, key) => {
        // Remove from dom
        key.remove();
        // Delete from cache
        taskCache.delete(key);
    });
    sendHttpRequest('GET', `${window.location.href}data.json`)
        .then((data) => {
        // userData = JSON.parse(data);
        // we don't need JSON.parse if we
        // set the httpRequest.responseType to json
        userData = data;
    })
        .then((res) => cacheTasks())
        .catch((err) => console.log(`file not found: ${err}`));
});
