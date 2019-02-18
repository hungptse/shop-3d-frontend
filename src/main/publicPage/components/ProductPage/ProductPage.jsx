import React, { Component } from 'react';
import logo from "../../../../assets/images/logo.png";
import Footer from "../UI/Footer.jsx";
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Image,
    Item,
    Menu,
    Button,
} from 'semantic-ui-react'

class ProductPage extends Component {
    render() {
        return (
            <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          3D Model Shop
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
        <Menu.Item as='a'>Product</Menu.Item>

        {/* <Dropdown item simple text='Dropdown'>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </Container>
    </Menu>
    <Container style={{ marginTop: '7em', height : '1000px'}}>
      <Header as='h1'>Product</Header>
      <Grid columns={3} divided>
    <Grid.Row>
      <Grid.Column>
        <Image src={logo} />
      </Grid.Column>
      <Grid.Column>
        <Image src={logo} />
      </Grid.Column>
      <Grid.Column>
        <Image src={logo} />
        
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
    </Container>
    <Footer/>
  </div>
  );}
}

export default ProductPage;