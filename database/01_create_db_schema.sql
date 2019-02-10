CREATE TABLE data(
	sensor_name TEXT PRIMARY KEY,
	value double precision,
	value_ts timestamp
)

CREATE INDEX time_index ON data(value_ts);
