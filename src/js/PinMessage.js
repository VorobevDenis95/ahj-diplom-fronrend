import Message from './Message';

export default class PinMessage extends Message {
  iterateContainers() {
    if (this.pin) {
      this.mapFilesName();
    }
  }
}
