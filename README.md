# Animaldex

The purpose of this project is to demonstrate what I have learned during the Code Louisville Full-Stack
JavaScript (FSJS) course. The project is an Animal directory where kids can track animals they have 
learned about and/or see in a CRUD application. This means that it will allow the user to create,Read, 
Update, and Delete information. The information will be persistent through a MongoDB hosted on mLab.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Visual Studio Community 2017
* Node.js (Preferably at least 10.5.0)
* A Command line program like Terminal (Mac) or Command Prompt (Windows)
* A browser (tested with Google Chrome, IE, Edge and FireFox)

### Installing
1. Download the project files.
2. Paste the .env file into the root folder of the project.
3. Install Visual Studio Community 2017.
4. Update Visual Studio Community 2017.
5. Install Node.js if not already installed. See 'Notes' section for install instruction links.
6. Open a command line program.
7. Check that Node.js and NPM are installed by typing 'npm -v' and 'node -v' into your command line program. 
In both cases you should get some text displaying a version number.
8. Using cd commands navigate to the root folder of the program.
9. Type 'npm install' in your command line program so it will install the dependencies for the program.
10. Type 'node app' to start the program running. See 'Notes' section if you expreience issues loading the app here.
11. Navigate to [http://localhost:4242](http://localhost:4242) in a browser window. You should now be at the home page of the program. See 'Notes' section if you have issues loading this in a particular browser.

## Built With
* [JavaScript](https://www.javascript.com/learn/strings) - The programming language meant to be at the focus of this project.
* [Node.js](https://nodejs.org/en/) - A JavaScript runtime that helps execute JavaScript code server side.
* [jQuery](http://jquery.com) - A JavaScript library that helps with visual features and document transversal.
* [Express](https://expressjs.com) - A Node.js web application framework
* [Bootstrap 3.3.7](http://getbootstrap.com/docs/3.3/) - A HTML, CSS, and JS Framework used for some visual customization and responsive features of the program.
* [Nodemon](https://nodemon.io) - Monitors changes in the program and reloads it so you don't have to after every change.
* [Pokemon Font](https://fontmeme.com/fonts/pokmon-font/) - A font inspired by the Pokemon franchise.
* [PUG](https://pugjs.org/api/getting-started.html) - A templating engine.
* [Technology](doc link) - Description

## Notes
### Installing Node.js
Instructions for installing Node.js can be found [here for Windows](http://treehouse.github.io/installation-guides/windows/node-windows.html), or [here for Mac](http://treehouse.github.io/installation-guides/mac/node-mac.html).
###Install Nodemon
If you encounter some errors, when you type 'node app' in your command line tool, you may need to type 'npm install nodemon -g' to install Nodemon.
###Issues with Browsers
If you go to load the app in Chrome and it refuses to load citing a security issue or protocol issue, try loading it by going to [127.0.0.1:4242](http://127.0.0.1:4242) instead of localhost:4242. In IE, you can load it with localhost:port or the ip:port combination, but you may have to manually type http:// before it before it will load. No issues were experienced with Firefox during testing, but that does not mean they will not introduce something to cause the same issues soon.

## Authors

* **[EGrayTech](https://github.com/EGrayTech)** - *Initial work*

## Acknowledgments

* Include various acknowledgements.