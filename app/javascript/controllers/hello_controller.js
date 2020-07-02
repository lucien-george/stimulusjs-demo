import { Controller } from "stimulus"

export default class extends Controller {
 static targets = [ 'click', 'count' ]

  connect() {
    console.log('hi');
  }

  sayHi() {
    const message = this.clickTarget.innerText;
    this.clickTarget.innerText = this.data.get('message');
    this.data.set('message', message);
  }

  get count() {
    return this.data.get('count');
  }

  set count(value) {
    this.data.set('count', value);
    this.countTarget.innerHTML = this.count;
  }

  decrement() {
    this.count--; // this.count = this.count -1
  }

  increment() {
    this.count++;
  }
}
