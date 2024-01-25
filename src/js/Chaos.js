/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
import ChaosService from './ChaosService';
import replaceType from './utils';
import Message from './Message';
import AudioRec from './AudioRec';
import Modal from './Modal';
import VideoRec from './VideoRec';
import PinMessage from './PinMessage';

export default class Chaos {
  constructor(container) {
    this.container = container;
    this.messages = [];
    this.files = [];
    this.listMessage = [];
    this.listSearch = [];
    this.listFavorite = [];

    this.focusMsg = null;

    this.pin = null;
    this.messagePin = null;

    this.tempImageContainer = null;
    this.tempAudioContainer = null;
    this.tempVideoContainer = null;

    this.search = false;
    this.searchFavorite = false;

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
    this.onClickFavorites = this.onClickFavorites.bind(this);
    this.onClickHeart = this.onClickHeart.bind(this);

    this.init();
  }

  init() {
    this.bindToDom();
    this.addListeners();
    this.lazyLoad();
    this.checkPinMessage();
  }

  async showMessages() {
    const list = await this.chaosService.list();
    list.map((msg) => new Message(msg));
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
    // this.clearList();
    this.listSearch.map((el) => {
      const message = new Message(el);
      this.listMessage.push(message);
      message.addEnd();
    });
  }

  loadFavoriteMessage(list) {
    this.clearList();
    list.map((el) => {
      const message = new Message(el);
      this.listFavorite.push(message);
      message.addEnd();
    });
  }

  async lazyLoad() {
    const chat = this.container.querySelector('.chat');
    this.modal.createSpin(chat);
    const length = await this.chaosService.listLength();
    console.log(this.listMessage.length);
    const newlist = await this.chaosService.lazyList(this.listMessage.length);
    this.modal.deleteSpin(this.container.querySelector('.chat'));
    if (this.listMessage.length === length) return;
    // eslint-disable-next-line array-callback-return
    newlist.reverse().map((el) => {
      const message = new Message(el);
      this.listMessage.push(message);
      message.addBefore();
    });
  }

  async checkPinMessage() {
    const pin = await this.chaosService.searchPin();
    console.log(pin);
    if (Object.keys(pin).length === 0 && this.pin) {
      this.pin.remove();
      this.pin = null;
      return;
    }
    if (Object.keys(pin).length > 0) {
      if (this.pin) {
        this.pin.remove();
        this.pin = null;
      }
      // this.pin = new Message(pin);
      this.pin = new PinMessage(pin);
      this.pin.pinningMessage();
    }
    // if (Object.keys(pin).length > 0) {
    //   if (this.pin && this.pin.id === pin.id && !this.pin.pin) {
    //     this.pin.remove();
    //     this.pin = null;
    //   }
    //   if (this.pin) this.pin.remove();
    //   this.pin = new Message(pin);
    //   this.pin.addBefore();
    // }
    // this.pin = await this.chaosService.searchPin();
    // if (this.pin) this.showPin();
    // if (Object.keys(this.pin).length === 0) this.clearPin();
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

  clearPin() {
    console.log(this.pin);
    // this.pin.remove();
    this.pin = {};
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

    const favorites = document.querySelector('.favorites');
    favorites.addEventListener('click', this.onClickFavorites);

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
            <input class='search__input'type='text' placeholder='Поиск сообщений...'> 
            <button type="button" class='favorites'>Favorites</button>
        </header>
        <div class="chaos__container">
            <div class='pinning__container'></div>
            <div class="chat"></div>
            <div class='send__container'>
              <form class="send-panel__container">
                  <div class="input__container">
                      <textarea class="chat__input" placeholder="Сообщение"></textarea>
                      <button type='button' class="chat__btn chat__clip" ></button>
                      <button type='button' class='chat__btn chat__microphone' >
                      <button type='button' class='chat__btn chat__videocamera'> 
                    </div>
                  <input type="file" class="chat__file-input visually-hidden" multiple>
              </form>
              <div class='temp__files-container'></div>
            </div>  
        </div>   
    `;
  }

  async onClickFavorites() {
    const favorite = this.container.querySelector('.favorites');
    if (!this.searchFavorite) {
      favorite.classList.add('favorites__active');

      this.searchFavorite = true;
      const chat = this.container.querySelector('.chat');
      this.modal.createSpin(chat);
      const list = await this.chaosService.getFavorite();
      this.modal.deleteSpin(chat);
      this.loadFavoriteMessage(list);
    } else {
      favorite.classList.remove('favorites__active');
      this.listFavorite.map((el) => el.remove());
      this.lazyLoad();
      this.searchFavorite = false;
    }
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
      console.log(file);
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
    console.log(e);
    const fileInput = e.target;
    const { files } = fileInput;
    if (files) {
      Object.values(files).forEach((file) => this.files.push(file));
    }
    this.showContent();
  }

  onSendMessage(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.onFormSubmit();
    }
  }

  async onFormSubmit() {
    const input = this.container.querySelector('.chat__input');
    if (!input.value.trim() && this.files.length === 0) return;
    const sendContainer = this.container.querySelector('.send__container');
    this.modal.createMaskSpin(sendContainer);
    const formData = new FormData();

    input.disabled = true;

    if (input.value) {
      formData.append('message', input.value);
    }

    if (this.files) {
      this.files.map((file) => formData.append(file.name, file, file.name));
    }

    const data = await this.chaosService.createMessage(formData);
    this.modal.deleteMaskSpin(sendContainer);
    const message = new Message(data);
    this.listMessage.push(message);
    message.addEnd();
    input.disabled = false;
    input.focus();
    this.clearInput();
    this.files = [];
  }

  async onDownLoadFile(e) {
    const file = e.target.closest('.file__chaos');
    if (file) {
      const blob = await this.chaosService.file(file.previousSibling.textContent)
      const a = document.createElement('a');
      a.download = file.previousSibling.textContent;
      a.href = URL.createObjectURL(blob);
      a.dispatchEvent(new MouseEvent('click'));
    }

    const deletePin = e.target.classList.contains('btn__pinning__message');
    if (deletePin) {
      const { target } = e;
      const msgPin = target.parentElement.parentElement;
      const id = msgPin.getAttribute('id');
      this.chaosService.changePin(id);
      this.checkPinMessage();
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
      this.clearList();
      const chat = this.container.querySelector('.chat');
      this.modal.createSpin(chat);
      const result = await this.chaosService.searchMessage(e.target.value);
      this.listSearch = JSON.parse(JSON.stringify(result));
      this.modal.deleteSpin(chat);
      this.loadSearchMessage();
    }
  }

  onMouseOver(e) {
    const arrPin = Array.from(this.container.querySelectorAll('.message__pin'));
    if (arrPin.length > 1) {
      arrPin.map((el) => el.remove());
    }

    const arrHeart = Array.from(this.container.querySelectorAll('.message__favorite'));
    if (arrHeart.length > 1) {
      arrHeart.map((el) => el.remove());
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

      const heart = this.container.querySelector('.message__favorite');
      heart.addEventListener('click', this.onClickHeart);
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

  async onClickHeart(e) {
    const message = e.target.parentElement.parentElement;
    if (message) {
      const id = message.getAttribute('id');
      const favorite = await this.chaosService.changeFavorite(id);
      if (favorite.favorites) {
        message.classList.add('favorite__container');
      } else {
        message.classList.remove('favorite__container');
      }
    }
  }

  async onClickPin(e) {
    const message = e.target.closest('.message');
    if (message) {
      const id = message.getAttribute('id');
      await this.chaosService.changePin(id);
      await this.checkPinMessage();
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

  clearTempContainers() {
    if (this.tempImageContainer) {
      this.tempImageContainer.innerHTML = '';
    }
    if (this.tempAudioContainer) {
      this.tempAudioContainer.innerHTML = '';
    }
    if (this.tempVideoContainer) {
      this.tempVideoContainer.innerHTML = '';
    }
  }

  showContent() {
    console.log(1);
    if (this.files) {
      this.clearTempContainers();

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
    this.container.querySelector('.chat__file-input').value = '';
    this.clearTempContainers();
  }
}
