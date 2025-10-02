# WEBINARS CATALOG – Client Side

This application was built as part of a Technical Case for a Junior Full Stack Web Developer position.  
The objective was to build a Webinar Catalog Application where users can browse webinars and enroll by submitting a form with name, email, and LinkedIn URL.

---

## 🚀 Running Locally

Run the commands below in a Git Bash terminal:

```bash
mkdir client
cd client
git clone https://github.com/victorgfz/webinars_catalog_client.git .
npm install
```

Create a `.env` file and configure the environment variables:

```
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

Then run:

```bash
npm run dev
```

---

## 🏗️ Architecture

For the client side of the application, I tried to organize the components in a way that makes them reusable and keeps the UI separated from the business logic.
There are three kinds of components:

- **shared/ui**: these components mainly receive data via props and are mostly responsible for styling and presentation.
- **container**: these components are responsible for grouping other components and also for fetching data from the APIs.
- **layout**: these are the page-level components that assemble the final page structure.

---
