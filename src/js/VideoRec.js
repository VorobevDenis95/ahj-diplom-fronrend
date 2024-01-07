export default class VideoRec {
  constructor() {
    this.startStopRecord = document.querySelector('.chat__camera');
    this.statusRecord = false;
    this.stream = null;
    this.chunks = [];
    this.blob = null;
    this.recorder = null;
    this.video = document.createElement('video');
    this.file = null;
  }

  async recordedVideo() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  }

  init() {
    this.recorder = new MediaRecorder(this.stream);
    this.chunks = [];

    this.recorder.addEventListener('start', () => {
      console.log('start');
    });

    this.recorder.addEventListener('dataavailable', (e) => {
      this.chunks.push(e.data);
    });

    this.recorder.addEventListener('stop', () => {
      console.log('stop');

      this.blob = new Blob(this.chunks);

      const fileName = 'voice_recording.wav';
      const fileType = 'audio/wav';
      this.file = new File([this.blob], fileName, { type: fileType });

      this.video.src = URL.createObjectURL(this.blob);
      this.video.controls = true;
    });
  }

  rec() {
    this.recordedVideo().then(() => {
      this.statusRecord = true;
      this.init();
      this.recorder.start();
    });
  }

  async stopRec() {
    this.recorder.stop();
    this.stream.getTracks().forEach((track) => track.stop());
    this.statusRecord = false;
  }
}
