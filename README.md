# Prompurr

![GitHub last commit](https://img.shields.io/github/last-commit/SpicyRicecaker/Prompurr?logo=Github&style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/SpicyRicecaker/Prompurr?logo=Github&style=flat-square)

A progress-focused adaptive todolist. (Bad name ik I change later)

# Progress Log

[0824 MON](#0824-MON)  
[0827 THU](#0827-THU)
[0829 SAT](#0829-SAT)
[0830 SUN](#0830-SUN)

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
