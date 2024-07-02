import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import StreamlinedTable from './components/StreamlinedTable'
import {generateRandomObjs, NUM, formatDollars, WORDNUM} from './common/utils'
import {StreamlinedTable} from './components/Table'

class App extends Component {
  constructor(props) {
    super(props)
  }

  generateData() {
        // TODO maybe seperate the headers from the autoGenerated information....
        let generateData = [{
          field: "firstName",
          maxSize: 12,
          minSize: 4
        }, {
          field: "lastName",
          maxSize: 12,
          minSize: 4
        }, {
          field: "phone",
          type: WORDNUM,
          maxSize: 10,
          minSize: 10,
          format: phone => {
            let s = String(phone)
            return s.substring(0, 3) + "-" + s.substring(3, 6) + "-" + s.substring(6)
          }
        }, {
          field: "address",
          maxSize: 40,
          minSize: 12
        }, {
          field: "state",
          maxSize: 20,
          minSize: 5
        }, {
          field: "age",
          minAmount: 10,
          maxAmount: 100,
          type: NUM
        }, {
          field: "salary",
          maxSize: 9,
          minSize: 4,
          type: NUM,
          format: formatDollars
        }]
        return generateData
  }

  headers() {
    // TODO maybe seperate the headers from the autoGenerated information....
    let that = this
    let headers = [{
      name: "First Name",
      field: "firstName",
    }, {
      name: "Last Name",
      field: "lastName",
    }, {
      name: "Phone",
      field: "phone",
    }, {
      name: "Address",
      field: "address",
    }, {
      name: "State",
      field: "state",
    }, {
      name: "Age",
      field: "age",
    }, {
      name: "Salary",
      field: "salary"
    }, {
      name: "Delete",
      key: "id",
      // SHOW seperate the Delete Button from the Props Component
      component: function (props) {
          let deleteTheObject = () => {
            let pagination = {remove:() => 1}
            pagination.remove(props.data.id)
          }
          return <button className="setTableComponet" onClick={() => deleteTheObject()}>DELETE</button>
        }
    }]
    return headers
  }

  render() {
    // SHOW how to make the table into a sortable table with the headers
    // SHOW how to add in component elements to change the size of the cell in the table
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <StreamlinedTable
            fetchData={(num) => {
              return new Promise((resolver, rejector) => {
                resolver(generateRandomObjs(this.generateData(), num))
              })
            }}
            headers={this.headers()}
            id="id" />
        </div>
        <div className="bottom-page"/>
      </div>
    );
  }
}

export default App;
