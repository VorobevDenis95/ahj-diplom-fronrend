/* eslint-disable class-methods-use-this */
export default class Modal {
  createDropField() {
    const field = document.querySelector('.drop__field');
    if (!field) {
      const dropField = document.createElement('div');
      const p = document.createElement('p');
      p.classList.add('drop__field__text');
      p.textContent = 'Перетащите файл для загрузки в данное поле';
      dropField.classList.add('drop__field');
      dropField.append(p);
      return dropField;
    }
    return null;
  }

  deleteDropField() {
    const field = document.querySelector('.drop__field');
    if (field) field.remove();
  }

  createMaskSpin(container) {
    if (!container.querySelector('.loader__mask')) {
      const mask = document.createElement('div');
      mask.classList.add('loader__mask');
      const spin = document.createElement('div');
      spin.classList.add('loader');
      mask.append(spin);
      container.prepend(mask);
    }
  }

  deleteMaskSpin(container) {
    const mask = container.querySelector('.loader__mask');
    if (mask) mask.remove();
  }

  createSpin(container) {
    if (!container.querySelector('.loader')) {
      const spin = document.createElement('div');
      spin.classList.add('loader');
      container.prepend(spin);
    }
  }

  deleteSpin(container) {
    const spin = container.querySelector('.loader');
    if (spin) spin.remove();
  }
}
