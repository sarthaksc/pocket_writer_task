🚀 Getting Started

This project is a Next.js starter integrated with Firebase Studio. Follow the steps below to set up and run the project locally.

📋 Prerequisites

Ensure you have the following installed:

Node.js (version 18 or higher)

Firebase CLI (for Firebase-related operations)


Install the Firebase CLI globally:

npm install -g firebase-tools

📦 Installation

1. Clone the repository:

git clone https://github.com/sarthaksc/pocket_writer_task.git
cd pocket_writer_task


2. Install dependencies:

npm install


3. Set up Firebase:

Login to Firebase:

firebase login

Initialize Firebase in the project:

firebase init

During initialization:

Select the Firebase features you want to set up (e.g., Hosting, Firestore).

Associate the project with your Firebase project.

Configure the public directory (e.g., out for Next.js).

Set up as a single-page app if applicable.


Configure Firebase SDK:

If not already present, create a firebaseConfig.js file in your project and add your Firebase configuration:

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

Replace the placeholders with your actual Firebase project credentials, which you can find in your Firebase project settings.



4. Run the development server:

npm run dev

Open http://localhost:3000 in your browser to view the application.



🚀 Deployment

To deploy the application to Firebase Hosting:

1. Build the Next.js application:

npm run build


2. Export the application (if using static export):

npm run export

Ensure that the out directory is specified as the public directory during Firebase initialization.


3. Deploy to Firebase:

firebase deploy

Your application will be deployed to the Firebase Hosting URL provided in the CLI output.



