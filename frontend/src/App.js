import { format } from "d3-format";
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
      data1: new TimeSeries({
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      }),
      data2: new TimeSeries({
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      }),
      data3: new TimeSeries({
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      }),
      data4: new TimeSeries({
        name: "Data",
        columns: ["time", "sensor_name", "value", "id"],
        points: []
      }),
      startDate: new Date(1549825200*1000),
      endDate: new Date(),
      tracker: null,
      x: null,
      y: null
    };
  }

  handleTrackerChanged = tracker => {
    if (!tracker) {
      this.setState({ tracker, x: null, y: null });
    } else {
      this.setState({ tracker });
    }
  };

  handleMouseMove = (x, y) => {
    this.setState({ x, y });
  };

  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(data => this.setState({ 
	data1: new TimeSeries({ 
          name: "sensor1",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor1").map(obj => [new Date(obj.time*1000), obj.sensor_name, obj.value, obj.id])
        }),
	data2: new TimeSeries({ 
          name: "sensor2",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor2").map(obj => [new Date(obj.time*1000), obj.sensor_name, obj.value, obj.id])
        }),
	data3: new TimeSeries({ 
          name: "sensor3",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor3").map(obj => [new Date(obj.time*1000), obj.sensor_name, obj.value, obj.id])
	}),
	data4: new TimeSeries({ 
          name: "sensor4",
          columns: ["time", "sensor_name", "value", "id"],
          points: data.filter(obj => obj.sensor_name === "sensor4").map(obj => [new Date(obj.time*1000), obj.sensor_name, obj.value, obj.id])
        }),
        endDate: new Date(data.filter(obj => obj.sensor_name === "sensor1").reduce(function(prev, curr){ return prev['time'] > curr['time'] ? prev : curr; }).time * 1000)
      }));
  }
  render() {
    const f = format(",.2f"); 
    let value1, value2, value3, value4;
    if (this.state.tracker) {
      const index = this.state.data1.bisect(this.state.tracker);
      const trackerEvent1 = this.state.data1.at(index);
      const trackerEvent2 = this.state.data2.at(index);
      const trackerEvent3 = this.state.data3.at(index);
      const trackerEvent4 = this.state.data4.at(index);
      value1 = `${f(trackerEvent1.get("value"))}`;
      value2 = `${f(trackerEvent2.get("value"))}`;
      value3 = `${f(trackerEvent3.get("value"))}`;
      value4 = `${f(trackerEvent4.get("value"))}`;
    }
    return (
  <div>
    <div style={{ width: '95%'}} className="row">
      <div className="col-md-12">
        <Resizable>
          <ChartContainer 
            utc={this.state.mode === "local"}
            timeRange={new TimeRange([this.state.startDate, this.state.endDate])}
            showGrid={true}
            showGridPosition="over"
            trackerPosition={this.state.tracker}
            trackerTimeFormat="%X"
            title="Eficode Open Data 2019"
            format="%m/%d %H:%M"
            onTrackerChanged={(tracker) => this.setState({tracker})}>
            <ChartRow height="140">
              <YAxis id="axis1" label="Sensor 1" labelOffset={-5} min={this.state.data1.min("value")} max= {this.state.data1.max("value")} type="linear" format=",.1f"/>
                <Charts>
                  <LineChart style={style1} axis="axis1" series={this.state.data1}/>
                </Charts>
            </ChartRow>
            <ChartRow height="140">
              <YAxis id="axis2" label="Sensor 2" labelOffset={-5} min={this.state.data2.min("value")} max= {this.state.data2.max("value")} width="80" type="linear" format=",.1f"/>
                <Charts>
                  <LineChart style={style2} axis="axis2" series={this.state.data2}/>
                </Charts>
            </ChartRow>
            <ChartRow height="140">
              <YAxis id="axis3" label="Sensor 3" labelOffset={-5} min={this.state.data3.min("value")} max= {this.state.data3.max("value")} width="80" type="linear" format=",.1f"/>
                <Charts>
                  <LineChart style={style3} axis="axis3" series={this.state.data3}/>
                </Charts>
            </ChartRow>
            <ChartRow height="140">
              <YAxis id="axis4" label="Sensor 4" labelOffset={-5} min={this.state.data4.min("value")} max= {this.state.data4.max("value")} width="80" type="linear" format=",.1f"/>
                <Charts>
                  <LineChart style={style4} axis="axis4" series={this.state.data4}/>
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
              {key: "sensor1", label: "Sensor 1", value: value1},
              {key: "sensor2", label: "Sensor 2", value: value2},
              {key: "sensor3", label: "Sensor 3", value: value3},
              {key: "sensor4", label: "Sensor 4", value: value4},
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
