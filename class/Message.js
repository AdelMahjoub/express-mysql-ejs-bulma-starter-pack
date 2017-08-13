class Message {
  constructor(props) {}

  /**
   * 
   * @param {*} props 
   */
  static notify(props) {
    return `
      <div class="notification is-${props.color}">
        <button class="delete"></button>
        <p>${props.message}</p>
      </div>
    `
  }
}

module.exports = Message;