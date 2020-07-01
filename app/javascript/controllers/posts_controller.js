import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = [ 'content', 'form' ];

  getContent(event) {
    fetch(event.currentTarget.dataset.url)
      .then(response => response.text())
      .then(data => this.contentTarget.innerHTML = data);
  }

  submitForm(event) {
    const xhr = event.detail[2];
    const response = JSON.parse(xhr.response);
    if (response.success) {
      window.location = '/posts';
    } else {
      this.formTarget.outerHTML = response.form;
    }
  }
}
