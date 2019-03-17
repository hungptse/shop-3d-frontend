import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";

class AdditionalInfo extends Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        <Container fluid textAlign="justified">
          <Header as="h5"><Icon name='address card outline' /> Model: {product.model}</Header>
          <Header as="h5"><Icon name='align center' /> Height: {product.height} cm || Weight: {product.weight} kg </Header>
          <Header as="h5"><Icon name='comments outline' /> Description: {product.description} </Header>
        </Container>
      </div>
    );
  }
}

export default AdditionalInfo;
