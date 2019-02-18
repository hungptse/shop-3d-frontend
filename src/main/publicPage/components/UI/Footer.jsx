import React, { Component } from 'react';
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    List,
    Menu,
    Segment,
} from 'semantic-ui-react'

class Footer extends Component {
    render() {
        return (
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em', bottom : '0' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Quick Links' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={12}>
            <Header inverted as='h3' content='Contact' />
            <p>
            3D Model Shop ©2019 Developed by HungPT - PRN292 Project. Built on top of C#.NET & ReactJS.
            </p>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
        );
    }
}

export default Footer;