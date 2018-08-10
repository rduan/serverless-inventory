import React, { Component } from 'react';
import { Form, Modal, Button, Container } from 'semantic-ui-react';

class CreateItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.h
  }

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = event => {};

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>+ Add Item</Button>}
        closeIcon={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add an Item</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group unstackable widths={2}>
              <Form.Input
                name="itemName"
                label="Item Name"
                placeholder="Enter Item Name..."
                onChange={this.handleChange}
              />
              <Form.Input
                name="itemPrice"
                label="Item Price"
                placeholder="Enter Item Price..."
                onChange={this.handleChange}
                type="number"
              />
            </Form.Group>
            <Form.TextArea
              name="item_description"
              label="Item Description"
              placeholder="Add a Description of the Item..."
              onChange={this.handleChange}
            />
            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CreateItemModal;