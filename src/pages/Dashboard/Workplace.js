import { connect } from 'dva/index';
import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import map from 'lodash/map';
import { Bar } from '../../components/Charts';
import NoData from '../../components/NoData';
import CardTip from './CardTip';

const cardResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
};

function ChartCard(props) {
    const { title, tooltip, data } = props;

    let checkData = false;
    // eslint-disable-next-line
    for (let i = 0; i < data.length; i++) {
        if (data[i] && data[i].y > 0) {
            checkData = true;
            break;
        }
    }

    return (
        <Card title={title} style={{ marginBottom: 24 }} extra={<CardTip title={tooltip} />}>
            {checkData ? (
                <Bar data={data} height={248} title="" />
            ) : (
                <NoData style={{ height: 248 }} />
            )}
        </Card>
    );
}

@connect(({ dashboard, loading }) => ({
    workplace: dashboard.workplace,
    loading: loading.effects['dashboard/fetchWorkplace'],
}))
class Workplace extends PureComponent {
    state = {
        activeTab: 'organization',
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'dashboard/fetchWorkplace',
        });
    }

    handleTabChange = key => {
        this.setState({
            activeTab: key,
        });
    };

    render() {
        const { activeTab } = this.state;
        const { loading, workplace } = this.props;
        const projectData = [
            {
                x: '入库',
                y: workplace.proRuKu,
            },
            {
                x: '立项',
                y: workplace.proLiXiang,
            },
            {
                x: '尽调',
                y: workplace.proJinTiao,
            },
            {
                x: '投委会',
                y: workplace.proTouwieHui,
            },
            {
                x: '出资',
                y: workplace.proChuZi,
            },
            {
                x: '退出',
                y: workplace.proTuiChu,
            },
        ];
        const investorData = [
            {
                x: '潜在投资人',
                y: workplace.investorQianZai,
            },
            {
                x: '意向投资人',
                y: workplace.investorYiXiang,
            },
            {
                x: '签约投资人',
                y: workplace.investorQianYue,
            },
        ];
        const fundData = [
            {
                x: '待募集',
                y: workplace.fundDaiMuJi,
            },
            {
                x: '募集完毕',
                y: workplace.fundMuJiWanBi,
            },
            {
                x: '已退出',
                y: workplace.fundTuiChu,
            },
        ];
        const taskData = [
            {
                x: '创建任务',
                y: workplace.taskNoOk,
            },
            {
                x: '完成任务',
                y: workplace.taskOk,
            },
        ];
        const operationTabList = [
            {
                key: 'organization',
                tab: '机构概况',
            },
        ];
        map(workplace.roles, item => {
            operationTabList.push({
                key: item.rolename,
                tab: item.rolename,
            });
        });
        return (
            <Card
                bordered={false}
                tabList={operationTabList}
                activeTabKey={activeTab}
                onTabChange={this.handleTabChange}
                loading={loading}
            >
                <Row gutter={24}>
                    <Col {...cardResponsiveProps}>
                        <ChartCard
                            title="项目概况"
                            tooltip="统计项目从过去到现阶段每个状态的累积数量。例如 [立项项目数量] 会计入到 [入库项目数量] 里。"
                            data={projectData}
                        />
                    </Col>
                    <Col {...cardResponsiveProps}>
                        <ChartCard
                            title="投资人概况"
                            tooltip="统计机构内投资人现阶段每个状态对应的数量。"
                            data={investorData}
                        />
                    </Col>
                    <Col {...cardResponsiveProps}>
                        <ChartCard
                            title="基金概况"
                            tooltip="统计机构内基金现阶段每个状态对应的数量。"
                            data={fundData}
                        />
                    </Col>
                    <Col {...cardResponsiveProps}>
                        <ChartCard
                            title="任务概况"
                            tooltip="统计机构内任务现阶段每个状态对应的数量。"
                            data={taskData}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Workplace;
