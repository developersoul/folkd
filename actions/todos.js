import apolloFetch from '../lib/apollo_fetch';

import {
  getTodoQuery,
  addTodoMutation,
  updateTodoMutation
} from './queries/todoQueries';

import {
  updateAttachmentMutation
} from './queries/attachmentQueries';

import {
  addStepMutation
} from './queries/stepQueries';

const TYPE = 'TODOS';
const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };
const uploadingAction = { type: `UPLOADING_${TYPE}_ATTACHMENT` };

export function getTodo(id) {
  const action = (dispatch) => {
    const variables = { id };
    return apolloFetch({ query: getTodoQuery, variables })
    .then(res => {
      dispatch({ type: `FETCH_${TYPE}`, payload: res.data.todo });
      return res;
    });
  }

  return action;
}

export function addTodo(variables = {}) {
  const action = (dispatch) => {
    return apolloFetch({ query: addTodoMutation, variables })
    .then(res => {

      if(res.errors || res.data.createTodo == null) {
        dispatch(failAction);
        return null;
      }
      dispatch({ type: `ADD_${TYPE}`, payload: res.data.createTodo });
      return res.data.createTodo;
    })
    .catch(err => console.log(err));
  }

  return action;
}

export function addTodoStep(variables) {
  const action = (dispatch) => {
    return apolloFetch({ query: addStepMutation, variables })
    .then(res => {
      dispatch({ type: `ADD_${TYPE}_STEP`, payload: res.data.createStep });
      return res.data.createStep;
    });
  }

  return action;
}

export function addStepAttachment(attachment) {
  const action = (dispatch) => {
    return dispatch({ type: `ADD_${TYPE}_STEP_ATTACHMENT`, payload: attachment });
  }

  return action;
}

export function addTodoAttachment(attachment) {
  const action = (dispatch) => {
    return dispatch({ type: `ADD_${TYPE}_ATTACHMENT`, payload: attachment });
  }

  return action;
}

export function updateTodoAttachment(variables) {
  const action = dispatch => {
    return apolloFetch({query: updateAttachmentMutation, variables})
      .then(res => {
        dispatch({ type: `ADD_${TYPE}_ATTACHMENT`, payload: res.data.updateAttachment });
        return res.data.updateAttachement;
      })
  }

  return action;
}

export function completeTodo(todo) {

  const action = (dispatch) => {
    const variables = {...todo, is_completed: true };
    return apolloFetch({ query: updateTodoMutation, variables })
    .then(res => {
      dispatch({ type: `UPDATE_${TYPE}_ITEM`, payload: res.data.updateTodo });
      return res;
    });
  }

  return action;
}

export function cleanTodo() {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `CLEAN_${TYPE}_ITEM`});
      return resolve();
    });
  }

  return action;
}

export function uploadingTodoAttachment() {
  const action = (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(uploadingAction);
      return resolve();
    });
  }

  return action;
}
