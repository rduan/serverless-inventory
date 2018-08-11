import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';
import Amplify, { API } from 'aws-amplify';
import _ from 'lodash';
import CreateItemModal from './createItem';
import EditItemModal from './editItem'

let apiName = 'inventoryCRUD';
let path = '/inventory';

class ItemDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { itemData: {} };
  }

  getItems = () => {
    API.get(apiName, path).then(Response => {
      console.log('= get items', Response);
      this.setState({ itemData: Response.data });
    });
  };

  getItem = (id) => {
    let single_path = `/inventory/${id}`
    console.log('single_path', single_path)
    API.get(apiName, single_path).then((response) => {
      console.log('single response', response[0]);
      this.setState({
        item: response[0]
      })
    })
  }
  

  componentDidMount() {
    this.getItems();
  }

  render() {
    const itemData = this.state.itemData;

    return (
      <div>
        <CreateItemModal getItems={this.getItems}/>
        <Container style={{ padding: 10 }}>
          <Card.Group>
            {_.map(itemData, ({ ID, ItemName, ItemPrice, ItemDescription }) => (
              <Card onClick={() => this.getItem(ID)}>
                <Card.Content>
                  <Card.Header>{ItemName}</Card.Header>
                  <Card.Meta>£ {ItemPrice}</Card.Meta>
                  <Card.Description>{ItemDescription}</Card.Description>
                </Card.Content>
                <EditItemModal item={{ID,itemName:ItemName, itemPrice:ItemPrice, itemDescription:ItemDescription}} getItems={(this.getItems)} />
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default ItemDashboard;
