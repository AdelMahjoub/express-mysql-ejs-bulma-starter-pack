class Form {
  constructor(props) { }

  /**
   * 
   * @param {*} props 
   */
  static input(props) {
    const label = props['label'];
    const placeholder = props['placeholder'];
    const name = props['name'];
    const icon = props['icon'];
    const type = props['type'];
    const html = `
      <label for="${name}" class="label">${label}</label>
        <div class="control has-icons-left has-icons-right">
          <input id="${name}" type="${type}" class="input" placeholder="${placeholder}" name="${name}"/>
          <span class="icon is-small is-left">
            <i class="fa fa-${icon}"></i>
          </span>
          <span class="icon is-small is-right" style="display: none;">
            <i class="fa"></i>
          </span>
        </div>`;
    return html;
  }

  /**
   * 
   */
  static help() {
    return `<p class="help"></p>`
  }

  /**
   * 
   * @param {*} props 
   */
  static submit(props) {
    return `
      <div class="control is-pulled-right">
        <button type="submit" class="button is-primary">${props.label}</button>
      </div>`
  }

  /**
   * 
   * @param {*} props 
   */
  static socialSignin(props) {
    return `
      <div className="control">
        <a href="${props.url}" class="button is-${props.color} is-outlined">
          <span class="icon is-small">
            <i class="fa fa-${props.provider}"></i>
          </span>
          <span>${props.label}</span>
        </a>
      </div>
    `
  }
}

module.exports = Form;