import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate }             from 'react-router-dom';
import axios                                  from 'axios';
import {
  Mic2, MicOff, Video, VideoOff, PhoneOff
} from 'lucide-react';
import '../App.css';

export default function InterviewRoom() {
  const { mockId } = useParams();
  const navigate   = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [stream, setStream]       = useState(null);
  const [error, setError]         = useState('');
  const [phase, setPhase]         = useState('idle'); // idle/counting/asking/finished
  const [countdown, setCountdown] = useState(null);
  const [currentQ, setCurrentQ]   = useState(0);
  const [caption, setCaption]     = useState('');
  const [voices, setVoices]       = useState([]);
  const [isListening, setIsListening] = useState(false);

  const [micOn, setMicOn]         = useState(true);
  const [camOn, setCamOn]         = useState(true);

  const videoRef       = useRef(null);
  const recognitionRef = useRef(null);
  const dragRef        = useRef(null);

  // Fetch questions
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5001/api/mocks/${mockId}`)
      .then(res => setQuestions(res.data.questions))
      .catch(() => setError('Failed to load questions.'))
      .finally(() => setLoading(false));
  }, [mockId]);

  // Load TTS voices
  useEffect(() => {
    const load = () => {
      const vs = window.speechSynthesis.getVoices();
      if (vs.length) setVoices(vs);
    };
    window.speechSynthesis.onvoiceschanged = load;
    load();
  }, []);

  // Attach / detach camera & mic
  useEffect(() => {
    if (!videoRef.current) return;
    if (stream && camOn) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(()=>{});
    } else {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  }, [stream, camOn]);

  const enableCamera = async () => {
    try {
      const ms = await navigator.mediaDevices.getUserMedia({
        video: true, audio: true
      });
      setStream(ms);
    } catch {
      setError('Camera & mic access denied.');
    }
  };

  // Toggle mic by disabling/enabling the audio track
  const toggleMic = () => {
    setMicOn(m => {
      const on = !m;
      if (stream) {
        stream.getAudioTracks().forEach(t => (t.enabled = on));
      }
      return on;
    });
  };

  // Toggle cam by disabling video track
  const toggleCam = () => {
    setCamOn(c => {
      const on = !c;
      if (stream) {
        stream.getVideoTracks().forEach(t => (t.enabled = on));
      }
      return on;
    });
  };

  // Start interview countdown
  const startInterview = () => {
    setPhase('counting');
    setCountdown(10);
  };

  // End interview early
  const endInterview = () => {
    recognitionRef.current?.stop();
    window.speechSynthesis.cancel();
    setPhase('finished');
  };

  // Handle countdown → asking
  useEffect(() => {
    if (phase !== 'counting') return;
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c === 1) {
          clearInterval(timer);
          setPhase('asking');
          return null;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Q&A → TTS & STT flow
  useEffect(() => {
    if (phase !== 'asking') return;
    if (currentQ >= questions.length) {
      setPhase('finished');
      return;
    }

    const fv = voices.find(v => /female/i.test(v.name) && /en-?us/i.test(v.lang))
            || voices.find(v => /female/i.test(v.name))
            || voices[0];

    const askUtter = new SpeechSynthesisUtterance(
      `Please answer the following question: ${questions[currentQ]?.text}`
    );
    if (fv) askUtter.voice = fv;

    askUtter.onend = () => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SR();
      recog.continuous = false;
      recog.interimResults = true;
      recog.lang = 'en-US';

      recog.onstart = () => setIsListening(true);
      recog.onresult = e => {
        setCaption(Array.from(e.results)
          .map(r=>r[0].transcript).join('')
        );
      };
      recog.onend = () => {
        setIsListening(false);
        const thanks = new SpeechSynthesisUtterance('Thank you for your answer.');
        if (fv) thanks.voice = fv;
        thanks.onend = () => {
          setTimeout(() => {
            setCaption('');
            setCurrentQ(q => q + 1);
          }, 2000);
        };
        window.speechSynthesis.speak(thanks);
      };

      recog.start();
      recognitionRef.current = recog;
    };

    window.speechSynthesis.speak(askUtter);

    return () => {
      window.speechSynthesis.cancel();
      recognitionRef.current?.stop();
    };
  }, [phase, currentQ, questions, voices]);

  // Minimal loading view
  if (loading) {
    return <div className="spinner-overlay"><div className="spinner"/></div>;
  }
  // Finished view
  if (phase === 'finished') {
    return (
      <div className="interview-room">
        <h2>🎉 Interview Complete</h2>
        <button className="text-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="interview-room">
      <div className="interview-layout">
        {/* AI side */}
        <div className="ai-area">
          <img
            src="https://via.placeholder.com/480x360?text=AI+Interviewer"
            alt="AI Interviewer"
            className="ai-avatar"
          />

          {phase === 'idle' && (
            <div className="idle-container">
              <p>Questions loaded: {questions.length}</p>
              <button
                className="text-button"
                onClick={startInterview}
                disabled={!questions.length}
              >
                Start Interview
              </button>
            </div>
          )}

          {phase === 'counting' && (
            <div className="spinner-overlay">
              <div className="spinner"/>
            </div>
          )}

          {phase === 'asking' && (
            <>
              <div className="question-box">
                <h3>Question {currentQ+1} of {questions.length}</h3>
                <p>{questions[currentQ]?.text}</p>
              </div>
              <div className="caption-box">
                {caption || <em>Listening…</em>}
              </div>
              {isListening && (
                <div className="listen-bars">
                  {[...Array(5)].map((_,i)=>
                    <div key={i} className="listen-bar"/>
                  )}
                </div>
              )}
            </>
          )}

          <div className="controls">
            <button
              className={`control-button ${micOn ? 'mic-on' : 'mic-off'}`}
              onClick={toggleMic}
            >
              {micOn ? <Mic2 /> : <MicOff />}
            </button>
            <button
              className={`control-button ${camOn ? 'cam-on' : 'cam-off'}`}
              onClick={toggleCam}
            >
              {camOn ? <Video /> : <VideoOff />}
            </button>
            <button
              className="control-button hangup"
              onClick={endInterview}
            >
              <PhoneOff />
            </button>
          </div>
        </div>

        {/* User side */}
        <div className="video-area">
          {!stream ? (
            <button className="text-button" onClick={enableCamera}>
              Enable Camera &amp; Mic
            </button>
          ) : (
            <div
              className="video-container draggable"
              ref={dragRef}
            >
              <video ref={videoRef} muted playsInline/>
              <button
                className="fullscreen-btn"
                onClick={() => videoRef.current.requestFullscreen()}
              >Fullscreen</button>
            </div>
          )}
          {stream && <p>You</p>}
        </div>
      </div>
    </div>
  );
}
