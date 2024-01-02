export default class AudioRec {
  constructor() {
    this.startStopRecord = document.querySelector('.chat__microphone');
    this.statusRecord = false;
    this.stream = null;
    this.chunks = [];
    this.blob = null;
    this.recorder = null;
    this.audio = document.createElement('audio');
    this.file = null;
  }

  async recordedAudio() {
    this.stream = await navigator.mediaDevices.getUserMedia({
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
      this.blob = new Blob(this.chunks, {
        type: 'audio/wav',
      });
      this.audio.src = URL.createObjectURL(this.blob);
      this.audio.controls = true;
    });
  }

  rec() {
    this.recordedAudio().then(() => {
      this.statusRecord = true;
      this.init();
      this.recorder.start();
    });
  }

  stopRec() {
    this.recorder.stop();
    this.stream.getTracks().forEach((track) => track.stop());
    this.statusRecord = false;
  }
}
