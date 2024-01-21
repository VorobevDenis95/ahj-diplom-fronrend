// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment/moment';
import { API_URL } from './const';
import { linkGenerator } from './utils';

export default class Message {
  constructor(message) {
    this.id = message.id;
    this.text = linkGenerator(message.text);
    this.files = message.files;
    this.favorites = message.favorites;
    this.pin = message.pin;

    this.focus = false;
    // this.data = formatData(message.data);
    this.data = moment(message.data).format('MMMM Do YYYY, h:mm:ss a');

    this.chat = document.querySelector('.chat');
    this.pinContainer = document.querySelector('.pinning__container');
    this.container = document.createElement('div');

    this.imageContainer = this.files.filter((file) => file.type === 'image');
    this.videoContainer = this.files.filter((file) => file.type === 'video');
    this.audioContainer = this.files.filter((file) => file.type === 'audio');
    this.aplicationContainer = this.files.filter((file) => file.type === 'application');
    this.bindToDom();
  }

  bindToDom() {
    if (this.favorites) this.container.classList.add('favorite__container');
    this.container.classList.add('message');
    this.container.setAttribute('id', this.id);
    this.container.innerHTML = this.markup;
    this.iterateContainers();
    // this.chat.prepend(this.container);
  }

  addBefore() {
    this.chat.prepend(this.container);
  }

  addEnd() {
    this.chat.append(this.container);
  }

  addSecure() {
    if (this.focus) {
      if (this.container.querySelector('.message__pin')) return;
      const imagePinIcon = document.createElement('button');
      imagePinIcon.classList.add('message__pin');
      imagePinIcon.type = 'button';

      const imageHeartIcon = document.createElement('button');
      imageHeartIcon.classList.add('message__favorite');
      imageHeartIcon.type = 'button';
      this.container.querySelector('.message__header').append(imagePinIcon);
      this.container.querySelector('.message__header').append(imageHeartIcon);
    } else {
      this.clearPin();
    }
  }

  pinningMessage() {
    this.container.classList.add('pinning__msg');
    const btn = document.createElement('button');
    btn.textContent = 'x';
    btn.classList.add('btn__pinning__message');
    this.container.querySelector('.message__header').append(btn);
    this.pinContainer.append(this.container);
  }

  clearPin() {
    const pin = this.container.querySelector('.message__pin');
    const heartContainer = this.container.querySelector('.message__favorite');
    if (pin) pin.remove();
    if (heartContainer) heartContainer.remove();
  }

  get markup() {
    return `
        <div class='message__header'>
        <span class='message__data'>${this.data}</span>

        </div>

        <div class='message__container'>
          <pre class='message__text'>${this.text}</pre>
        </div>
      `;
  }

  // markupFiles() {
  //   if (this.files) {
  //     const files = this.files.forEach((file) => {
  //       if (file.type === 'image') {
  //         this.createImg(file.src);
  //       }
  //     });
  //   }
  // }

  createImg() {
    if (this.imageContainer) {
      this.imageContainer.forEach((img) => {
        const image = document.createElement('img');
        image.classList.add('file__chaos');
        image.src = `${API_URL}${img.src}`;
        this.container.append(image);
      });
    }
    // if (!this.imageContainer) {
    //   this.imageContainer = document.createElement('div');
    //   this.imageContainer.classList.add('image__container');
    // }
    // const image = document.createElement('img');
    // image.src = src;
    // this.imageContainer.append(image);
  }

  сreateAudio() {
    if (this.audioContainer) {
      this.audioContainer.forEach((audio) => {
        const aud = document.createElement('audio');
        aud.classList.add('file__chaos');
        aud.src = `${API_URL}${audio.src}`;
        aud.controls = true;
        this.container.append(aud);
      });
    }
  }

  сreateVideo() {
    if (this.videoContainer) {
      this.videoContainer.forEach((video) => {
        const vid = document.createElement('video');
        vid.classList.add('file__chaos');
        vid.src = `${API_URL}${video.src}`;
        vid.controls = true;
        this.container.append(vid);
      });
    }
  }

  iterateContainers() {
    if (this.imageContainer) this.createImg();
    if (this.audioContainer) this.сreateAudio();
    if (this.videoContainer) this.сreateVideo();
  }

  remove() {
    this.container.remove();
  }
}
