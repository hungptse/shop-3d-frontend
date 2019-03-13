import React, { Component } from "react";
import { Grid, Table, Icon, Menu, Button } from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { PUBLIC_LIST_CATE } from "../../../../utils/ApiEndpoint";

class CategoryManage extends Component {
  state = { cates: [], products : [] };
  componentDidMount() {
    get(PUBLIC_LIST_CATE(), {}, {}).then(res => {
      this.setState({ cates: res.data });
    });
  }

  viewDetailCate = (value) => {
    this.state.cates.map((cate) => {
      if (cate.id === value) {
        this.setState({products : cate.product})
      }
    })
  }

  render() {
    const { cates, products } = this.state;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column width={13}>
            {/* <AddProduct /> */}
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column width={products.length === 0 ? 16 : 6}>
                  <Table padded="very" selectable >
                    <Table.Header fullWidth >
                      <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {cates.map(cate => {
                        return (
                          <Table.Row key={cate.id} as="tr" onClick={() => this.viewDetailCate(cate.id)} >
                            <Table.Cell>{cate.id}</Table.Cell>
                            <Table.Cell>{cate.name}</Table.Cell>
                            <Table.Cell collapsing>
                              <Button
                                basic
                                color="teal"
                                icon="edit outline"
                                content="Edit Catelogy"
                              />
                            </Table.Cell>
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
                <Grid.Column width={10}>
                  <Table padded="very" selectable >
                    <Table.Header fullWidth>
                      <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {products.map(product => {
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
