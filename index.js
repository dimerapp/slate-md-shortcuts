/*
* slate-md-shortcuts
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const isUrl = require('is-url')

module.exports = {
  /**
   * Marks the current selection as bold
   *
   * @method markAsBold
   *
   * @param  {Object}   change
   *
   * @return {void}
   */
  markAsBold (change) {
    change.wrapText('**')
  },

  /**
   * Marks the current selection as italics
   *
   * @method markAsItalics
   *
   * @param  {Object}      change
   *
   * @return {void}
   */
  markAsItalics (change) {
    change.wrapText('*')
  },

  /**
   * Marks the current selection as anchor
   *
   * @method markAsAnchor
   *
   * @param  {Object}     change
   * @param  {String}     prefix
   *
   * @return {void}
   */
  markAsAnchor (change, prefix = '') {
    const selectedText = change.value.fragment.text || ''
    const isValidUrl = selectedText && isUrl(selectedText)

    if (isValidUrl) {
      change.insertText(`${prefix}[](${selectedText})`)
    } else {
      change.insertText(`${prefix}[${selectedText}]()`)
    }

    /**
     * Always calculate the anchorOffset after calling `insertText`
     * otherwise offset will be incorrect
     */
    const currentOffset = change.value.selection.anchorOffset

    /**
     * After inserting the text, the anchor offset will be edge of
     * the text, so need to adjust the cursor, so that the
     * user can start typing right away.
     */
    const moveToOffset = selectedText
      ? (isValidUrl
        ? currentOffset - selectedText.length - 3
        : currentOffset - 1
      )
      : currentOffset - 3

    change.moveOffsetsTo(moveToOffset)
  },

  /**
   * Marks the selection as inline code
   *
   * @method markAsInlineCode
   *
   * @param  {Object}         change
   *
   * @return {void}
   */
  markAsInlineCode (change) {
    change.wrapText('`')
  },

  /**
   * Handles the tab key
   *
   * @method handleTab
   *
   * @param  {Object}  event
   * @param  {Object}  change
   *
   * @return {void}
   */
  handleTab (event, change) {
    if (!event.shiftKey) {
      change.insertText('  ')
    }
  },

  /**
   * Handles the keydown event to wrap and insert text
   * for markdown shortcuts
   *
   * @method handle
   *
   * @param  {Object} event
   * @param  {Object} change
   *
   * @return {void}
   */
  handle (event, change) {
    if (event.key === 'Tab') {
      this.handleTab(event, change)
      event.preventDefault()
      return true
    }

    if (!event.metaKey) {
      return false
    }

    switch (event.key) {
      case 'b':
        this.markAsBold(change)
        return true
      case 'i':
        this.markAsItalics(change)
        return true
      case 'k':
        this.markAsAnchor(change, event.shiftKey ? '!' : '')
        return true
      case '/':
        this.markAsInlineCode(change)
        return true
    }
  }
}
