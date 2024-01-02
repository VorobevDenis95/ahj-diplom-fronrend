export default class Modal {

  createDropField() {
    const field = document.querySelector('.drop__field');
    if (!field) {
      const dropField = document.createElement('div');
      dropField.classList.add('drop__field');
      return dropField;
    }
    return null;
  }

  deleteDropField() {
    const field = document.querySelector('.drop__field');
    if (field) field.remove();
  }
}
