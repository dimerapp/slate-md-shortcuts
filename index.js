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
   * @param  {Object}   event
   * @param  {Object}   change
   *
   * @return {void}
   */
  markAsBold (event, change) {
    event.preventDefault()
    change.wrapText('**')
  },

  /**
   * Marks the current selection as italics
   *
   * @method markAsItalics
   *
   * @param  {Object}   event
   * @param  {Object}      change
   *
   * @return {void}
   */
  markAsItalics (event, change) {
    event.preventDefault()
    change.wrapText('*')
  },

  /**
   * Marks the current selection as anchor
   *
   * @method markAsAnchor
   *
   * @param  {Object}   event
   * @param  {Object}   change
   *
   * @return {void}
   */
  markAsAnchor (event, change) {
    event.preventDefault()

    const prefix = event.shiftKey ? '!' : ''
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
   * @param  {Object}   event
   * @param  {Object}         change
   *
   * @return {void}
   */
  markAsInlineCode (event, change) {
    event.preventDefault()
    change.wrapText('`')
  },

  /**
   * Marks the selection as inline code
   *
   * @method markAsInlineCode
   *
   * @param  {Object}   event
   * @param  {Object}         change
   *
   * @return {void}
   */
  markAsStrike (event, change) {
    event.preventDefault()
    change.wrapText('~~')
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
  handleTab (event, change, arrowName) {
    event.preventDefault()

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
      return true
    }

    if (!event.metaKey) {
      return false
    }

    switch (event.key) {
      case 'b':
        this.markAsBold(event, change)
        return 'bold'
      case 'e':
        if (!event.shiftKey) {
          return false
        }
        this.markAsStrike(event, change)
        return 'emphasis'
      case 'i':
        this.markAsItalics(event, change)
        return 'emphasis'
      case 'k':
        this.markAsAnchor(event, change)
        return event.shiftKey ? 'image' : 'url'
      case '/':
        this.markAsInlineCode(event, change)
        return 'inlineCode'
    }
  }
}
