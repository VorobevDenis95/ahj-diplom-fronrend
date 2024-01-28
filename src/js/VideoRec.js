// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

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

    this.video.classList.add('video__message');
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
    });

    this.recorder.addEventListener('dataavailable', (e) => {
      this.chunks.push(e.data);
    });

    this.recorder.addEventListener('stop', () => {
      this.blob = new Blob(this.chunks);

      const fileName = `video_message.wav${uuidv4()}`;
      const fileType = 'video/mp4';
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
    return 'ok';
  }
}
