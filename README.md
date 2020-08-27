# Prompurr

![GitHub last commit](https://img.shields.io/github/last-commit/SpicyRicecaker/Prompurr?logo=Github&style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/SpicyRicecaker/Prompurr?logo=Github&style=flat-square)

A progress-focused adaptive todolist. (Bad name ik I change later)

# Progress Log

[0824 MON](#0824-MON)  
[0827 THU](#0827-THU)

## 0827 THU

### Ideas for expansion

- Syntax highlighting for terms like `aug 27`, `827`, `@`, `11:59pm`
- Call some sort of dictionary that highlights *verbs*
- Basic timeline with time as current location and a single chain of objectives
- Save todo list into prompurr.data file

### Learned

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
