import React, { Component } from "react";
import {
  Container,
  Grid,
  Header,
  Segment,
  Image} from "semantic-ui-react";
import reactLogo from "../../../../../assets/images/react.png";
import reduxLogo from "../../../../../assets/images/redux.png";
import aspLogo from "../../../../../assets/images/asp.png";
import firebaseLogo from "../../../../../assets/images/firebase.png";

class Footer extends Component {
  render() {
    return (
      <Segment
        vertical
        style={{ background: "#f0f2f5" }}
      >
        <Container textAlign="center">
          <Grid>
            <Grid.Row textAlign="center">
              <Grid.Column>
                <Header as="h4">
                  3D Model Shop ©2019 Developed by{" "}
                  <a href="https://github.com/hungptse">HungPT</a> - PRN292
                  Project
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={8}>
              <Grid.Column>
                <Image
                  as="img"
                  alt="ASP.NET Core API"
                  size="small"
                  src={aspLogo}
                />
              </Grid.Column>
              <Grid.Column>
                <Image as="img" alt="ReactJS" size="large" src={reactLogo} />
              </Grid.Column>
              <Grid.Column>
                <Image as="img" alt="Redux" size="small" src={reduxLogo} />
              </Grid.Column>
              <Grid.Column>
                <Image
                  as="img"
                  alt="Firebase"
                  size="small"
                  src={firebaseLogo}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default Footer;
