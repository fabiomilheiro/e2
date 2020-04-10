import React from "react";
import { Message, Icon } from "semantic-ui-react";

const ErrorMessage = (props) => {
  return (
    <Message negative icon>
      <Icon name="frown outline" />
      <Message.Content>
        <Message.Header>{props.text}</Message.Header>
      </Message.Content>
    </Message>
  );
};

export default ErrorMessage;
