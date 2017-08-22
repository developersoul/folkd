import apolloFetch from '../lib/apollo_fetch';
import { getClientProjectsQuery } from '../queries/projectQueries';

const TYPE = 'PROJECTS';

const failAction = { type: `FAIL_${TYPE}` };
const loadingAction = { type: `LOADING_${TYPE}` };

export function getProjects(variables) {
  const action = (dispatch) => {
    dispatch(loadingAction);
    return apolloFetch({ query: getClientProjectsQuery, variables })
    .then(res => {
      dispatch({ type: `FETCH_${TYPE}`, payload: res.data.projects });
      return res;
    })
    .catch(err => {
      dispatch( failAction );
    });
  }

  return action;
}

export function setClientId(id) {
  const action = (dispatch) => {
    return new Promise((resolve) => {
      dispatch({ type: `SET_${TYPE}_CLIENT_ID`, payload: id });
      return resolve({ type: `SET_${TYPE}_CLIENT_ID`, payload: id });
    })
  }
  return action;
}

export function addClient() {

}

export function updateClient() {

}
