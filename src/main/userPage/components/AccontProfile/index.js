import React, { Component } from "react";
import { Grid, Header, Card, Image } from "semantic-ui-react";

class AccountProfilePage extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={7}>
              <Image
                avatar
                size="large"
                src="https://avatars1.githubusercontent.com/u/25200427?s=460"
              />
            </Grid.Column>
            <Grid.Column width={9}>
              <Grid.Row centered>
                <Header as="h3">Profice Account</Header>
                
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AccountProfilePage;
