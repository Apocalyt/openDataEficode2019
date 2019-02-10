import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(data => this.setState({ data: data }));
  }
  render() {
    return (
        <div className="Data">
          <h1>Data</h1>
          {this.state.data.map(data =>
            <div key="text"> {data.sensor1} - {data.sensor2} - {data.sensor3} - {data.sensor4}</div>
          )}
        </div>
    );
  }
}


export default App;
