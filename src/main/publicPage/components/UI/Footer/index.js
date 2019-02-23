import React, { Component } from 'react';
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
} from 'semantic-ui-react'

class Footer extends Component {
    render() {
        return (
    <Segment inverted vertical style={{ margin: '2em 0em 0em'}}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          {/* <Grid.Column width={3}>
            <Header inverted as='h4' content='Quick Links' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column> */}
          <Grid.Column>
            <Header inverted as='h3' content='About Project' />
            <p>
            3D Model Shop ©2019 Developed by <a href="https://github.com/hungptse" target="_blank">HungPT</a> - PRN292 Project. Built on top of C#.NET & ReactJS.
            </p>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
        );
    }
}

export default Footer;