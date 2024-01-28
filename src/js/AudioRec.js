// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

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

    this.audio.classList.add('voice__audio');
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
    });

    this.recorder.addEventListener('dataavailable', (e) => {
      this.chunks.push(e.data);
    });

    this.recorder.addEventListener('stop', () => {
      this.blob = new Blob(this.chunks, {
        type: 'audio/wav',
      });

      const fileName = `voice_record${uuidv4()}.wav`;
      const fileType = 'audio/wav';
      this.file = new File([this.blob], fileName, { type: fileType });

      this.audio.src = URL.createObjectURL(this.blob);
      this.audio.controls = true;
    });
  }

  async rec() {
    this.recordedAudio().then(() => {
      this.statusRecord = true;
      this.init();
      this.recorder.start();
    });
  }

  async stopRec() {
    this.recorder.stop();
    this.stream.getTracks().forEach((track) => track.stop());
    this.statusRecord = false;
    return 'ok';
  }
}
