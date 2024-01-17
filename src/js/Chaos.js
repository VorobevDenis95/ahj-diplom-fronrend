/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
import ChaosService from './ChaosService';
import replaceType from './utils';
import Message from './Message';
import AudioRec from './AudioRec';

import searchIcon from '../img/svg/search.svg';
import clipImg from '../img/svg/clip.svg';
import microphoneImg from '../img/svg/microphone.svg';
import cameraImg from '../img/svg/video-camera.svg';
import Modal from './Modal';
import VideoRec from './VideoRec';

export default class Chaos {
  constructor(container) {
    this.container = container;
    this.messages = [];
    this.files = [];
    this.listMessage = [];
    this.listSearch = [];

    this.focusMsg = null;

    this.pin = null;
    this.messagePin = null;

    this.tempImageContainer = null;
    this.tempAudioContainer = null;
    this.tempVideoContainer = null;

    this.search = false;

    this.audioRec = new AudioRec();
    this.videoRec = new VideoRec();

    this.chaosService = new ChaosService();
    this.modal = new Modal();
    // this.state = new State();

    this.onClickClip = this.onClickClip.bind(this);
    this.onClickMicrophone = this.onClickMicrophone.bind(this);
    this.onClickVideoCamera = this.onClickVideoCamera.bind(this);
    this.onChangeFileInput = this.onChangeFileInput.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onBtnDeleteTempFile = this.onBtnDeleteTempFile.bind(this);
    this.onDragover = this.onDragover.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onDownLoadFile = this.onDownLoadFile.bind(this);
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onClickPin = this.onClickPin.bind(this);

    this.init();
  }

  init() {
    this.bindToDom();
    this.addListeners();
    // this.showMessages();
    this.lazyLoad();
  }

  async showMessages() {
    const list = await this.chaosService.list();

    list.map((msg) => new Message(msg));
    console.log(list);
    // list.map((message) => {
    //   console.log(message);
    // });
  }

  load() {
    this.clearList();
    this.listSearch.map((el) => {
      const message = new Message(el);
      this.listMessage.push(message);
      message.addEnd();
    });
  }

  clearList() {
    this.listMessage.map((msg) => msg.remove());
    this.listMessage = [];
  }

  loadSearchMessage() {
    this.clearList();
    this.listSearch.map((el) => {
      const message = new Message(el);
      this.listMessage.push(message);
      message.addEnd();
    });
  }

  async lazyLoad() {
    const length = await this.chaosService.listLength();
    console.log(this.listMessage.length);
    const newlist = await this.chaosService.lazyList(this.listMessage.length);

    if (this.listMessage.length === length) return;

    // eslint-disable-next-line array-callback-return
    newlist.reverse().map((el) => {
      const message = new Message(el);
      this.listMessage.push(message);
      message.addBefore();
    });
  }

  async checkPinMessage() {
    this.pin = await this.chaosService.searchPin();
    if (this.pin) this.showPin();
  }

  showPin() {
    if (Object.keys(this.pin).length > 0) {
      const message = new Message(this.pin);
      if (this.messagePin && this.messagePin.id === message.id) {
        this.messagePin.remove();
      }
      this.messagePin = message;
      this.messagePin.addBefore();
    } else {
      this.messagePin.remove();
    }
   
  }

  addListeners() {
    window.addEventListener('wheel', (e) => {
      const { deltaY } = e;
      const firstChatChild = document.querySelector('.chat').firstChild;
      if (firstChatChild) {
        const { y } = firstChatChild.getBoundingClientRect();
        if (deltaY <= 0 && y > 0) this.lazyLoad();
      }
    });

    const chat = document.querySelector('.chat');
    chat.addEventListener('mouseover', this.onMouseOver);

    const searchInput = this.container.querySelector('.search__input');
    searchInput.addEventListener('input', this.onChangeSearchInput);

    const form = this.container.querySelector('.send-panel__container');
    form.addEventListener('submit', this.onSendMessage);

    const fileInput = this.container.querySelector('.chat__file-input');
    fileInput.addEventListener('change', this.onChangeFileInput);

    const clip = this.container.querySelector('.chat__clip');
    clip.addEventListener('click', this.onClickClip);

    const microphone = this.container.querySelector('.chat__microphone');
    microphone.addEventListener('click', this.onClickMicrophone);

    const videoCamera = this.container.querySelector('.chat__videocamera');
    videoCamera.addEventListener('click', this.onClickVideoCamera);

    this.container.addEventListener('dragover', this.onDragover);
    this.container.addEventListener('drop', this.onDrop);
    this.container.addEventListener('dragleave', this.onDragLeave);
    this.container.addEventListener('click', this.onDownLoadFile);

    this.container.addEventListener('keydown', this.onSendMessage);
    console.log(this.container);
    console.log(form, fileInput, clip);
  }

  bindToDom() {
    this.container.innerHTML = this.markup;
  }

  get markup() {
    return `
      <header class="header">
            <h1 class="header__title">Chaos Organaizer</h1>
              <img class='search__icon'src=${searchIcon} alt='search icon'>
              <input class='search__input'type='text' placeholder='Поиск сообщений'> 
        </header>
        <div class="chaos__container">
            <div class="chat"></div>
            <div class='send__container'>
              <form class="send-panel__container">
                  <div class="input__container">
                      <textarea class="chat__input" placeholder="Сообщение"></textarea>
                      <img src="${clipImg}" class="chat__clip" alt="clip">
                      <img src='${microphoneImg}' class='chat__microphone' alt='microphone'>
                      <img src='${cameraImg}' class='chat__videocamera' alt='video camera'> 
                  </div>
                  <input type="file" class="chat__file-input visually-hidden" multiple>
              </form>
              <div class='temp__files-container'></div>
            </div>  
            
        </div>   
    `;
  }

  onClickClip(e) {
    e.preventDefault();
    const fileInput = this.container.querySelector('.chat__file-input');
    fileInput.dispatchEvent(new MouseEvent('click'));
  }

  onClickMicrophone() {
    if (!this.audioRec.statusRecord) {
      this.audioRec.rec();
    } else {
      this.audioRec.stopRec().then((data) => console.log(data));

      this.container.append(this.audioRec.audio);
      this.files.push(this.audioRec.file);

      console.log(this.audioRec);
      console.log(this.audioRec.blob);
      const blob = new Blob(this.audioRec.chunks);

      // this.blob = new Blob(this.audioRec.chunks, {
      //   type: 'audio/wav',
      // });

      const fileName = 'voice_recording.wav';
      const fileType = 'audio/wav';
      const file = new File([blob], fileName, { type: fileType });
      // файл 0 размера

    }

    // this.audioRec.recordedAudio().then(() => {
    //   this.audioRec.init();
    //   this.audioRec.recorder.start();
    //   setTimeout(() => {
    //     this.audioRec.recorder.stop();
    //     this.audioRec.stream.getTracks().forEach((track) => track.stop());
    //     this.container.prepend(this.audioRec.audio);
    //   }, 2000);
    // });
  }

  onClickVideoCamera() {
    if (!this.videoRec.statusRecord) {
      this.videoRec.rec();
    } else {
      this.videoRec.stopRec();
      this.container.append(this.videoRec.file);
    }
  }

  onChangeFileInput(e) {
    const fileInput = e.target;
    const { files } = fileInput;
    if (files) {
      console.log(typeof files);
      console.log(this);
      Object.values(files).forEach((file) => this.files.push(file));
      console.log(this.files);
      // files.forEach((file) => this.files.push(file));
    }
    this.showContent();
  }

  onSendMessage(e) {
    // e.preventDefault();
    if (e.key === 'Enter' && !e.shiftKey) {
      // const form = this.container.querySelector('.send-panel__container');
      this.onFormSubmit();
    }
  }

  async onFormSubmit() {
    const formData = new FormData();
    const input = this.container.querySelector('.chat__input');
    if (!input.value.trim() && this.files.length === 0) return;

    if (input.value) {
      formData.append('message', input.value);
    }

    if (this.files) {
      this.files.map((file) => formData.append(file.name, file, file.name));
    }

    const data = await this.chaosService.createMessage(formData);
    const message = new Message(data);
    this.listMessage.push(message);
    message.addEnd();
    this.clearInput();
    this.files = [];
  }

  onDownLoadFile(e) {
    const file = e.target.closest('.file__chaos');
    if (file) {
      const { src } = file;
      const a = document.createElement('a');
      a.setAttribute('href', src);
      a.download = true;
      a.dispatchEvent(new MouseEvent('click'));
    }
  }

  async onChangeSearchInput(e) {
    if (!e.target.value.trim()) {
      this.search = false;
      this.clearList();
      this.lazyLoad();
    }
    if (e.target.value.trim()) {
      this.search = true;
      const result = await this.chaosService.searchMessage(e.target.value);
      this.listSearch = JSON.parse(JSON.stringify(result));
      this.loadSearchMessage();
    }
  }

  onMouseOver(e) {
    const arrPin = Array.from(this.container.querySelectorAll('.message__pin'));
    if (arrPin.length > 1) {
      arrPin.map((el) => el.remove());
    }
    const message = e.target.closest('.message');
    if (message) {
      const id = message.getAttribute('id');
      const item = this.listMessage.find((el) => el.id === id);
      this.focusMsg = item;
      item.focus = true;
      this.focusMsg.addSecure();

      const pin = this.container.querySelector('.message__pin');
      pin.addEventListener('click', this.onClickPin);
    }
    if (!e.target.closest('.message')) {
      // if (this.focusMsg.focus) this.focusMsg.focus = false;
      if (this.focusMsg) {
        this.focusMsg.focus = false;
        this.focusMsg.addSecure();
      }
    }

    // console.log(this.listMessage.filter(el => el.focus));
  }

  async onClickPin(e) {
    const message = e.target.closest('.message');
    if (message) {
      const id = message.getAttribute('id');
      console.log(id);
      this.chaosService.changePin(id);
      this.checkPinMessage();
    }
  
  }

  onBtnDeleteTempFile(e) {
    // console.log(e.target.parentElement);
    if (e.target.classList.contains('temp__item-delete')) {
      const element = e.target.parentElement;
      const name = element.getAttribute('name');
      this.deleteTemporaryFile(name);
      element.remove();
      console.log(this.files);
      const fileInput = this.container.querySelector('.chat__file-input');
      fileInput.value = '';
      console.log(fileInput.files);
    }
  }

  onDragover(e) {
    e.preventDefault();
    console.log(e);
    // const inputContainer = this.container.querySelector('.input__container');

    if (this.modal.createDropField()) {
      const send = document.querySelector('.temp__files-container');
      send.prepend(this.modal.createDropField());
      // this.container.append(this.modal.createDropField());
    }
  }

  onDrop(e) {
    e.preventDefault();

    const dropFiled = e.target.closest('.drop__field');
    if (dropFiled) {
      const file = e.dataTransfer.files[0];
      if (file) {
        this.files.push(file);
        this.showContent();
      }
    }
    this.modal.deleteDropField();
  }

  onDragLeave(e) {
    // console.log(e);
    // this.modal.deleteDropField();
    // e.preventDefault();
    if (e.screenX === 0 && e.screenY === 0) {
      this.modal.deleteDropField();
    }

    // e.preventDefault();
    // this.modal.deleteDropField();
    // const dropFiled = this.container.querySelector('.drop__field');
    // if (dropFiled) {
    //   console.log(dropFiled);
    //   this.modal.deleteDropField();
    // }
  }

  showContent() {
    if (this.files) {
      if (this.tempImageContainer) {
        this.tempImageContainer.innerHTML = '';
      }
      if (this.tempAudioContainer) {
        this.tempAudioContainer.innerHTML = '';
      }
      if (this.tempVideoContainer) {
        this.tempVideoContainer.innerHTML = '';
      }

      console.log(this.files);
      this.files.forEach((file) => {
        if (replaceType(file.type) === 'image') {
          this.createImageTemp(file);
        }
        if (replaceType(file.type) === 'audio') {
          this.createAudioTemp(file);
          // this.createImageTemp(file);
        }
        if (replaceType(file.type) === 'video') {
          this.createVideoTemp(file);
          // this.createImageTemp(file);
        }
      });
    }
  }

  deleteTemporaryFile(nameFile) {
    const indexElement = this.files.findIndex((file) => file.name === nameFile);
    if (indexElement >= 0) {
      this.files.splice(indexElement, 1);
    }
  }

  createImageTemp(file) {
    if (!this.tempImageContainer) {
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('temp__image-container');
      this.container.querySelector('.temp__files-container').append(imageContainer);
      this.tempImageContainer = imageContainer;
      this.tempImageContainer.addEventListener('click', this.onBtnDeleteTempFile);
    }
    const div = document.createElement('div');
    div.setAttribute('name', file.name);
    div.classList.add('temp__image-item');

    const name = document.createElement('span');
    name.textContent = file.name;
    name.classList.add('temp__name-image-item');
    const url = URL.createObjectURL(file);
    const image = document.createElement('img');
    image.src = url;
    image.classList.add('temp__img-image-item');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('temp__item-delete');
    btnDelete.textContent = 'x';
    div.append(name);
    div.append(image);
    div.append(btnDelete);
    this.tempImageContainer.append(div);
  }

  createAudioTemp(file) {
    if (!this.tempAudioContainer) {
      const audioContainer = document.createElement('div');
      audioContainer.classList.add('temp__audio-container');
      this.container.querySelector('.temp__files-container').append(audioContainer);
      this.tempAudioContainer = audioContainer;
      this.tempAudioContainer.addEventListener('click', this.onBtnDeleteTempFile);
    }
    const audContainer = document.createElement('div');
    audContainer.setAttribute('name', file.name);
    audContainer.classList.add('temp__audio-item');
    const name = document.createElement('span');
    name.classList.add('temp__name-audio-item');
    name.textContent = file.name;
    const audio = document.createElement('audio');
    audio.src = URL.createObjectURL(file);
    audio.controls = true;

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('temp__item-delete');
    btnDelete.textContent = 'x';
    audContainer.append(name, audio, btnDelete);
    this.tempAudioContainer.append(audContainer);
  }

  createVideoTemp(file) {
    if (!this.tempVideoContainer) {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('temp__video-container');
      this.container.querySelector('.temp__files-container').append(videoContainer);
      this.tempVideoContainer = videoContainer;
      this.tempVideoContainer.addEventListener('click', this.onBtnDeleteTempFile);
    }
    const vidContainer = document.createElement('div');
    vidContainer.setAttribute('name', file.name);
    vidContainer.classList.add('temp__video-item');
    const name = document.createElement('span');
    name.classList.add('temp__name-video-item');
    name.textContent = file.name;
    const video = document.createElement('video');
    video.src = URL.createObjectURL(file);
    video.controls = true;

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('temp__item-delete');
    btnDelete.textContent = 'x';
    vidContainer.append(name, video, btnDelete);
    this.tempVideoContainer.append(vidContainer);
  }

  clearInput() {
    this.container.querySelector('.chat__input').value = '';
    this.container.querySelector('.temp__files-container').innerHTML = '';
  }
}
