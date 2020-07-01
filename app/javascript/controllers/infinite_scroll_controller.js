import { Controller } from 'stimulus';
import Rails from "@rails/ujs";
import _ from 'lodash';

export default class extends Controller {
  static targets = [ 'entries', 'pagination' ];
  static offset = 100;

  initialize() {
    this.scroll = _.throttle(this.scroll, 500);
  }

  scroll() {
    let url = this.paginationTarget.querySelector("a[rel='next']")?.href;
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    if (window.pageYOffset >= height - (window.innerHeight + this.constructor.offset) && url) {
      this.loadNextData(url);
    }
  }

  loadNextData(url) {
    Rails.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: (data) => {
        this.entriesTarget.insertAdjacentHTML('beforeend', data.entries);
        this.paginationTarget.innerHTML = data.pagination;
      }
    })
  }
}
