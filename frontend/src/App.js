import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: {
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      },
      data2: {
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      },
      data3: {
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      },
      data4: {
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      }
    };
  }
  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(data => this.setState({ 
	data1: { 
          name: "sensor1",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor1").map(obj => [obj.time, obj.sensor_name, obj.value, obj.id])
        },
	data2: { 
          name: "sensor2",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor2").map(obj => [obj.time, obj.sensor_name, obj.value, obj.id])
        },
	data3: { 
          name: "sensor3",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor3").map(obj => [obj.time, obj.sensor_name, obj.value, obj.id])
        },
	data4: { 
          name: "sensor4",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor4").map(obj => [obj.time, obj.sensor_name, obj.value, obj.id])
        }
      }));
  }
  render() {
    return (
	<div>
          <ChartContainer timeRange={new TimeRange([1549825200,1550100000])} width={"1200"}>
            <ChartRow height="800">
              <YAxis id="axis1" label="Y" min={-40} max={400} width="60" type="linear" format="$,.2f"/>
                <Charts>
                  <LineChart axis="axis1" series={new TimeSeries(this.state.data1)}/>
                  <LineChart axis="axis1" series={new TimeSeries(this.state.data2)}/>
                  <LineChart axis="axis1" series={new TimeSeries(this.state.data3)}/>
                  <LineChart axis="axis1" series={new TimeSeries(this.state.data4)}/>
                </Charts>
            </ChartRow>
          </ChartContainer>
	</div>
    );
  }
}


export default App;
