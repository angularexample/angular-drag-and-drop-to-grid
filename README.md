# angular-drag-and-drop-to-grid
**Angular Drag and Drop to Grid** is an Angular 8 example application to show how to do drag and drop from a list to a grid.

The Angular docs show how to do drag and drop from one array list to another array list that has the same structure.
 
But... I have not seen anywhere else how to do **drag and drop to a table or grid**, since the drop destination has a different and more complex structure.

Created by **AngularExample** [https://github.com/angularexample](https://github.com/angularexample)

The full source code is available at: [https://github.com/angularexample/angular-drag-and-drop-to-grid](https://github.com/angularexample/angular-drag-and-drop-to-grid)

## Running Example

Click for running example:

[angular-drag-and-drop-to-grid](https://angularexample.github.io/angular-drag-and-drop-to-grid)

### Screen Shot

![drag-and-drop-to-grid](https://github.com/angularexample/angular-drag-and-drop-to-grid/blob/master/src/assets/images/drag-and-drop-to-grid.png)

## Table of Contents
- [About The Author](#about-the-author)
- [Project Setup](#project-setup)
  * [Prerequisites](#prerequisites)
  * [How To Install](#how-to-install)
  * [How To Run](#how-to-run)
- [Software Libraries Used](#software-libraries-used)
- [Drag and Drop Requires Angular 7 and CDK](#drag-and-drop-requires-angular-7-and-cdk)
- [Drop To A Custom Location](#drop-to-a-custom-location)
  * [Combine MouseUp with Drop Events](#combine-mouseup-with-drop-events)
  
  
## About The Author

**JC Lango** is a UI Architect and UI Developer for large scale web applications at several Fortune 500 companies.

He is an expert in **Angular**, **Polymer**, and **React** and maintains these sites at Github:

* **AngularExample** [https://github.com/angularexample](https://github.com/angularexample)
* **PolymerExample** [https://github.com/polymerexample](https://github.com/polymerexample)
* **ReactJSExample** [https://github.com/reactjsexample](https://github.com/reactjsexample)

JC may be available to work remote, and can be contacted at these links:
 
* LinkedIn: [https://www.linkedin.com/in/jclango](https://www.linkedin.com/in/jclango)
* Email: [jobs@jclango.com](mailto:jobs@jclango.com)

## Project Setup

### Prerequisites

You need to have Node and NPM installed on your PC.

[Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### How To Install

Download the source code using git or else download and unzip the zip file.

Open a terminal window and go to the project root folder.

You need to have npm installed globally.

Run `npm i` to install the required libraries.

### How To Run

Run `ng serve` for a dev server.

Navigate to `http://localhost:4200/`.

The browser will automatically reload if you change any of the source files.

## Software Libraries Used

The following software libraries are used:
```text
Angular 8
Angular Material 8
Angular CDK 8
```

## Drag and Drop Requires Angular 7 and CDK

*Drag and Drop* was introduced beginning with *Angular 7*.

The example here is written in *Angular 8*.

*Drag and Drop* is actually part of *Angular CDK*, which is part of *Angular Material*.
**Angular Material CDK** is the Component Dev Kit. See https://material.angular.io/cdk 

To use *Drag and Drop*, you need to install *Angular Material* and *Angular CDK*.
The instructions are at https://material.angular.io/guide/getting-started 

The Angular documentation on *Drag and Drop* is at https://material.angular.io/cdk/drag-drop

## Drop To A Custom Location

The Angular documentation shows how to drag and drop from 2 array lists that have the same structure.

But how do you drop to something different, like a to a table or a grid?

I could not find any documentation on how to do a complex or custom *Drag and Drop*.

After hitting a brick wall on this, I decided to think outside the box.

### Combine MouseUp with Drop Events

The solution shown here is to combine the normal *Drag and Drop* "dropped" event,
with the browser's *mouseup* event.

It turns out that, when you examine these events in Chrome Developer Tools,
the *Drag and Drop* "dropped" event occurs first, followed by the *mouseup* event.

The key to this solution, is to somehow combine or link these 2 events,
so that you can know that the mouseup is happening immediately after the *dropped* event.

We also need to capture the data from the *dropped* event, so we know which item was dragged.

---
