import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: {
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      },
      series1: new TimeSeries(),
      series2: new TimeSeries(),
      series3: new TimeSeries(),
      series4: new TimeSeries()
    };
  }
  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(data => this.setState({ 
        datas: { 
          name: "Data",
          columns: ["time", "sensor_name", "value", "id"],
          points: data
        },
      }));
  }
  render() {
    return (
      <div>
        <div className="Data">
          <h1>Data</h1>
          {this.state.datas.points.map(obj =>
            <div key="data.id"> {obj.sensor_name} - {obj.value} - {obj.value_ts}</div>
          )}
        </div>
	    
{/*	<div>
          <ChartContainer timeRange={series1.timerange()} width={800}>
            <ChartRow height="200">
              <YAxis id="axis1" label="AUD" min={0.5} max={1.5} width="60" type="linear" format="$,.2f"/>
                <Charts>
                  <LineChart axis="axis1" series={series1}/>
                  <LineChart axis="axis2" series={series2}/>
                </Charts>
              <YAxis id="axis2" label="Euro" min={0.5} max={1.5} width="80" type="linear" format="$,.2f"/>
            </ChartRow>
          </ChartContainer>
	</div>
*/}
      </div>
    );
  }
}


export default App;
