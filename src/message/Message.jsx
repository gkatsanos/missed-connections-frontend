import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";

const Message = (props) => {
  const card = (
    <Card raised={true}>
      <CardHeader title={props.message.title} />
      <CardContent>
        <Typography variant="body2" component="p">
          {props.message.body}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
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
