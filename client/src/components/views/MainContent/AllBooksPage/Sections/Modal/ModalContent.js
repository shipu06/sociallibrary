import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import './modalBar.css'
import clsx from "clsx";

import Comments from "./Comments";
import RateBook from "./RateBook";

export default function RecipeReviewCard({ book, handleClose }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, "modal-bar")}>
      <CardMedia className={classes.media} image={book.image}>
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
              <HighlightOffIcon style={{ color: "rgba(200, 200, 200)" }} />
            </IconButton>
          }
          title={book.addedBy}
          subheader={book.createdAt.split("").splice(0, 10)}
          classes={{ label: "modal-bar" }}
          style={{
            backgroundColor: "rgba(33, 33, 33, 0.7)",
            color: "rgba(232, 232, 232)",
          }}
          subheaderTypographyProps={{ style: { color: "rgba(232, 232, 232)" } }}
        />
      </CardMedia>
      <div className={classes.wrapper}>
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
          <RateBook bookId={book._id} authorRating={book.rating} />
        </CardContent>

        <Comments bookId={book._id} />
      </div>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "92vw",
    overflowY: "scroll",
    borderRadius: "20px",
    [theme.breakpoints.up("md")]: {
      width: "35vw",
    },
  },
  media: {
    height: "40vh",

    // paddingTop: "56.25%", // 16:9
  },
  wrapper: {
    padding: "8px",
  },
  avatar: {
    backgroundColor: "#00b0f6",
  },
  card: {
    padding: "0px 16px",
  },
}));
