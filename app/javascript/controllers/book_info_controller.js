import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="book-info"
export default class extends Controller {
  static values = {
    randomCoverUrl: String
  }

  connect() {
    console.log("book-info stimulus controller connected.")
    this.crsfToken = document.querySelector('meta[name="csrf-token"]').content;
  }

  randomCover() {
    console.log("Random cover")
    console.log(this.randomCoverUrlValue)

    fetch(`${this.randomCoverUrlValue}`, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': this.crsfToken
        // "Content-Type": "application/json"
        // "Accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => console.log(data.default_cover))
  }
}
