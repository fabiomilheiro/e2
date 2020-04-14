import React from "react";
import { Segment, Grid, Placeholder } from "semantic-ui-react";

const LoadingTable = () => {
  return (
    <Segment raised>
      {Array.from(Array(3)).map((item, id) => {
        return (
          <Grid key={id} columns={2}>
            <Grid.Column>
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line length="long" />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Grid.Column>
            <Grid.Column>
              <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Grid.Column>
          </Grid>
        );
      })}
    </Segment>
  );
};

export default LoadingTable;
