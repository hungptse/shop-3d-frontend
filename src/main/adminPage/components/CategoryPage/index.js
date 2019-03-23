import React, { Component } from "react";
import {
  Grid,
  Table,
  Icon,
  Menu,
  Button,
  Modal,
  Segment,
  Header,
  Form,
  Input
} from "semantic-ui-react";
import { get, put } from "../../../../utils/ApiCaller";
import { PUBLIC_LIST_CATE, CATE_CHANGE_NAME } from "../../../../utils/ApiEndpoint";
import { notification } from "antd";

class CategoryManage extends Component {
  state = {
    cates: [],
    cateSelected: {
      product: []
    },
    cateName : ""
  };
  async componentDidMount() {
    await get(PUBLIC_LIST_CATE(), {}, {}).then(res => {
      this.setState({ cates: res.data });
    });
  }

  viewDetailCate = value => {
    this.state.cates.map(cate => {
      if (cate.id === value) {
        this.setState({ cateSelected: cate, cateName : cate.name });
      }
    });
  };

   saveName = async () => {
    var id = this.state.cateSelected.id;
    await put(CATE_CHANGE_NAME(id),{
      name : this.state.cateName
    },{},{}).then(res => {
      this.setState({
        cates: this.state.cates.map(cate => cate.id === id ? {...cate, name : this.state.cateName} : cate)
      });
      this.setState({
        cateSelected : {...this.state.cateSelected, name : this.state.cateName}
      });
      notification.success({
        message: "Category Updated ",
        placement: "topRight"
      });
    });
  }

  render() {
    const { cates, cateSelected, cateName } = this.state;
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column width={16}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={8}>
                  <Table padded="very" selectable>
                    <Table.Header fullWidth>
                      <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Product Quantity</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {cates.map(cate => {
                        return (
                          <Table.Row
                            key={cate.id}
                            as="tr"
                            onClick={() => this.viewDetailCate(cate.id)}
                            warning={cate.product.length === 0}
                          >
                            <Table.Cell>{cate.id}</Table.Cell>
                            <Table.Cell>{cate.name}</Table.Cell>
                            <Table.Cell>{cate.product.length}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>

                    <Table.Footer>
                      <Table.Row>
                        <Table.HeaderCell colSpan="12">
                          <Menu floated="right" pagination>
                            <Menu.Item as="a" icon>
                              <Icon name="chevron left" />
                            </Menu.Item>
                            <Menu.Item as="a">1</Menu.Item>
                            <Menu.Item as="a">2</Menu.Item>
                            <Menu.Item as="a">3</Menu.Item>
                            <Menu.Item as="a">4</Menu.Item>
                            <Menu.Item as="a" icon>
                              <Icon name="chevron right" />
                            </Menu.Item>
                          </Menu>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                </Grid.Column>
                <Grid.Column width={8}>
                  {cateSelected.name !== undefined ? (
                    <Segment>
                      <Grid container>
                        <Grid.Row centered>
                          <Header as="h3">
                            Category "{cateSelected.name}"
                          </Header>
                        </Grid.Row>
                        <Grid.Row>
                          <Form>
                            <Form.Group inline>
                              <Form.Input value={cateName} label="Caterogy Name" onChange={(e) =>this.setState({cateName : e.target.value})}/>
                              <Form.Button content="Save" basic onClick={this.saveName}/>
                            </Form.Group>
                          </Form>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  ) : (
                    <div />
                  )}

                  {cateSelected.product.length !== 0 ? (
                    <Table padded="very" selectable>
                      <Table.Header fullWidth>
                        <Table.Row>
                          <Table.HeaderCell>ID</Table.HeaderCell>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {cateSelected.product.map(product => {
                          return (
                            <Table.Row key={product.id}>
                              <Table.Cell>{product.id}</Table.Cell>
                              <Table.Cell>{product.name}</Table.Cell>
                              <Table.Cell>{product.quantity}</Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>

                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan="12">
                            <Menu floated="right" pagination>
                              <Menu.Item as="a" icon>
                                <Icon name="chevron left" />
                              </Menu.Item>
                              <Menu.Item as="a">1</Menu.Item>
                              <Menu.Item as="a">2</Menu.Item>
                              <Menu.Item as="a">3</Menu.Item>
                              <Menu.Item as="a">4</Menu.Item>
                              <Menu.Item as="a" icon>
                                <Icon name="chevron right" />
                              </Menu.Item>
                            </Menu>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                  ) : (
                    <div />
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default CategoryManage;
