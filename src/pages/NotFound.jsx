import React from "react";
import { Grid } from "semantic-ui-react";
import "../styles/pages/NotFound.scss";

const NotFound = () => {
  return (
    <Grid centered className="not-found">
      <Grid.Row>
        <Grid.Column>
          <h1>Not found</h1>
          <p>The page was not found.</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NotFound;
