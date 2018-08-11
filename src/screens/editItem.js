import React, { Component } from 'react';
import { Form, Modal, Button, Container, Icon } from 'semantic-ui-react';
import Amplify, { API } from 'aws-amplify';
const uuidv1 = require('uuid/v1');
class EditItemModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = Object.assign(this.props.item);
    console.log('+++++', props.item)
  }

  deleteItem(){
    let apiName = 'inventoryCRUD';
    let path = "/inventory/object/" + this.props.item.ID
    API.del(apiName, path).then(response => {
    console.log(response)
    }).catch(error => {
        console.log(error.response)
    });
    this.props.getItems()
    this.handleClose()
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    let apiName = 'inventoryCRUD';
    let path = '/inventory';
    let editItem = {
      body: {
        ID: this.props.item.ID,
        ItemName: this.state.itemName,
        ItemPrice: this.state.itemPrice,
        ItemDescription: this.state.itemDescription
      }
    };
    API.put(apiName, path, editItem)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
    this.props.getItems();
    this.handleClose();
    event.preventDefault();
  }
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });
  render() {
    return (
      <Container style={{ padding: 10 }}>
        <Modal
          trigger={
            <Button icon onClick={this.handleOpen}>
              <Icon name="edit" />
            </Button>
          }
          open={this.state.modalOpen}
          closeIcon
          onClose={this.handleClose}
        >
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group unstackable widths={2}>
                <Form.Input
                  name="itemName"
                  label="Item Name"
                  placeholder="Edit Item Name..."
                  onChange={this.handleChange}
                  value={this.state.itemName}
                />
                <Form.Input
                  name="itemPrice"
                  label="Item Price"
                  placeholder="£0.00"
                  onChange={this.handleChange}
                  value={this.state.itemPrice}
                />
              </Form.Group>
              <Form.TextArea
                name="itemDescription"
                label="Item Description"
                placeholder="Edit Description of the Item..."
                onChange={this.handleChange}
                value={this.state.itemDescription}
              />
              <Form.Button type="submit">Submit</Form.Button>
            </Form>
          </Modal.Content>
          <Modal.Actions>
              <Button icon labelPosition='left' onClick={this.deleteItem}>
              <Icon name='delete' />
                Delete Item
              </Button>
            </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

export default EditItemModal;