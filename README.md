🚀 **Getting Started**

This project is a Next.js starter integrated with Firebase Studio. Follow the steps below to set up and run the project locally.

📋** Prerequisites**
Ensure you have the following installed:

Node.js (version 18 or higher)

Firebase CLI (for Firebase-related operations)

Install the Firebase CLI globally:

```bash
npm install -g firebase-tools
```
📦 **Installation**
Clone the repository:

```bash
git clone https://github.com/sarthaksc/pocket_writer_task.git
cd pocket_writer_task
```
**Install dependencies**:

```bash
npm install
```
**Set up Firebase**:

  -**Login to Firebase**:

```bash
firebase login
```
  -**Initialize Firebase in the project**:

```bash
firebase init
```
  -**During initialization**:

  1.Select the Firebase features you want to set up (e.g., Hosting, Firestore).

  2.Associate the project with your Firebase project.

  3.Configure the public directory (e.g., out for Next.js).

  4.Set up as a single-page app if applicable.

  -**Configure Firebase SDK**:

If not already present, create a firebaseConfig.js file in your project and add your Firebase configuration:

```javascript
// firebaseConfig.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export default firebaseConfig;
```
Replace the placeholders with your actual Firebase project credentials, which you can find in your Firebase project settings.

  -**Run the development server**:

```bash
npm run dev
Open http://localhost:3000 in your browser to view the application.
```

🚀 **Deployment**

To deploy the application to Firebase Hosting:

-Build the Next.js application:

```bash
npm run build
```
-Export the application (if using static export):

```bash
npm run export
```
Ensure that the out directory is specified as the public directory during Firebase initialization.

-Deploy to Firebase:

```bash
firebase deploy
```
Your application will be deployed to the Firebase Hosting URL provided in the CLI output.

