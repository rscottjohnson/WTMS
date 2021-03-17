# Web Task Management System (WTMS)
WTMS is a web based task management application that a team of developers could utilize to create, edit, track the completion of, and delete tasks as part of a workgroup. 

- [Web Task Management System (WTMS)](#web-task-management-system-wtms)
  - [Project Motivation](#project-motivation)
  - [Project setup](#project-setup)
    - [Running the Application (for my local environment)](#running-the-application-for-my-local-environment)
    - [Working with the MongoDB Database](#working-with-the-mongodb-database)
  - [Development Notes](#development-notes)
    - [Phase 1](#phase-1)
      - [MongoDB](#mongodb)
    - [Phase 2](#phase-2)
      - [Build Main UI](#build-main-ui)
        - [Incorporating Bootstrap](#incorporating-bootstrap)
        - [Adding `styles.css`](#adding-stylescss)

## Project Motivation
WTMS is the project chosen for use as a means of applying the concepts learned in the East Carolina University (ECU) CSCI 6600 *Database Management System* course.

## Project setup
### Running the Application (for my local environment)
Start MongoDB:
**Note:** Followed the steps in *Tolumide's* answer on [this StackOverflow discussion](https://stackoverflow.com/questions/58283257/mongodb-cant-find-data-directory-after-upgrading-to-mac-os-10-15-catalina) to get around mongo's `data/db` error.  Running `mongod` by itself still doesn't work, but this could be an aliasing issue to look into later.
```
mongod --dbpath=/System/Volumes/Data/data/db
```
Start the server:
```
npm run dev
```
Start the client:
```
npm run serve
```
### Working with the MongoDB Database
To access the MongoDB database:
```
sudo mongo
```
Show MongoDB databases:
```
show dbs
```
Switch to the database:
```
use wtms-db
```
List the current database users:
```
db.users.find().pretty()
```
## Development Notes
### Phase 1
#### MongoDB
* Start MongoDB with `brew services start mongodb-community@4.4`.
* Use `brew services list` to verify that MongoDB is running.
* Stop MongoDB with `brew services stop mongodb-community@4.4`.
* Once MongoDB is running, enter MongoDB shell by running `mongo` in a new terminal window.

### Phase 2
#### Build Main UI
##### Incorporating Bootstrap
Incorporated bootstrap css via:
```
npm install bootstrap --save
```
and then installed peer dependencies via (after referencing [this StackOverflow discussion](https://stackoverflow.com/questions/46053414/npm-warn-requires-a-peer-of-but-none-is-installed-you-must-install-peer)):
```
npm install --save "jquery@1.9.1 - 3"
```
```
npm install --save "popper.js@^1.16.1"
```
Finally, incorporated them into `main.js` by (after referencing [this StackOverflow discussion](https://stackoverflow.com/questions/42684661/adding-bootstrap-to-vue-cli-project)):
```
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
```
Finding that **Safari is not able to see the bootstrap test items, whereas Chrome is**.
##### Adding `styles.css`
Incorporated the self created `styles.css` by adding `@import './assets/css/style.css';` to `App.vue` (after referencing [this StackOverflow discussion](https://stackoverflow.com/questions/43784202/how-to-include-css-files-in-vue-2).
