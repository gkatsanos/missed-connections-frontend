import { createSelector } from "reselect";

const selectMessages = (state) => state.message.all;

const getParamId = (state, props) => props.match.params.id;

export const selectMessageById = createSelector(
  [selectMessages, getParamId],
  (messages, currentId) => {
    return messages.find((message) => message._id === currentId);
  }
);
