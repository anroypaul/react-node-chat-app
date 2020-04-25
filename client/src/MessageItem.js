import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";

const MessageItem = (props) => {
  return (
    <Comment>
      {/* <div className="avatar">
        <img src={faker.image.avatar()} alt={props.message.name} />
      </div> */}
      <Comment.Content>
        <Comment.Author as="span">{props.message.username}</Comment.Author>
        <Comment.Metadata>
          <span className="date">{moment(props.message.date).calendar()}</span>
        </Comment.Metadata>
        <Comment.Text>{props.message.text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default MessageItem;
