# My Project

This is a simple **HTML, CSS, and JavaScript** project.  
Since the project uses the JavaScript `fetch()` function to enable SPA-like features, it requires running on a **local server** (not just opening with `file://`) to work properly.

---

## Running Locally

This project uses [`http-server`](https://www.npmjs.com/package/http-server), a lightweight Node.js web server.

---

## Setup Instructions

### 1. Install Node.js
If you don’t already have it, download and install [Node.js](https://nodejs.org/).  
You can check if Node.js is installed by running:

```bash
node -v
```
### 2. Install http-server
Once Node.js is installed, run the following command in your terminal to install http-server globally (you only need to do this once):

```bash
npm install -g http-server
```

### 3. Start the Server
Navigate to the project’s root folder in your terminal and run:

```bash
http-server
```

### 4. Open in Browser
By default, the server will start on:

```bash
http://localhost:8080
```

or

```bash
http://127.0.0.1:8080
```

Copy the upper URL and paste it into your browser to open the project.


## Troubleshooting

### Port Already in use
If port 8080 is busy, specify another port (e.g., 3000):
```bash
http-server -p 3000
```

Then open:
```bash
http://localhost:3000
```

### Command not found
If you see an error like http-server: command not found, make sure:
- Node.js is installed correctly.

- http-server was installed globally with npm install -g http-server.