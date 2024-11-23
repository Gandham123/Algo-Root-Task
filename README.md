Demo Video Link :  https://drive.google.com/drive/folders/16CIRNm3XEpwm7XuQFhXa2ZjZBSBa917t

Features and Functionality
1) Add Tasks:
Users can input a task title and description.
If either field is left empty, an error message is displayed, prompting users to complete the input before submission.
Clicking the "Add" button sends the task to the backend, where it is securely stored in the MongoDB database.
Newly added tasks appear under the "Pending Tasks" tab.


2) Pending Tasks Management:
Each pending task displays:
A human-readable timestamp, indicating how long ago it was created (e.g., "5 minutes ago").
Options to:
Edit: Users can update the task's title or description, with changes reflected both on the frontend and in the backend database.
Delete: Tasks can be permanently removed, with the operation synchronized with the backend.

3) Task Completion:
Users can mark tasks as completed.
Completed tasks are automatically moved to the "Completed Tasks" tab, maintaining a clear distinction between ongoing and finished work.

4) Completed Tasks Management:
Completed tasks are displayed in a separate tab, offering a view of accomplishments.
Users can also remove completed tasks permanently, with changes reflected in the database.


5) Validation and Error Handling:
Frontend Validation: Input fields (title and description) are validated to ensure they are not empty. Error messages guide users to enter valid data.
Server-Side Error Management:
All server-side errors, such as database connection issues or invalid requests, are handled gracefully.
Users receive appropriate error messages for any failed operations, ensuring a smooth user experience.


Technical Stack
Frontend: React.js for building a responsive and interactive user interface.
Bootstrap for a modern and mobile-friendly design.


Backend:
Node.js and Express.js for handling server-side logic, API endpoints, and business logic.
MongoDB for managing task data, including timestamps and task status.


Core Functionality:
Create: Add tasks with validation.
Read: Fetch tasks for pending and completed views, including timestamps.
Update: Edit tasks or mark them as completed.
Delete: Remove tasks from both pending and completed lists.


Workflow

Adding a Task: Users input a title and description. Valid tasks are added to the Pending Tasks tab and stored in the database. Invalid submissions display an error.

Managing Pending Tasks:Tasks can be edited or deleted, with real-time updates to the frontend and backend.
Each task displays a relative timestamp showing when it was created.

Marking Tasks as Completed: Users can mark tasks as completed, moving them from Pending to Completed.

Managing Completed Tasks: Users can review and delete completed tasks as needed.


Outcome:
This To-Do Application delivers an efficient and user-friendly solution for task management. Its key strengths include:

Dynamic task tracking with pending and completed categories.
Input validation and error management to ensure smooth operation.
Full CRUD functionality, with seamless integration of the frontend and backend.
Robust handling of both user and server-side errors, ensuring reliability and a positive user experience.
