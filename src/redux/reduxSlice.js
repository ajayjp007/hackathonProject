import { createSlice } from '@reduxjs/toolkit';
import { makeNotionQueryApi } from '../apiCalls/api';
// import _ from 'lodash';

const initialState = {
  currentThreadsState: [
    {
      currentState: [],
      numberOfInputsRequired: 1,
      threadName: 'Notion',
    },
    {
      currentState: [],
      numberOfInputsRequired: 2,
      threadName: 'KYC Documentation',
    },
    { currentState: [], numberOfInputsRequired: 1, threadName: 'Database' },
    {
      currentState: [],
      numberOfInputsRequired: 1,
      threadName: 'RBI Circulars',
    },
  ],
  threadList: [
    'Engineering Notion',
    'KYC Documentation',
    'Database',
    'RBI Circulars',
  ],
  currentOpenThread: 0,
  createNewThreadClick: false,
};

const reduxSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    rbiCircularQueryAction: (state, action) => {
      let updatedThreadState = state.currentThreadsState;
      updatedThreadState = state.currentThreadsState.map((thread) => {
        if (thread.threadName === action.payload.threadName) {
          return {
            currentState: [
              ...thread.currentState,
              { question: action.payload.question, answer: '' },
            ],
            numberOfInputsRequired: thread.numberOfInputsRequired,
            threadName: thread.threadName,
          };
        } else {
          return thread;
        }
      });
      state.currentThreadsState = updatedThreadState;
    },
    updateRbiCircularAction: (state, action) => {
      let updatedThreadState = state.currentThreadsState;
      let rbiCirculars = state.currentThreadsState[3].currentState;

      rbiCirculars.pop();
      rbiCirculars.push({
        question: action.payload.question,
        answer: action.payload.answer,
      });

      updatedThreadState[3].currentState = rbiCirculars;
      state.currentThreadsState = updatedThreadState;
    },
    updateDbQueryAnswerAction: (state, action) => {
      let updatedThreadState = state.currentThreadsState;
      let dbThreadList = state.currentThreadsState[2].currentState;

      dbThreadList.pop();
      dbThreadList.push({
        question: action.payload.question,
        answer: action.payload.answer,
      });

      updatedThreadState[2].currentState = dbThreadList;
      state.currentThreadsState = updatedThreadState;
    },
    dbQueryAction: (state, action) => {
      let updatedThreadState = state.currentThreadsState;
      updatedThreadState = state.currentThreadsState.map((thread) => {
        if (thread.threadName === action.payload.threadName) {
          return {
            currentState: [
              ...thread.currentState,
              { question: action.payload.question, answer: '' },
            ],
            numberOfInputsRequired: thread.numberOfInputsRequired,
            threadName: thread.threadName,
          };
        } else {
          return thread;
        }
      });
      state.currentThreadsState = updatedThreadState;
    },
    createNewThreadAction: (state, action) => {
      let newThreadState = state.currentThreadsState;
      newThreadState = [...newThreadState, action.payload];
      state.currentThreadsState = newThreadState;
    },
    AddItemToThreadListAction: (state, action) => {
      let newList = [...state.threadList, action.payload];
      state.threadList = newList;
    },
    changeCurrentOpenThreadAction: (state, action) => {
      state.currentOpenThread = action.payload;
    },
    changeCreateNewThreadClick: (state, action) => {
      state.createNewThreadClick = action.payload;
    },
    updateAnswerAction: (state, action) => {
      let updatedThreadState = state.currentThreadsState;
      let notionThreadList = state.currentThreadsState[0].currentState;

      notionThreadList.pop();
      notionThreadList.push({
        question: action.payload.question,
        answer: action.payload.answer,
      });

      updatedThreadState[0].currentState = notionThreadList;
      state.currentThreadsState = updatedThreadState;
    },
    documentationQueryAction: (state, action) => {
      let updatedThreadState = state.currentThreadsState;
      updatedThreadState = state.currentThreadsState.map((thread) => {
        if (thread.threadName === action.payload.threadName) {
          return {
            currentState: [
              ...thread.currentState,
              { question: action.payload.question, answer: '' },
            ],
            numberOfInputsRequired: thread.numberOfInputsRequired,
            threadName: thread.threadName,
          };
        } else {
          return thread;
        }
      });
      state.currentThreadsState = updatedThreadState;
    },
    updateDocumentQueryAnswerAction: (state, action) => {
      let updatedThreadState = state.currentThreadsState;
      let notionThreadList = state.currentThreadsState[1].currentState;

      notionThreadList.pop();
      notionThreadList.push({
        question: action.payload.question,
        answer: action.payload.answer,
      });

      updatedThreadState[1].currentState = notionThreadList;
      state.currentThreadsState = updatedThreadState;
    },
    submitQueryAction: (state, action) => {
      let updatedThreadState = state.currentThreadsState;
      updatedThreadState = state.currentThreadsState.map((thread) => {
        if (thread.threadName === action.payload.threadName) {
          return {
            currentState: [
              ...thread.currentState,
              { question: action.payload.question, answer: '' },
            ],
            numberOfInputsRequired: thread.numberOfInputsRequired,
            threadName: thread.threadName,
          };
        } else {
          return thread;
        }
      });
      state.currentThreadsState = updatedThreadState;
    },
  },
});

export const createThread = ({ name, selectedThreadType }) => {
  return async (dispatch) => {
    // const response = uploadContractApi(files);
    if (selectedThreadType === 'url') {
      dispatch(
        createNewThreadAction({ currentState: [], numberOfInputsRequired: 1 })
      );
    } else {
      dispatch(
        createNewThreadAction({ currentState: [], numberOfInputsRequired: 2 })
      );
    }
    dispatch(AddItemToThreadListAction(name));
  };
};

export const submitQuery = ({ threadName, question }) => {
  return async (dispatch) => {
    dispatch(submitQueryAction({ threadName, question }));
  };
};

const { actions, reducer } = reduxSlice;
export const {
  AddItemToThreadListAction,
  changeCurrentOpenThreadAction,
  changeCreateNewThreadClick,
  createNewThreadAction,
  submitQueryAction,
  updateAnswerAction,
  documentationQueryAction,
  updateDocumentQueryAnswerAction,
  dbQueryAction,
  updateDbQueryAnswerAction,
  updateRbiCircularAction,
  rbiCircularQueryAction,
} = actions;
export default reducer;
