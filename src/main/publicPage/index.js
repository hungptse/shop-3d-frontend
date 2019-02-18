import React from "react";
import { Link } from "react-router-dom";
import { renderRoutes } from "../../components/route";
import ThemeRoutes from "./routing.jsx";
import logo from "../../assets/images/logo.png";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'



class Fulllayout extends React.Component {

  state = { fixed: false,  activeItem: 'Home' }


  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  render() {
    const { fixed } = this.state
    return (     
      <Visibility
          onBottomVisible={this.hideFixedMenu}
          onBottomVisibleReverse={this.showFixedMenu}
        > 
      <Segment inverted
      textAlign='center'
      style={{ minHeight: 700, padding: '1em 0em' }}
      vertical>
      <Menu fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'>
              <Container>
              <Menu.Item>
                <img src={logo} />
              </Menu.Item>
                {ThemeRoutes.map((data, key) => {
                  if (!data.redirect) {
                      return (
                  <Menu.Item active={this.state.activeItem ===  data.name} key={key} onClick={() => this.setState({activeItem : data.name })}>
                    <Link to={data.path}>{data.name}</Link>
                  </Menu.Item>
                );
              }
                })}
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    Log in
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                  </Button>
                </Menu.Item>

              </Container>
      </Menu>
      <Container text>
    <Header
      as='h1'
      content='3D Model Shop'
      inverted
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Button primary size='huge'>
    <Link to='product'>Shop Now</Link>
      <Icon name='right arrow' />
    </Button>
  </Container>
    </Segment>
    <Segment
    textAlign='center'
    style={{ minHeight: 700, padding: '1em 0em' }}
    vertical>
    {renderRoutes(ThemeRoutes, this.props.match.path)}
  </Segment>
  <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
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
    </Visibility>
    );
  }
}
export default Fulllayout;
