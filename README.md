
# **To-Do Task Management Application**  

## **Demo Video**  
https://drive.google.com/drive/folders/16CIRNm3XEpwm7XuQFhXa2ZjZBSBa917t  

---

## **Features & Functionality**  

### **1. Add Tasks**  
- Users can enter a task **title** and **description**.  
- If either field is empty, an **error message** is displayed, preventing submission.  
- Clicking the **"Add"** button sends the task to the **backend**, where it is stored in a **MongoDB database**.  
- The newly added task appears under the **"Pending Tasks"** tab.  

### **2. Pending Tasks Management**  
Each pending task displays:  
- A **human-readable timestamp** (e.g., "5 minutes ago").  
- Options to:  
  - **Edit**: Modify the task title or description, with changes updated in both the frontend and database.  
  - **Delete**: Remove tasks permanently from both the frontend and database.  

### **3. Task Completion**  
- Users can mark tasks as **completed**, moving them to the **"Completed Tasks"** tab.  
- This maintains a clear separation between **ongoing** and **finished** tasks.  

### **4. Completed Tasks Management**  
- Completed tasks are displayed in a separate **"Completed Tasks"** tab.  
- Users can **permanently delete** completed tasks, with changes reflected in the database.  

### **5. Validation & Error Handling**  
- **Frontend Validation**: Ensures both **title** and **description** fields are filled before submission.  
- **Error Messages**: Guide users to enter valid data.  
- **Server-Side Error Handling**: Manages issues like database connection failures or invalid requests, displaying appropriate messages for a smooth user experience.  

---

## **Technical Stack**  

### **Frontend**  
- **React.js** – Builds an interactive and responsive user interface.  
- **Bootstrap** – Provides a modern, mobile-friendly design.  

### **Backend**  
- **Node.js & Express.js** – Handles server-side logic, API endpoints, and business logic.  
- **MongoDB** – Manages task data, including timestamps and task status.  

---

## **Core Functionality**  

✅ **Create**: Add tasks with input validation.  
✅ **Read**: Fetch pending and completed tasks with timestamps.  
✅ **Update**: Edit tasks or mark them as completed.  
✅ **Delete**: Remove tasks from both pending and completed lists.  

---

## **Workflow**  

1. **Adding a Task**  
   - Users enter a **title** and **description**.  
   - **Valid** tasks are added to the **Pending Tasks** tab and stored in the database.  
   - **Invalid** submissions trigger an error message.  

2. **Managing Pending Tasks**  
   - Tasks can be **edited** or **deleted**, with real-time updates in both frontend and backend.  
   - Each task shows a **relative timestamp** indicating when it was created.  

3. **Marking Tasks as Completed**  
   - Users can move tasks from **Pending** to **Completed** with a single action.  

4. **Managing Completed Tasks**  
   - Users can review and **delete** completed tasks as needed.  

---

## **Outcome**  

This **To-Do Application** provides an **efficient** and **user-friendly** solution for task management.  

🔹 **Dynamic task tracking** with pending and completed categories.  
🔹 **Robust input validation** and **error handling** for a seamless experience.  
🔹 **Full CRUD functionality**, ensuring smooth integration between frontend and backend.  
🔹 **Reliable performance**, with effective management of both **user and server-side errors**.  

Would you like any modifications or additional details? 😊
