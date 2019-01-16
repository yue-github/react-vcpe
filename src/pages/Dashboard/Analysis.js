import React, { Component } from 'react';
import { connect } from 'dva';
import { DataView } from '@antv/data-set';
import { Row, Col, Card } from 'antd';
import { ChartCard, Radar, Bar, Pie, Funnel } from '../../components/Charts';
import GridContent from '../../components/PageHeaderWrapper/GridContent';
import Yuan from '../../utils/Yuan';

import styles from './Analysis.less';

@connect(({ dashboard, loading }) => ({
    dashboard,
    loading: loading.effects['dashboard/fetchAnalysis'],
}))
class Analysis extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'dashboard/fetchAnalysis',
        });
    }

    render() {
        const { loading, dashboard } = this.props;

        const topColResponsiveProps = {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 6,
            xl: 6,
            style: { marginBottom: 24 },
        };

        const funnelData = new DataView()
            .source([
                { action: '入库', value: dashboard.projectRuku },
                { action: '立项', value: dashboard.projectLiXiang },
                { action: '尽调', value: dashboard.projectJinDiao },
                { action: '投委会', value: dashboard.projectTouWeiHui },
                { action: '出资', value: dashboard.projectChuZi },
                { action: '退出', value: dashboard.projectTuiChu },
            ])
            .transform({
                type: 'percent',
                field: 'value',
                dimension: 'action',
                as: 'percent',
            }).rows;

        return (
            <GridContent>
                <Row gutter={24}>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            title="已签约投资人"
                            loading={loading}
                            total={dashboard.investorsCount}
                            contentHeight={46}
                        />
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            loading={loading}
                            title="已出资项目"
                            total={dashboard.investProjectCount}
                            contentHeight={46}
                        />
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            bordered={false}
                            loading={loading}
                            title="机构成员"
                            total={dashboard.orgMemberCount}
                            contentHeight={46}
                        />
                    </Col>
                    <Col {...topColResponsiveProps}>
                        <ChartCard
                            loading={loading}
                            bordered={false}
                            title="运作中基金"
                            total={dashboard.runningFundCount}
                            contentHeight={46}
                        />
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            loading={loading}
                            bordered={false}
                            title="机构总资产分布情况"
                            style={{ marginBottom: 24 }}
                        >
                            <Pie
                                hasLegend
                                subTitle="机构总资产"
                                total={() => (
                                    <Yuan>
                                        {dashboard.funds.reduce((pre, now) => now.y + pre, 0)}
                                    </Yuan>
                                )}
                                data={dashboard.funds}
                                valueFormat={value => <Yuan>{value}</Yuan>}
                                height={248}
                                lineWidth={4}
                            />
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            loading={loading}
                            className={styles.salesCard}
                            bordered={false}
                            title="项目漏斗图"
                            style={{ marginBottom: 24 }}
                        >
                            <Funnel data={funnelData} height={248} />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={24}>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            title="基金募集进度"
                            loading={loading}
                            bordered={false}
                            bodyStyle={{ padding: 0 }}
                            style={{ marginBottom: 24 }}
                        >
                            <div className={styles.salesCard}>
                                <div className={styles.salesBar}>
                                    <Bar
                                        height={248}
                                        data={dashboard.fundsProgress}
                                        color="name"
                                        title=""
                                    />
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            title="投资赛道布局"
                            loading={loading}
                            bordered={false}
                            bodyStyle={{ padding: 0 }}
                            style={{ marginBottom: 24 }}
                        >
                            <div className={styles.salesCard}>
                                <div className={styles.salesBar}>
                                    <Radar
                                        hasLegend
                                        height={248}
                                        data={dashboard.investCategories}
                                        title=""
                                    />
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </GridContent>
        );
    }
}

export default Analysis;
