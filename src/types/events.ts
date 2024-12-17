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
  ROW_SELECTED = 'row-selected',

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
}

export default Events
