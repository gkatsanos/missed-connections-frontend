import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import { Helmet } from "react-helmet";
import { selectMessageById } from "./messageSelectors";
import { getMessage } from "./messageActions";

// const mapStateToProps = (state, props) => {
//   return {
//     message: selectMessageById(state, props),
//   };
// };

const MessageDetail = (props) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => selectMessageById(state, props));
  useEffect(() => {
    if (!message) {
      dispatch(getMessage(props.match.params.id));
    }
  }, [message, props.match.params.id, dispatch]);

  if (message) {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{message.title}</title>
        </Helmet>
        <Message message={message} withReadMoreButton={false} />
      </div>
    );
  } else {
    return <div>no message</div>;
  }
};

export default MessageDetail;
