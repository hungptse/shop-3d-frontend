import React, { Component } from 'react';
import { Card, Reveal, Button, Icon, Image } from 'semantic-ui-react';

class Product extends Component {
    render() {
        return (
            <Card>
            <Reveal animated="move" instant>
              <Reveal.Content visible>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/nan.jpg"
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/chris.jpg"
                />
              </Reveal.Content>
            </Reveal>
            <Card.Content>
              <Card.Header>GUNDAM BANDAI</Card.Header>
              <Card.Meta><Icon name="dollar sign" />30</Card.Meta>
              <Card.Description>
                RG 19 MBF-P02 Astray Red Frame
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button animated="arrow right" color="blue" fluid>
                <Button.Content visible>
                  <Icon name="add to cart" />
                </Button.Content>
                <Button.Content hidden>Add to cart</Button.Content>
              </Button>
            </Card.Content>
          </Card>
        );
    }
}

export default Product;