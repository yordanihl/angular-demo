# Installation and running
- Run `npm i` from both the project folder and the `/api-server` directory.
- In a sepaarte terminal, run `node server.js` from the `/api-server` directory.
- Run `npm start` from the project folder.

# Description
Displays tasks in List view and Table view.

## Table view
- Utilizes [Angular Data Grid](https://ag-grid.com/) to allow tasks to be sorted and filtered.
- Tasks may be edited by double-clicking on a cell.

## List view
- Displays the tasks in a vertical list.
- New tasks may be added via the form at the bottom.
- Tasks may be rearranged via drag and drop.
- Clicking on a task brings up a popup with the task's extra information, as well as the buttons for editing and deletion of the task.
- Editing a task uses the form that is already visible. Clicking the Edit button on the popup fills the form with the task's details and converts the 'Add' button into an 'Edit' button. This process can be reverted by clicking the newly created 'Cancel' button next to the 'Edit' button below the form.
- The form cannot be submitted unless both fields are filled. The empty fields are surrounded by a red border.