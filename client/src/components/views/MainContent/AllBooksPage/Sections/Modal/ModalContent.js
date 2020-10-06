import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import Comments from "./Comments";
import RateBook from "./RateBook";

export default function RecipeReviewCard({ book, handleClose }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            alt={book.addedBy}
            aria-label="recipe"
            style={{ backgroundColor: "#eee" }}
            className={classes.avatar}
          />
        }
        action={
          <IconButton onClick={handleClose} aria-label="settings">
            <HighlightOffIcon />
          </IconButton>
        }
        title={book.addedBy}
        subheader={book.createdAt.split("").splice(0, 10)}
      />

      <CardMedia
        className={classes.media}
        image={book.image}
        title="Paella dish"
      />

      <CardContent>
        <Typography variant="caption" color="textSecondary" component="p">
          {book.category}
        </Typography>
        <Typography variant="h4" color="textPrimary" component="p">
          {book.name}
        </Typography>
        <Typography variant="h6" color="textSecondary" component="p">
          {book.author}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          {book.description}
        </Typography>
      </CardContent>

      <CardContent className={classes.card}>
        <h4>About book:</h4>
        <Typography variant="caption" color="textSecondary" component="p">
          pages: {book.pages}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          year: {book.year}
        </Typography>
      </CardContent>

      <CardContent>
        <RateBook book={book} />
      </CardContent>

      <CardActions onClick={handleExpandClick} disableSpacing>
        <Typography variant="h6" color="textPrimary" component="p">
          Comments:
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Comments book={book} />
      </Collapse>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 335,
    minWidth: '80%',
    overflowY: "scroll",
    borderRadius: "20px",
    [theme.breakpoints.up("md")]: {
    minWidth: '40%',
    maxWidth: "60%",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#00b0f6",
  },
  card: {
    padding: "0px 16px",
  },
}));
