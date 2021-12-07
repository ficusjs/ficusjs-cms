export const template = `<div class="fcms-md-editor__wrapper">
  <div class="fcms-md-editor__toolbar">
    <button type="button" data-command="bold" title="bold">&#66;</button>
    <button type="button" data-command="italic" title="italic">&#73;</button>
    <button type="button" data-command="strikethrough" title="strikethrough">&#7546;</button>
    <button type="button" data-command="header1" title="heading1">&#72;<sub>1</sub></button>
    <button type="button" data-command="header2" title="heading2">&#72;<sub>2</sub></button>
    <button type="button" data-command="header3" title="heading3">&#72;<sub>3</sub></button>
    <button type="button" data-command="blockquote" title="quote">&#8220; &#8221;</button>
    <button type="button" data-command="orderedList" title="olist">&#35;</button>
    <button type="button" data-command="unorderedList" title="ulist">&#8226;</button>
    <button type="button" data-command="taskList" title="task">&#9745;</button>
    <button type="button" data-command="code" title="code">&lt;/&gt;</button>
    <button type="button" data-command="link" title="link">&#128279;</button>
    <button type="button" data-command="image" title="image">&#128247;</button>
  </div>
  <div class="fcms-md-editor__container">
    <textarea class="fcms-md-editor__textarea" aria-label="Markdown editor"></textarea>
    <div class="fcms-md-editor__preview"></div>
  </div>
</div>`
