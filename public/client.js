// record video
let constraintObj = {
    audio: true,
    video: {
        facingMode: "user",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
    }
};

navigator.mediaDevices.getUserMedia(constraintObj)
    .then(function (mediaStreamObj) {
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];

        mediaRecorder.start();
        console.log(mediaRecorder.state);

        setTimeout((ev) => {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
        }, 3000);

        mediaRecorder.ondataavailable = function (ev) {
            chunks.push(ev.data);
        }
        mediaRecorder.onstop = (ev) => {
            let blob = new Blob(chunks, { 'type': 'video/webm;' });
            chunks = [];
            console.log("blob ready", blob);

            uploadToServer(blob);
        }
    })
    .catch(function (err) {
        console.log(err.name, err.message);
    });

function uploadToServer(blob) {
    let url = "http://localhost:3000/"


    var fd = new FormData();
    fd.append('upl', blob, 'video.mp4');

    fetch(url,
        {
            method: 'post',
            body: fd,
        });
}