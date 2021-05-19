import {
  CLEANUP_POLL,
  CREATE_NON_SCHEDULED_POLL,
  CREATE_SCHEDULED_POLL,
  IS_LOADING,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  isLoading: false,
  hasCreatedNonScheduledPoll: false,
  hasCreatedScheduledPoll: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case CREATE_NON_SCHEDULED_POLL:
      return { ...state, isLoading: false, hasCreatedNonScheduledPoll: true };
    case CREATE_SCHEDULED_POLL:
      return { ...state, isLoading: false, hasCreatedScheduledPoll: true };
    case CLEANUP_POLL:
      return {
        ...state,
        isLoading: false,
        hasCreatedNonScheduledPoll: false,
        hasCreatedScheduledPoll: false,
      };

    default:
      return state;
  }
};
