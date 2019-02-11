import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, styler, Resizable, Legend } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";

const style1 = styler([
{key: "value", color: "#F68B24", width: 2}
]);
const style2 = styler([
{key: "value", color: "steelblue", width: 2}
]);
const style3 = styler([
{key: "value", color: "red", width: 2}
]);
const style4 = styler([
{key: "value", color: "green", width: 2}
]);

const legendStyle = styler([
    {key: "sensor1", color: "#F68B24", width: 2},
    {key: "sensor2", color: "steelblue", width: 2},
    {key: "sensor3", color: "red", width: 2},
    {key: "sensor4", color: "green", width: 2}
]);


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
      },
      startDate: new Date(1549825200*1000),
      endDate: new Date()
    };
  }
  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(data => this.setState({ 
	data1: { 
          name: "sensor1",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor1").map(obj => [new Date(obj.time*1000), obj.sensor_name, obj.value, obj.id])
        },
	data2: { 
          name: "sensor2",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor2").map(obj => [new Date(obj.time*1000), obj.sensor_name, obj.value, obj.id])
        },
	data3: { 
          name: "sensor3",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor3").map(obj => [new Date(obj.time*1000), obj.sensor_name, obj.value, obj.id])
        },
	data4: { 
          name: "sensor4",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor4").map(obj => [new Date(obj.time*1000), obj.sensor_name, obj.value, obj.id])
        },
        endDate: new Date(data.filter(obj => obj.sensor_name === "sensor1").reduce(function(prev, curr){ return prev['time'] > curr['time'] ? prev : curr; }).time * 1000)
      }));
  }
  render() {
    return (
  <div>
    <div style={{ width: '95%'}} className="row">
      <div className="col-md-12">
        <Resizable>
          <ChartContainer 
            utc={this.state.mode === "utc"}
            timeRange={new TimeRange([this.state.startDate, this.state.endDate])}
            showGrid={true}
            showGridPosition="over"
            trackerPosition={this.state.tracker}
            trackerTimeFormat="%X"
            title="Eficode Open Data 2019"
            format="%m/%d %H:%M"
            onTrackerChanged={(tracker) => this.setState({tracker})}>
            <ChartRow height="140">
              <YAxis id="axis1" label="Sensor 1" labelOffset={-5} min={0} max={400} width="80" type="linear" format=",.1f"/>
                <Charts>
                  <LineChart style={style1} axis="axis1" series={new TimeSeries(this.state.data1)}/>
                </Charts>
            </ChartRow>
            <ChartRow height="140">
              <YAxis id="axis2" label="Sensor 2" labelOffset={-5} min={250} max={300} width="80" type="linear" format=",.1f"/>
                <Charts>
                  <LineChart style={style2} axis="axis2" series={new TimeSeries(this.state.data2)}/>
                </Charts>
            </ChartRow>
            <ChartRow height="140">
              <YAxis id="axis3" label="Sensor 3" labelOffset={-5} min={-30} max={30} width="80" type="linear" format=",.1f"/>
                <Charts>
                  <LineChart style={style3} axis="axis3" series={new TimeSeries(this.state.data3)}/>
                </Charts>
            </ChartRow>
            <ChartRow height="140">
              <YAxis id="axis4" label="Sensor 4" labelOffset={-5} min={40} max={120} width="80" type="linear" format=",.1f"/>
                <Charts>
                  <LineChart style={style4} axis="axis4" series={new TimeSeries(this.state.data4)}/>
                </Charts>
            </ChartRow>
          </ChartContainer>
        </Resizable>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <span>
          <Legend
            type="line"
            align="right"
            style={legendStyle}
	    categories={[
              {key: "sensor1", label: "Sensor 1"},
              {key: "sensor2", label: "Sensor 2"},
              {key: "sensor3", label: "Sensor 3"},
              {key: "sensor4", label: "Sensor 4"},
            ]}
          />
        </span>
      </div>
    </div>
  </div>
    );
  }
}


export default App;
