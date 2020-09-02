let dateToday: Date;

const elementIds: string[] = [
  'todo-add',
  'todo-imp-container',
  'todo-input',
  'todo-area',
  'todo-item-area',
  'todo-item-template',
  'calendar-template',
  'todo-item-list',
  'title-date-time',
];
const element = new Map<string, HTMLElement>();

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

// function replaceElement(toReplace: HTMLElement, toAppend: HTMLElement) {
//   const p = toReplace.parentElement;
//   toReplace.remove();
//   p.appendChild(toAppend);
// }

// Generates a calendar (+6 months soon) based off today's date & some other date
function generateCalendar(currentDate: Date, visible: boolean): HTMLElement {
  const someDate = new Date();
  Object.assign(someDate, currentDate);
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
  const documentFragment = document.importNode(
    (element.get('calendar-template') as HTMLTemplateElement).content,
    true,
  );
  // We need to actually target the section because for some reason the importnode just imports
  // a document fragment
  const calendarSection = documentFragment.querySelector('section');
  const table = calendarSection.querySelector(
    '.calendar-table',
  ) as HTMLTableElement;
  // Numbers for currentdate
  const cy = currentDate.getFullYear();
  const cm = currentDate.getMonth();
  // Our current day cell
  let cell: HTMLTableCellElement;
  // Numbers for somedate
  let y: number;
  let m: number;
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
    calendarSection.querySelector(
      '.calendar-header',
    ).innerHTML = `${monthNames[m]} ${y}`;
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
        } else {
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
  calendarSection.addEventListener('click', function inputDateConsole(
    e: MouseEvent,
  ) {
    // Make sure the the element that was selected was a td element
    const el = e.target as HTMLElement;
    if (el.nodeName === 'TD') {
      // Make sure that the date isn't null
      // (We should really add the previous & future
      // month dates greyed out...)
      if (el.innerHTML !== '&nbsp;') {
        // Append the month and date to our juicy console rn
        (element.get(
          'todo-input',
        ) as HTMLInputElement).value += ` ${monthNames[m]} ${el.innerHTML}`;
      }
    }
    // May change later
    // KEEP FOCUSING THE TEXTBOX CHARLESTON
    element.get('todo-input').focus();
  });
  // Also add event listeners to the buttons that will call generate calendar with a new date if needed
  calendarSection
    .querySelector('#calendar-arrow-left')
    .addEventListener('click', () => {
      someDate.setMonth(m - 1);
      cell.setAttribute('id', '');
      updateTableAndHeader();
      // replaceElement(
      //   calendarSection,
      //   generateCalendar(newSomeDate, currentDate, true),
      // );
    });
  calendarSection
    .querySelector('#calendar-arrow-right')
    .addEventListener('click', () => {
      someDate.setMonth(m + 1);
      cell.setAttribute('id', '');
      updateTableAndHeader();
      // replaceElement(
      //   calendarSection,
      //   generateCalendar(newSomeDate, currentDate, true),
      // );
    });
  calendarSection
    .querySelector('#calendar-reset')
    .addEventListener('click', () => {
      someDate.setMonth(cm);
      someDate.setFullYear(cy);
      updateTableAndHeader();
      // replaceElement(
      //   calendarSection,
      //   generateCalendar(newSomeDate, currentDate, true),
      // );
    });
  calendarSection
    .querySelector('#calendar-time-noon')
    .addEventListener('click', () => {
      (element.get('todo-input') as HTMLInputElement).value += ' 12:00p';
    });
  calendarSection
    .querySelector('#calendar-time-midnight')
    .addEventListener('click', () => {
      (element.get('todo-input') as HTMLInputElement).value += ' 11:59p';
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

function init() {
  updateDate();
  // Generate calendar then append it
  document
    .getElementsByClassName('dropdown')[0]
    .appendChild(generateCalendar(dateToday, false));
}

init();

function updateClock() {
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
    document.getElementById(
      'title-date-time-label',
    ).innerHTML = `${hourTwelve}:${minuteZero}${modS} ${monthS} ${dateS}`;
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
  element.get('todo-input').style.display = 'none';
  element.get('todo-add').style.display = 'block';
  // Probably remove calendar as well
  document.getElementById('calendar-container').style.display = 'none';
}

// Hides an element when you click somewhere else.
// Takes in an element as a parameter, then
// sets up event listeners that are automatically disposed of
// when the element is closed
function hideOnBush(toHide: HTMLElement, exceptions?: Array<Element>) {
  const scanForClicks = (e: MouseEvent) => {
    // e.stopPropagation();
    // If the element to hide does not include the clicked element
    if (exceptions !== undefined) {
      for (let i = 0; i < exceptions.length; i += 1) {
        if (exceptions[i].contains(e.target as Node)) {
          return;
        }
      }
    }
    if (!toHide.contains(e.target as Node)) {
      // Hide the element/place your function here
      handleFocus();

      // Cleanup the costly document event listener
      document.removeEventListener('click', scanForClicks);
    }
  };

  document.addEventListener('click', scanForClicks);
}

function openConsole(e: MouseEvent) {
  e.stopImmediatePropagation();
  // Replace button with console
  element.get('todo-add').style.display = 'none';
  element.get('todo-input').style.display = 'block';
  // Focus console
  element.get('todo-input').focus();
  // Show calendar
  document.getElementById('calendar-container').style.display = 'block';
  // Define hide behavior
  hideOnBush(element.get('todo-imp-container'), [
    document.getElementsByClassName('center')[0],
  ]);
}

// Defines default add-todo clicked button behavior true
element
  .get('todo-add')
  .addEventListener('click', (e: MouseEvent) => openConsole(e));

// Defines what happens when we press 'enter' in the console
element
  .get('todo-input')
  .addEventListener('keydown', function createTodoItem(
    this: HTMLInputElement,
    e: KeyboardEvent,
  ) {
    if (e.key === 'Enter') {
      // Create a new div based on the current values via template
      const tmp = document.importNode(
        (element.get('todo-item-template') as HTMLTemplateElement).content,
        true,
      );
      // Select the span element inside and set it equal to the console
      tmp.querySelector('.todo-item-value').innerHTML = this.value;

      // Clear console
      (element.get('todo-input') as HTMLInputElement).value = '';
      // Append div to document
      element.get('todo-item-list').appendChild(tmp);
    }
  });

// Event delegation to todo-item-area
// Have to use 'as' profusely as a cast in typescript
// On click, remove the item
element
  .get('todo-item-list')
  .addEventListener('click', function removeTodoItem(e: MouseEvent) {
    const el = e.target as HTMLElement;
    if (el.nodeName === 'BUTTON') {
      (el.parentNode as HTMLElement).remove();
    }
  });

// On hover, show x
element
  .get('todo-item-list')
  .addEventListener('mouseover', function showTimes(e: MouseEvent) {
    const el = e.target as HTMLElement;
    if (el.nodeName === 'BUTTON') {
      el.innerHTML = '&times;';
    }
  });

// On not hovering, show bullet
element
  .get('todo-item-list')
  .addEventListener('mouseout', function showBull(e: MouseEvent) {
    const el = e.target as HTMLElement;
    if (el.nodeName === 'BUTTON') {
      el.innerHTML = '&bull;';
    }
  });

// On input to the console
element
  .get('todo-input')
  .addEventListener('change', function updateSemantics(this: HTMLInputElement) {
    // Register/record this date
    // Then eventually give suggestions on how to type this date
  });

// On click of the button show cal
document
  .getElementById('title-date-time')
  .addEventListener('click', function showHideCal() {
    if (
      document.getElementById('calendar-container').style.display === 'none'
    ) {
      document.getElementById('calendar-container').style.display = 'block';
      hideOnBush(document.getElementsByClassName('center')[0] as HTMLElement, [
        document.getElementById('todo-imp-container'),
      ]);
    } else {
      document.getElementById('calendar-container').style.display = 'none';
    }
  });
