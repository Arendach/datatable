enum Events {
  /**
   * The user entered data in the search field
   */
  SEARCH_CHANGED = 'search-changed',

  /**
   * The user provided filters
   */
  FILTERS_UPDATED = 'filters-updated',

  /**
   * The user has changed the order or sort field
   */
  SORT_CHANGED = 'sort-changed',

  /**
   * The user has changed the page
   */
  PAGE_CHANGED = 'page-changed',

  /**
   * The user selected the line by checkbox
   */
  CHANGE_SELECTED_ROWS = 'change-selected-rows',

  /**
   * The user expanded the row
   */
  ROW_EXPANDED = 'row-expanded',

  /**
   * The user collapsed the string
   */
  ROW_COLLAPSED = 'row-collapsed',

  /**
   * Data loaded from server
   */
  DATA_LOADED = 'data-loaded',

  /**
   * Data row after delete event
   */
  ROW_DELETED = 'row-deleted',

  /**
   * A constant that represents an action type for updating or modifying the selected columns in a given context.
   * This constant is typically used in scenarios such as state management systems or event handling
   * to uniquely identify the operation of changing selected columns.
   */
  CHANGE_SELECTED_COLUMNS = 'change-selected-columns',
}

export default Events
