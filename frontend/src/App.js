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
            <div key="text"> {data.sensor_name} - {data.value} - {data.value_ts}</div>
          )}
        </div>
    );
  }
}


export default App;
