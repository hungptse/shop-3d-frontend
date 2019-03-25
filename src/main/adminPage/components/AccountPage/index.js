import React, { Component } from "react";
import { Grid, Table, Icon, Menu, Label } from "semantic-ui-react";
import { get } from "../../../../utils/ApiCaller";
import { ACCOUNT } from "../../../../utils/ApiEndpoint";
import { Drawer, List, Avatar, Divider, Col, Row, Popover } from "antd";
import TimeAgo from "timeago-react";
import LocalStorage from "../../../../utils/LocalStorage";

class AccountMange extends Component {
  state = { accounts: [], accountSelected: {} };
  async componentDidMount() {
    await get(ACCOUNT(), {}, {}, {}).then(res => {
      this.setState({ accounts: res.data });
    });
  }

  viewProfile = username => {
    this.state.accounts.map(account => {
      if (account.username === username) {
        this.setState({ accountSelected: account });
        this.setState({ visible: true });
      }
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const pStyle = {
      fontSize: 16,
      color: "rgba(0,0,0,0.85)",
      lineHeight: "24px",
      display: "block",
      marginBottom: 16
    };

    const DescriptionItem = ({ title, content }) => (
      <div
        style={{
          fontSize: 14,
          lineHeight: "22px",
          marginBottom: 7,
          color: "rgba(0,0,0,0.65)"
        }}
      >
        <p
          style={{
            marginRight: 8,
            display: "inline-block",
            color: "rgba(0,0,0,0.85)"
          }}
        >
          {title}:
        </p>
        {content}
      </div>
    );

    const { accounts, accountSelected } = this.state;
    return (
      <div>
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <p style={{ ...pStyle, marginBottom: 24 }}>User Profile</p>
          <p style={pStyle}>Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Full Name"
                content={accountSelected.name}
              />{" "}
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Username"
                content={accountSelected.username}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Address"
                content={accountSelected.address}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Birthday"
                content={new Date(accountSelected.birthDate).toDateString()}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Joined"
                content={
                  <Popover
                    content={new Date(
                      accountSelected.createAt
                    ).toLocaleString()}
                    title="Joined at"
                  >
                    <TimeAgo datetime={accountSelected.createAt} locale="en" />
                  </Popover>
                }
              />
            </Col>
          </Row>
          <Divider />
          <p style={pStyle}>Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content={accountSelected.email} />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Phone Number"
                content={accountSelected.phone}
              />
            </Col>
          </Row>
          <Divider />
          {/* <p style={pStyle}>History Order</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Position" content="Programmer" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Responsibilities" content="Coding" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Department" content="AFX" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Skills"
                content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
              />
            </Col>
          </Row> */}
        </Drawer>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <Table padded="very" selectable>
                <Table.Header fullWidth>
                  <Table.Row>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {accounts.map(account => {
                    if (account.username !== LocalStorage.getSub()) {
                      return (
                        <Table.Row
                          key={account.username}
                          onClick={() => this.viewProfile(account.username)}
                        >
                          <Table.Cell>{account.username}</Table.Cell>
                          <Table.Cell>{account.name}</Table.Cell>
                          <Table.Cell>{account.email}</Table.Cell>
                          <Table.Cell>{account.phone}</Table.Cell>
                        </Table.Row>
                      );
                    }
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AccountMange;
