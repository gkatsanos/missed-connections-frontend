import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import TimeAgo from "react-timeago";

const Message = (props) => {
  const card = (
    <Card raised={true}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {props.message.user.firstName[0]}
            {props.message.user.lastName[0]}
          </Avatar>
        }
        title={props.message.user.username}
        subheader={<TimeAgo date={props.message.seenDate} />}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {props.message.body}
        </Typography>
      </CardContent>
      <CardActions>{props.message.location.geocoded}</CardActions>
    </Card>
  );
  return props.withReadMoreButton ? (
    <Link
      underline="none"
      component={RouterLink}
      to={`/message/${props.message._id}`}
    >
      {card}
    </Link>
  ) : (
    card
  );
};

export default Message;
