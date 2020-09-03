# [Prompurr](https://nostalgic-mcclintock-27a65d.netlify.app)

![GitHub last commit](https://img.shields.io/github/last-commit/SpicyRicecaker/Prompurr?logo=Github&style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/SpicyRicecaker/Prompurr?logo=Github&style=flat-square)

A progress-focused adaptive todolist. (Bad name ik I change later)  
Visit the website at https://nostalgic-mcclintock-27a65d.netlify.app!

# Progress Log

[0824 MON](#0824-MON)  
[0827 THU](#0827-THU)  
[0829 SAT](#0829-SAT)  
[0830 SUN](#0830-SUN)  
[0831 MON](#0831-MON)  
[0901 TUE](#0901-TUE)

## 0901 TUE

### IFE

- Keyword highlighting (SIMPLE)
  - Make text in input field transparent
  - Create a `<pre>` tag on top of input that cannot be selected, highlighted, etc.
  - onChange() to input
    - Clone string from inputfield
    - Use our predefined regex function to replace dates/times with `<span>` of colored content
    - set `<pre>` innerHTML to this string
  - _This may look selections look weird tho_
  - Profit
- Data entry (Lots to learn here)
  - Format data in json file
    ```json
    {
      "tasks": [
        {
          "description": "do this",
          "dateCreated": "some date string",
          "dueDate": "some due date string"
        },
        {
          "description": "do this 2",
          "dateCreated": "some date string 2",
          "dueDate": "some due date string 2"
        }
      ]
    }
    ```
  - Change creating task & deleting task behavior
    - Create
      - Make new entry in temp.json file
    - Delete
      - Delete entry in temp.json file
    - Q
      - How do we select which task to delete? Do we assign each task a unique id?
  - Create temporary load & save buttons
    - Save
      - Prompt user to download json?
      - Somehow write json and download that
    - Load
      - Prompt user to select a file
      - Read file & filepath
  - Change rendering behavior
    - Create `render()` function that creates html elements json data using javascript, called on json change

### L/C

- Massively overhauled both js & css readability + modularity
  - generateCalendar() now includes a changeTableFunction() to call on month change
  - scss now makes use of mixins and extends
- Completed calendar change months + dates!
- Completed clock function! **It may not be very accurate**
- hideOnBush() includes optional exception parameters, allowing for multiple elements to be listening to the document at the same time and resolving console + calendar bugs
- Completed time buttons! **Giving up on autocomplete/hint/placeholder text for the moment lol, but exploring the next IFEs may provide insight**

## 0831 MON

### IFE

- Need to change months of calendar
  - Store some kind of date variable with the calendar
  - onclick generate calendar passing in newDate() with m +- 1
  - Remove current calendar then append new
- Still need to make date/time button dynamic
  - Probably create a `tickRender()` function that updates date/time as well as display
  - Thinking of using `requestAnimationFrame()` along with that
- For time button
  - Right under calendar
  - 3 flexbox sections
  - 11:59p & 12:00p defaults
  - third box for now will be placeholder text with e.g. '12:34p'
- For data registry
  - Very expensive theoretical regex function `((January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2}|\d{1,2}:\d{2}[pa])`
  - Then we would just take the matched string and create a new date, correlate that with the todo-item somehow
- _CSS files are getting very messy_
  - Find someway to organize them

### L/C

- **Right click on bottom bar in VSCode and make sure prettier is checked.**
  - This way you'll be able to check prettier log. Sometimes prettier can't format if there's an error in the file
- Actually good-looking calendar achieved!

## 0830 SUN

- Switching from focusout() to just scanning the whole doc while focused, as inspired by [this](https://stackoverflow.com/a/3028037/11742422) stack overflow user
  - Yesterday's 3+ hours of work were useless fffff

### IFE

- Still maybe add date/time to center of nav bar
- Add arrow keys for calendar
- Maybe add some clock UI
- Then we kind finally move into data

## 0829 SAT

- Probably have date/time in the center of the nav bar, that's where the clock & time will drop down from
- Make calendar clickable & input date into console
- Make some kind of clock to input time into console
- Create arrow keys for the calendar, to move forward / back months

## 0827 THU

### Ideas for expansion

- Actual syntax for todo item will just be something like `Do this Aug 21 11:59p`
- But the actual list item will turn into `by today at midnight` or `by tomorrow` or `in 3 days`.
- For now we'll just have a `ol` for the path, nothing fancy, but it's gotta update live
- Syntax highlighting for terms like `aug 27`, `827`, `@`, `11:59pm`
- Call some sort of dictionary that highlights _verbs_
- Basic timeline with time as current location and a single chain of objectives
- Save todo list into prompurr.data file

### Learned

- Made first stack overflow post [here](https://stackoverflow.com/a/63627476/11742422), can finally upvote
- Installed _Powershell 7_ so we can easily run commands in parallel with the `&` symbol. Finished setting up `npm run watch` command to watch both `.ts` and `.scss` files. Courtesy of [this](https://stackoverflow.com/a/62578742/11742422) stack overflow post
- Typescript!!!
- Finally using `.scss` to compile into `.css`, added `sass-compile.bat` which basically does this live while running
- Event Delegation
- Template Tag
  - Need to call `.content` if you don't want to copy the template itself as well
- Event Delegation
  - Add event for multiple elements once with support for adding new children
  - Basically just addEventListener to the parent element, then make use of the `.target` attribute
  - Check target identity using `.nodeName`

## 0824 MON

- Finally added `node_modules` to the `.gitignore` file, long overdue! Install dependencies in `package.json` with `npm install`
- `--save-dev` is used for node packages that are not needed for the end user
- Actually read about how to install [prettier](https://www.npmjs.com/package/prettier) and [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) on their respective websites, the installation via npm makes a lot more sense now
- Updated basic website [layout](https://www.youtube.com/watch?v=fdJMM5lIKNM)!
- Turned on auto save so we don't waste over 9000 keystrokes on `:w`
- Finally figured out that the github buttons are called [shields](https://shields.io/), added commit & repo size shields
