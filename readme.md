# Mock Interview

A web application that simulates a mock interview experience with AI, allowing users to create custom interview questions, review them, and then engage in a video-call–style interview where AI speaks the questions, listens to responses, and provides real-time captions.

## 🔧 Tech Stack

- Client: `React`, `React Router`, `Axios`, `Lucide React Icons`

- Server: `Node.js`, `Express.js`, `Mongoose`

- Database: `MongoDB`

- Speech & Video: Web Speech API (Text-to-Speech & Speech Recognition), WebRTC (`getUserMedia`)

- Styling: CSS (Flexbox, animations)

- Environment Management: dotenv

## 🚀 Features

- Create Mock: Add, remove, and rearrange custom interview questions.

- Review Mock: View a numbered list of submitted questions before starting.

- Interview Room:

     - AI interviewer uses Text-to-Speech to ask each question in a polite, female voice.

    - Countdown or placeholder screen before starting.

    - Real-time Speech Recognition to capture user responses and display live captions.

   - Listening animation while AI is capturing speech.

   - Controls to toggle mic, camera, and end call.

   - Fullscreen option for the user video tile.

- UX Polish: GMeet-like layout, animated buttons, spinners, and styled controls.


## 🛠 Prerequisites

- Node.js (v14+)

- `npm` or `yarn`

- MongoDB running locally or a remote connection `string`
## ⚙️ Setup & Installation

1. Clone the repository

```python
 git clone <repository-url> 
```
```python
cd mock-interview-AI-LLM
```
2. Server
``` python
cd server
npm install
```
3. Client
``` python
cd ../client
npm install
```
4. Environment variables
     - In the server folder, create a .env file:
       ``` python 
         MONGO_URI=mongodb://localhost:27017/mock_interview
         PORT=5001
       ```
5. ▶️ Running the App

- Start the server (in `server/`)

    ``` python 
     npm run dev 
    ```
     Server will run on `http://localhost:5001`

- Start the client (`in client/`)
  ``` python
    npm start
   ```
    React app will open at `http://localhost:3000`

## 📁 Project Structure
``` bash
mock-interview-AI-LLM/
├── client/                # React frontend
│   ├── src/
│   │   ├── pages/         # CreateMock, ReviewMock, InterviewRoom
│   │   ├── App.css        # Global styles
│   │   └── index.js
│   └── package.json
├── server/                # Express backend
│   ├── config/
│   │   └── db.js          # Mongo connection
│   ├── models/
│   │   └── mock.js        # Mongoose schema
│   ├── routes/
│   │   └── mocks.js       # API routes
│   ├── .env               # Env vars (not in repo)
│   ├── index.js           # App entry
│   └── package.json
└── README.md


React app will open at http://localhost:3000.

```

## 🤝 Contributing

- Fork the repo

- Create a feature branch (`git checkout -b feature/XYZ`)

- Commit your changes (`git commit -m "…"`)

- Push to branch (`git push origin feature/XYZ`)

- Create a Pull Request
## Author 
- [Harshal](https://github.com/harshalp1911)
- [Imran Alam](https://github.com/Im-Alam)
- [Mohd Yusuf Hesam](https://github.com/turbo7slug)
- [Rishi Srivastava](https://github.com/rishi-0205)

## License

[This project is MIT licensed](https://choosealicense.com/licenses/mit/)