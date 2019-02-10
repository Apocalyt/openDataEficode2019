CREATE TABLE data(
	id BIGSERIAL PRIMARY KEY,
	sensor_name TEXT,
	value double precision,
	value_ts timestamp
)
CREATE INDEX name_index ON data(sensor_name);
CREATE INDEX time_index ON data(value_ts);
