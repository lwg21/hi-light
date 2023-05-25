import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="highlight"
export default class extends Controller {
  static targets = ["heart", "item"]

  static values = {
    url: String
  }

  connect() {
    this.crsfToken = document.querySelector('meta[name="csrf-token"]').content;
  }

  toggleFavorite(event) {
    fetch(`${this.urlValue}`, {method: 'PATCH', headers: {'X-CSRF-Token': this.crsfToken}})
    .then(response => response)
    .then(data => {
      this.heartTarget.classList.toggle("fa-regular");
      this.heartTarget.classList.toggle("fa-solid");
      this.heartTarget.classList.toggle("favorite-heart");
    })
  }

  deleteHighlight() {
    fetch(`${this.urlValue}`, {method: 'DELETE', headers: {'X-CSRF-Token': this.crsfToken}})
    .then(response => response)
    .then(data => {
      if (window.confirm("Are you sure?")) {
        this.element.remove();
        const count = document.querySelectorAll(".cards-quotes").length;
        document.querySelector("#highlight-no").innerText = `${count} highlight${ count === 1 ? '' : 's'}`;
      }
    })
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.itemTarget.innerHTML)
    window.alert("Copied to clipboard!");
  }
}
