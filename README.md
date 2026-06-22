# 📚 PrepWise AI - Smart Study Planner

> **Live Demo:** [https://prepwise-lite-five.vercel.app/]

PrepWise AI is a full-stack Next.js application designed to help students generate, manage, and track personalized exam study schedules. 

Built from the ground up, this application features a completely custom, secure backend architecture that ties generated study plans directly to individual user accounts using robust cryptography and relational database mapping.

---

## ✨ Key Features

* **Smart Study Generation:** Users can input specific subjects and topics to instantly generate structured, actionable, and personalized study plans.
* **AI Integration:** Powered by the **Groq API** for lightning-fast, intelligent analysis of study requirements to output optimized daily schedules.
* **Database Driven:** Seamlessly saves and retrieves user-generated study plans using a PostgreSQL database managed via Prisma ORM.
* **Modern Architecture:** Utilizes Next.js 14 App Router and Server Actions for fast, server-side data fetching and form mutations.
* **Responsive UI:** A sleek, dark-mode interface built completely from scratch using Tailwind CSS.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 14 (App Router), React, Tailwind CSS
* **Backend:** Next.js Server Actions & API Routes
* **Database:** Supabase (PostgreSQL), Prisma ORM
* **Security:** `jsonwebtoken`, `bcryptjs`, Next.js Edge Middleware
* **Deployment:** Vercel

---

## 💻 Running the Project Locally

To run PrepWise AI on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/YourUsername/YourRepoName.git](https://github.com/YourUsername/YourRepoName.git)
cd YourRepoName
```
### 2. Install dependencies
```Bash

npm install
```
### 3. Configure Environment Variables

Create a .env file in the root directory. You will need to provision your own PostgreSQL database (Supabase is recommended).
Code snippet

##### Database connection string from Supabase
###### DATABASE_URL="postgresql://postgres.[your-id]:[your-password]@[aws-0-eu-central-1.pooler.supabase.com:6543/postgres](https://aws-0-eu-central-1.pooler.supabase.com:6543/postgres)"

##### AI Integration
###### GROQ_API_KEY="your_groq_api_key_here"

### 4. Initialize the Database

Push the Prisma schema to your PostgreSQL database to construct the User and StudyPlan tables, and establish their foreign key relationships.
Bash
```bash
npx prisma db push
```
### 5. Start the Development Server
```Bash

npm run dev
````

👤 Author

Mithra Xavier

    Full-Stack Developer
