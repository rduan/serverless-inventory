import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';
import CreateItemModal from './createItem';
import Amplify, { API } from 'aws-amplify';
import _ from 'lodash';

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

  componentDidMount() {
    this.getItems();
  }

  render() {
    const itemData = this.state.itemData;

    return (
      <div>
        <CreateItemModal />
        <Container style={{ padding: 10 }}>
          <Card.Group>
            {_.map(itemData, ({ ID, ItemName, ItemPrice, ItemDescription }) => (
              <Card>
                <Card.Content>
                  <Card.Header>{ItemName}</Card.Header>
                  <Card.Meta>£ {ItemPrice}</Card.Meta>
                  <Card.Description>{ItemDescription}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default ItemDashboard;
