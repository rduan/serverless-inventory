import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { API } from 'aws-amplify';
import aws_exports from './aws-exports';
import { Segment, Menu, Icon } from '../node_modules/semantic-ui-react';

import ItemDashboard from './screens/itemDashboard';

Amplify.configure(aws_exports);

let apiName = 'inventoryCRUD';
let path = '/inventory';

class App extends Component {
  componentDidMount() {
    // API.get(apiName, path).then((response) => {
    //   console.log('--------',response)
    // }).catch(err => {
    //   console.log('==== error', err);
    // });
  }

  render() {
    return (
      <Segment>
        <Menu>
          <Menu.Item name="home"><Icon name="shop" /></Menu.Item>
          <Menu.Item name="Items"></Menu.Item>
          <Menu.Item name="aboutUs"></Menu.Item>
        </Menu>
        <ItemDashboard></ItemDashboard>
      </Segment>
    );
  }
}

export default App;
