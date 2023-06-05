import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';


function tabCapture() {
  return new Promise((resolve) => {
    chrome.tabCapture.capture(
      {
        audio: true,
        video: false,
      },
      (stream) => {
        resolve(stream);
      } 
    );
  });
  console.log("Streaming")
}

function saveFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// function stopRecording(stream, durationInSeconds) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (stream && stream.getVideoTracks) {
//         stream.getVideoTracks().forEach((track) => track.stop());
//       }
//       resolve();
//     }, durationInSeconds * 1000);
//   });
// }

function to16BitPCM(input) {
  const dataLength = input.length * (16 / 8);
  const dataBuffer = new ArrayBuffer(dataLength);
  const dataView = new DataView(dataBuffer);
  let offset = 0;
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    dataView.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return dataView;
}

function to16kHz(audioData, sampleRate = 44100) {
  const data = new Float32Array(audioData);
  const fitCount = Math.round(data.length * (16000 / sampleRate));
  const newData = new Float32Array(fitCount);
  const springFactor = (data.length - 1) / (fitCount - 1);
  newData[0] = data[0];
  for (let i = 1; i < fitCount - 1; i++) {
    const tmp = i * springFactor;
    const before = Math.floor(tmp).toFixed();
    const after = Math.ceil(tmp).toFixed();
    const atPoint = tmp - before; 
    newData[i] = data[before] + (data[after] - data[before]) * atPoint;
  }
  newData[fitCount - 1] = data[data.length - 1];
  return newData;
}

function sendMessageToTab(tabId, data) {
  console.log(tabId)
  console.log(data)
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, data
    );
  });
}

const Popup = () => {
  useEffect(() => {
    startRecord();
  }, []);

  const startRecord = async () => {
    try {
      console.log("Awaiting tab capture");
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      console.log("Tab Capture done");

      const mediaRecorder = new MediaRecorder(stream);
      const recordedChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
        saveFile(recordedBlob, 'recorded_video.webm');
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
      }, 10 * 1000); // Record for 10 seconds

    } catch (error) {
      console.error("Error capturing screen:", error);
      window.close();
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Auto-recorder
        </p>
        <button
          onClick={startRecord}
        >
          Start recording
        </button>
      </header>
    </div>
  );
};

export default Popup;
