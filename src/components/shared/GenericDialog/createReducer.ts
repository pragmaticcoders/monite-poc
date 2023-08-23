import cloneDeep from 'lodash/cloneDeep';

type Action = {
  type: string;
  dialogContext?: any;
};

type Handlers = {
  [key: string]: (state: any, action: Action) => any;
};

export const createReducer = <T>(initialState: T, handlers: Handlers) => {
  return (state = initialState, action: Action) => {
    if (handlers[action.type]) {
      return cloneDeep(handlers[action.type](state, action));
    }

    return state;
  };
};
