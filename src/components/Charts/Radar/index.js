import React, { Component } from 'react';
import { Chart, Tooltip, Geom, Coord, Axis } from 'bizcharts';
import autoHeight from '../autoHeight';
import NoData from '../../NoData';
import styles from './index.less';

/* eslint react/no-danger:0 */

@autoHeight()
class Radar extends Component {
    state = {
        legendData: [],
    };

    componentDidMount() {
        this.getLegendData();
    }

    componentDidUpdate(preProps) {
        const { data } = this.props;
        if (data !== preProps.data) {
            this.getLegendData();
        }
    }

    getG2Instance = chart => {
        this.chart = chart;
    };

    // for custom lengend view
    getLegendData = () => {
        if (!this.chart) return;
        const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
        if (!geom) return;
        const items = geom.get('dataArray') || []; // 获取图形对应的

        const legendData = items.map(item => {
            // eslint-disable-next-line
            const origins = item.map(t => t._origin);
            return {
                name: origins[0].name,
                color: item[0].color,
                checked: true,
                value: origins.reduce((p, n) => p + n.value, 0),
            };
        });

        this.setState({
            legendData,
        });
    };

    handleRef = n => {
        this.node = n;
    };

    handleLegendClick = (item, i) => {
        const newItem = item;
        newItem.checked = !newItem.checked;

        const { legendData } = this.state;
        legendData[i] = newItem;

        const filteredLegendData = legendData.filter(l => l.checked).map(l => l.name);

        if (this.chart) {
            this.chart.filter('name', val => filteredLegendData.indexOf(val) > -1);
            this.chart.repaint();
        }

        this.setState({
            legendData,
        });
    };

    render() {
        const defaultColors = [
            '#1890FF',
            '#FACC14',
            '#2FC25B',
            '#8543E0',
            '#F04864',
            '#13C2C2',
            '#fa8c16',
            '#a0d911',
        ];

        const {
            data = [],
            height = 0,
            title,
            forceFit = true,
            tickCount = 4,
            padding = [60, 30, 16, 30],
            animate = true,
            colors = defaultColors,
        } = this.props;

        const scale = {
            value: {
                min: 0,
                tickCount,
            },
        };

        const chartHeight = title ? height - 41 : height;

        return (
            <div className={styles.radar} style={{ height }}>
                {title && <h4>{title}</h4>}
                {!data || data.length < 1 ? (
                    <NoData style={{ height: chartHeight }} />
                ) : (
                    <Chart
                        scale={scale}
                        height={chartHeight}
                        forceFit={forceFit}
                        data={data}
                        padding={padding}
                        animate={animate}
                        onGetG2Instance={this.getG2Instance}
                    >
                        <Tooltip />
                        <Coord type="polar" />
                        <Axis
                            name="label"
                            line={null}
                            tickLine={null}
                            grid={{
                                lineStyle: {
                                    lineDash: null,
                                },
                                hideFirstLine: false,
                            }}
                        />
                        <Axis
                            name="value"
                            label={null}
                            grid={{
                                type: 'polygon',
                                lineStyle: {
                                    lineDash: null,
                                },
                            }}
                        />
                        <Geom type="line" position="label*value" color={['name', colors]} />
                        <Geom type="area" position="label*value" color={['name', colors]} />
                        <Geom
                            type="point"
                            position="label*value"
                            color={['name', colors]}
                            shape="circle"
                        />
                    </Chart>
                )}
            </div>
        );
    }
}

export default Radar;
