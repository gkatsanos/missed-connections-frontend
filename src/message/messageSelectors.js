import { createSelector } from "reselect";

export const selectMessages = (state) => state.message.all;

const getParamId = (state, props) => props.match.params.id;

export const selectPage = (state) => state.message.page;

export const selectTotalNumberPages = (state) => state.message.totalPages;

export const selectIsFetching = (state) => state.message.isFetching;

export const selectMessageById = createSelector(
  [selectMessages, getParamId],
  (messages, currentId) => {
    return messages.find((message) => message._id === currentId);
  }
);
