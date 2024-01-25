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
    const title = document.createElement('h3');
    title.textContent = 'Закрепленное сообщение';
    const btn = document.createElement('button');
    btn.textContent = 'x';
    btn.classList.add('btn__pinning__message');
    this.container.querySelector('.message__header').append(btn);
    this.container.prepend(title);
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
          <div class='message__images-video'></div>
          <div class='message__audio__container'></div
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
        const container = document.createElement('div');
        container.classList.add('image__container');

        const name = document.createElement('span');
        name.classList.add('name__image-container');
        name.textContent = img.name;

        const image = document.createElement('img');
        image.classList.add('file__chaos');
        image.classList.add('image__message');
        image.src = `${API_URL}${img.src}`;

        container.append(name);
        container.append(image);
        this.container.querySelector('.message__images-video').append(container);
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
        const container = document.createElement('div');
        container.classList.add('audio__container');

        const name = document.createElement('span');
        name.textContent = audio.name;

        const aud = document.createElement('audio');
        aud.classList.add('file__chaos');
        aud.classList.add('audio__message');
        aud.src = `${API_URL}${audio.src}`;
        aud.controls = true;

        container.append(name);
        container.append(aud);

        this.container.querySelector('.message__audio__container').append(container);
      });
    }
  }

  сreateVideo() {
    if (this.videoContainer) {
      this.videoContainer.forEach((video) => {
        const container = document.createElement('div');
        container.classList.add('video__container');

        const name = document.createElement('span');
        name.textContent = video.name;

        const vid = document.createElement('video');
        vid.classList.add('file__chaos');
        vid.classList.add('video__message');
        vid.src = `${API_URL}${video.src}`;
        vid.controls = true;

        container.append(name);
        container.append(vid);

        this.container.querySelector('.message__images-video').append(container);
      });
    }
  }

  mapFilesName() {
    if (this.files.length === 0) return;
    const namesContainer = document.createElement('div');
    namesContainer.classList.add('pin__filesNames');
    const titleContainer = document.createElement('span');
    titleContainer.textContent = 'Список файлов в сообщении:';
    this.files.forEach((el) => {
      const span = document.createElement('span');
      span.textContent = el.name;
      namesContainer.append(span);
    });
    this.container.append(titleContainer);
    this.container.append(namesContainer);
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
