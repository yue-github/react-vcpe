import React, { Component } from 'react';
import map from 'lodash/map';
import isNaN from 'lodash/isNaN';
import { Chart, Tooltip, Geom, Coord, Guide, Label, Legend } from 'bizcharts';
import autoHeight from '../autoHeight';
import NoData from '../../NoData';
import styles from '../index.less';

const { Text } = Guide;

@autoHeight()
class Funnel extends Component {
    handleRoot = n => {
        this.root = n;
    };

    handleRef = n => {
        this.node = n;
    };

    render() {
        const {
            height,
            title,
            forceFit = true,
            data,
            color = 'action',
            padding = [0, 80, 30],
        } = this.props;

        const scale = {
            percent: {
                nice: false,
            },
        };

        let checkData = true;

        if (!data || data.length < 1) {
            checkData = false;
        }

        if (checkData) {
            map(data, item => {
                if (isNaN(item.value)) {
                    checkData = false;
                }
            });
        }

        const chartHeight = title ? height - 41 : height;
        return (
            <div className={styles.chart} style={{ height }} ref={this.handleRoot}>
                <div ref={this.handleRef}>
                    {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
                    {!checkData ? (
                        <NoData style={{ height: chartHeight }} />
                    ) : (
                        <Chart
                            height={chartHeight}
                            data={data}
                            scale={scale}
                            forceFit={forceFit}
                            padding={padding}
                        >
                            <Legend />
                            <Coord type="rect" transpose scale={[1, -1]} />
                            <Tooltip showTitle={false} />
                            <Guide>
                                {data.map((obj, k) => (
                                    <Text
                                        top
                                        key={`i${k}`} // eslint-disable-line
                                        position={{
                                            action: obj.action,
                                            percent: 'median',
                                        }}
                                        content={`${parseInt(obj.percent * 100)}%`} // eslint-disable-line
                                        style={{
                                            fill: '#fff',
                                            fontSize: '12',
                                            textAlign: 'center',
                                            shadowBlur: 2,
                                            shadowColor: 'rgba(0, 0, 0, .45)',
                                        }}
                                    />
                                ))}
                            </Guide>
                            <Geom
                                type="intervalSymmetric"
                                position="action*percent"
                                shape="funnel"
                                color={[
                                    color,
                                    ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
                                ]}
                                tooltip={[
                                    'action*value*percent',
                                    (action, value, percent) => ({
                                        name: action,
                                        value: `${value}，占比：${parseInt(percent * 100)}%`, // eslint-disable-line
                                    }),
                                ]}
                            >
                                <Label
                                    content={[
                                        'action*value',
                                        (action, value) => `${action} ${value}`,
                                    ]}
                                    labeLine={{
                                        lineWidth: 1,
                                        stroke: 'rgba(0, 0, 0, 0.15)',
                                    }}
                                />
                            </Geom>
                        </Chart>
                    )}
                </div>
            </div>
        );
    }
}

export default Funnel;
