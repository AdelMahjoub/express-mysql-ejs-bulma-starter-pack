class Form {
  constructor(props) { }
  
  static input(props) {
    const label       = props['label'];
    const placeholder = props['placeholder'];
    const name        = props['name'];
    const icon        = props['icon'];
    const type        = props['type'];
    const required    = props['required'] || '';
    const pattern     = props['pattern'] || '';
    const min         = props['min'] || '';
    const max         = props['max'] || '';
    const autofocus   = props['autofocus'] || '';
    const title       = props['title'] || '';
    const html = `
      <label for="${name}" class="label">${label}</label>
        <div class="control has-icons-left has-icons-right">
          <input 
            id="${name}" 
            type="${type}" 
            class="input" 
            placeholder="${placeholder}" 
            name="${name}"
            ${required}
            ${autofocus}
            ${pattern} 
            ${title} />
          <span class="icon is-small is-left">
            <i class="fa fa-${icon}"></i>
          </span>
          <span class="icon is-small is-right" style="display: none;">
            <i class="fa"></i>
          </span>
        </div>`;
    return html;
  }

  static help() {
    return `<p class="help"></p>`
  }

  static submit(props) {
    return `
      <div>
        <button type="submit" class="button is-primary">${props.label}</button>
      </div>`
  }

  static socialSignin(props) {
    return `
      <div class="is-pulled-right">
        <a href="${props.url}" class="button is-${props.color} is-outlined">
          <span class="icon is-small">
            <i class="fa fa-${props.provider}"></i>
          </span>
          <span>${props.label}</span>
        </a>
      </div>
    `
  }

  static reCaptcha(publicKey) {
    return `
      <div class="g-recaptcha" data-sitekey="${publicKey}"></div>
    `
  }
}

module.exports = Form;