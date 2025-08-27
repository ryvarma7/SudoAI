AI Assistant - Frontend + Backend (Local)
========================================

What's included:
- index.html       -> simple frontend (animated background + glowing search)
- style.css        -> styles & animations
- app.js           -> frontend JS that calls backend
- server.js        -> Node.js Express backend proxy to Google Gemini
- package.json     -> backend dependencies & start script
- .env.example     -> example env file (put your GEMINI_API_KEY here)

How to run (step-by-step):
1. Unzip the package and open the folder in VS Code.
2. Put your Gemini API key into a file named .env (same folder as server.js):
   GEMINI_API_KEY=your_real_key_here
   PORT=3000

3. Install backend dependencies:
   npm install

4. Run the backend:
   node server.js
   # or: npm start

5. Open the frontend:
   - Open index.html in your browser (double-click), OR
   - Serve it with a static server (optional). Since CORS is enabled in the backend, opening index.html directly should work.

Notes:
- Do NOT commit .env to any public repo.
- The frontend calls: http://localhost:3000/api/gemini
  If you change the port, update app.js accordingly.
- The Gemini request body is a simple shape; you may need to adapt it if Google updates the API.