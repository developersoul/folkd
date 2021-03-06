const TYPE = 'PROJECTS';

const initialState = {
  items: [],
  selected: {},
  variables: {
    clientId: null,
    order: [['id', 'DESC']],
    is_completed: false
  },
  filters: {
    assign_id: null,
    isCompleted: false
  },
  loading: false,
  fail: false
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case `FETCH_${TYPE}`:
      const selected = action.payload.length > 0 ? action.payload[0] : {};
      return {
        ...state,
        items: action.payload,
        loading: false,
        selected
      };
    case `FETCH_ALL_${TYPE}`:
        return {
          ...state,
          items: action.payload,
          selected: action.payload.length > 0 ? action.payload[0] : {},
          loading: false
        };
    case `SELECT_${TYPE}`:
      return {
        ...state,
        selected: action.payload,
        loading: false,
        filters: {
          isCompleted: false
        }
      };
    case `SELECT_${TYPE}_BY_ID`:
      const selectedById = state.items.filter(item => item.id == action.payload);
      return {...state, selected: selectedById[0] };
    case `SET_${TYPE}_CLIENT_ID`:
      const variables = { ...state.variables, clientId: action.payload };
      return {
        ...state,
        variables
      };
    case `ADD_${TYPE}`:
      return {
        ...state,
        items: [action.payload].concat(state.items)
      };
    case `ADD_${TYPE}_TODO`:
    console.log('add todo', action.payload);
      return {
        ...state,
        todos: [action.payload].concat(state.todos)
      };
    case `SHOW_${TYPE}_COMPLETED`:
      return {...state, filters: {...state.filters, isCompleted: action.payload }}
    default:
      return state
  }
}
