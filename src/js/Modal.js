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
}
