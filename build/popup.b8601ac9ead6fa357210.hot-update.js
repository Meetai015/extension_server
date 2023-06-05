"use strict";
self["webpackHotUpdatechrome_extension_boilerplate_react"]("popup",{

/***/ "./src/pages/Popup/Popup.jsx":
/*!***********************************!*\
  !*** ./src/pages/Popup/Popup.jsx ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_img_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../assets/img/logo.svg */ "./src/assets/img/logo.svg");
/* harmony import */ var _containers_Greetings_Greetings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../containers/Greetings/Greetings */ "./src/containers/Greetings/Greetings.jsx");
/* harmony import */ var _Popup_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Popup.css */ "./src/pages/Popup/Popup.css");
Object(function webpackMissingModule() { var e = new Error("Cannot find module 'recordrtc'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");

var _s = __webpack_require__.$Refresh$.signature();





function tabCapture() {
  return new Promise(resolve => {
    chrome.tabCapture.capture({
      audio: true,
      video: false
    }, stream => {
      resolve(stream);
    });
  });
  console.log("Streaming");
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
  console.log(tabId);
  console.log(data);
  return new Promise(resolve => {
    chrome.tabs.sendMessage(tabId, data);
  });
}
const Popup = () => {
  _s();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    startRecording();
  }, []);
  const startRecording = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
      });

      // Capture audio stream
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      // Capture video stream
      const videoStream = await chrome.tabCapture.capture({
        video: true
      }, tab.id);

      // Combine audio and video streams
      const mediaStream = new MediaStream([...audioStream.getTracks(), ...videoStream.getVideoTracks()]);

      // Start recording
      const mediaRecorder = new MediaRecorder(mediaStream);
      const recordedChunks = [];
      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunks, {
          type: 'video/webm'
        });
        saveFile(recordedBlob, 'recorded_video.webm');
      };
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 10000); // Record for 10 seconds
    } catch (error) {
      console.error("Error capturing tab:", error);
    }
  };
  const saveFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };
  return null;
};
_s(Popup, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Popup;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);
var _c;
__webpack_require__.$Refresh$.register(_c, "Popup");

const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fb11e42ea57f9eb59384")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=popup.b8601ac9ead6fa357210.hot-update.js.map