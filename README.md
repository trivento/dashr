# Dashr

## Overview

Dashr is a monitoring tool for Jenkins builds

## Prerequisites

- a Jenkins server
- a big monitor/television


### Git

- A good place to learn about setting up git is [here][git-github]
- Git [home][git-home] (download, documentation)

### Node.js and Tools

- Get [Node.js][node-download].
- Install the tool dependencies (`npm install`)

## Installation of Dashr
Dashr is a monitoring tool using data from jenkins rest api. By entering a valid url 
the data of your project can be visualised with your own preferences.


## Workings of Dashr

- The application filesystem layout structure is based on the [angular-seed] project.
- There is no dynamic backend (no application server) for this application. Instead we fake the
  an application server by fetching static json files.
- Read the Development section at the end to familiarize yourself with running and developing
  an angular application.
  
## Depth
  The url that is used can change in depth. Using depth 0 returns less information then a
  higher depth, and is therefor faster. The depth is given in the url, for example: 
  
  https://ci.jenkins-ci.org/view/All/api/json?pretty=true&depth=0      <---Change depth here
  
## Preferences
  When using depth 0 the only information that can be displayed is the status and the name of a job. The rest will return 'none'.
  When using depth 1 a lot more information is available. In preferences.js each piece of information
  can be set to 'show' or 'hide'.
  Other preferences:
  -fontSize:
  	Values: 			["s", "m", "l"] (small, medium, large)
  	Description: 		Scales all text
  -HRSize:
  	Values: 			["s", "m", "l"] (small, medium, large)
  	Description: 		Scales the health report image.
  -BoxesInline
  	Values:				[1, 2, 3, 4, 6, 12]
  	Description:		Defines how many boxes will be displayed horizontally 1, 2, 3, 4, 6 or 12
  -boxHeight
  	Values: 			[0..infinite]
  	Description:		Sets the height for all boxes


## Development with angular-phonecat

The following docs describe how you can test and develop further this application.


### Installing dependencies

The application relies upon various node.js tools, such as Bower, Karma and Protractor.  You can
install these by running:

```
npm install
```

This will also run bower, which will download the angular files needed for the current step of the
tutorial.

Most of the scripts described below will run this automatically but it doesn't do any harm to run
it whenever you like.

### Running the app during development

- Navigate to the project folder in the command line
- Run `npm start`
- Navigate your browser to `http://localhost:8000/app/index.html` to see the app running in your browser.
- When the data keeps loading there might be a problem with authentication. When this message pops up in console: 
  "No 'Access-Control-Allow-Origin' header is present on the requested resource." the CORS requests must be enabled in the browser.

## Contact