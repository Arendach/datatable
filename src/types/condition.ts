enum Condition {
  WITHOUT = '',
  CONTAIN = 'contain',
  NOT_CONTAIN = 'not_contain',
  EQUAL = 'equal',
  NOT_EQUAL = 'not_equal',
  START_WITH = 'start_with',
  END_WITH = 'end_with',
  GREATER_THAN = 'greater_than',
  GREATER_THAN_EQUAL = 'greater_than_equal',
  LESS_THAN = 'less_than',
  LESS_THAN_EQUAL = 'less_than_equal',
  IS_EMPTY = 'is_empty',
  IS_NOT_EMPTY = 'is_not_empty',
  BETWEEN = 'between',
  IN = 'in',
}

export default Condition
