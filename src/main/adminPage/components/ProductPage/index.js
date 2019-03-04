import React, { Component } from "react";
import { Table, Image, Header, Button, Form, Grid } from "semantic-ui-react";

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" }
];

class ProductManage extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Column>ABC</Grid.Column>
          <Grid.Column>DEF</Grid.Column>
        </Grid>
        {/* <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="First name" placeholder="First name" />
            <Form.Input fluid label="Last name" placeholder="Last name" />
            <Form.Select
              fluid
              label="Gender"
              options={options}
              placeholder="Gender"
            />
          </Form.Group>
          <Form.Group inline>
            <label>Size</label>
            <Form.Radio
              label="Small"
              value="sm"
              checked={value === "sm"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Medium"
              value="md"
              checked={value === "md"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Large"
              value="lg"
              checked={value === "lg"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.TextArea
            label="About"
            placeholder="Tell us more about you..."
          />
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Form.Button>Submit</Form.Button>
        </Form> */}
        <Button basic>Add Product</Button>
      </div>
    );
  }
}

export default ProductManage;
