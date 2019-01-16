import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Avatar } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from './View.less';

const { Description } = DescriptionList;

const tabList = [
    {
        key: 'basic',
        tab: '基本信息',
    },
    {
        key: 'manager',
        tab: '管理团队',
    },
    {
        key: 'fundraising',
        tab: '募资管理',
    },
    {
        key: 'financial',
        tab: '投资组合',
    },
    {
        key: 'exit',
        tab: '退出管理',
    },
    {
        key: 'files',
        tab: '相关文档',
    },
    {
        key: 'task',
        tab: '相关任务',
    },
];

@connect(({ projectView, loading }) => ({
    ...projectView,
    loading: loading.effects['projectView/fetchBasic'],
}))
class View extends Component {
    state = {
        tab: 'basic',
        showTeam: false,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'projectView/fetchBasic',
        });
    }

    onTabChange = key => {
        this.setState({ tab: key });
    };

    onTeamClick = () => {
        const { showTeam } = this.state;
        this.setState({ showTeam: !showTeam });
    };

    renderExtra() {
        return (
            <Row>
                <Col xs={24} sm={8}>
                    <div className={styles.textSecondary} onClick={this.onTeamClick}>
                        <Icon type="team" />
                        <div className={styles.heading}>负责团队</div>
                    </div>
                </Col>
                <Col xs={24} sm={8}>
                    <div className={styles.textSecondary}>
                        <Icon type="message" />
                        <div className={styles.heading}>基金动态</div>
                    </div>
                </Col>
                <Col xs={24} sm={8}>
                    <div className={styles.textSecondary}>
                        <Icon type="bar-chart" />
                        <div className={styles.heading}>意见报告</div>
                    </div>
                </Col>
            </Row>
        );
    }

    renderDescription() {
        const { basic } = this.props;
        return (
            <DescriptionList className={styles.headerList} size="small" col="1">
                <Description>{basic.s || '未知'}</Description>
            </DescriptionList>
        );
    }

    renderContent() {
        const { tab, loading } = this.state;
        if (loading) {
            return null;
        }
        switch (tab) {
            case 'basic':
                return null;
            case 'invest':
                return null;
            // case 'files':
            //     return this.renderFiles();
            // case 'task':
            //     return this.renderTask();
            default:
                return null;
        }
    }

    render() {
        const { loading, basic } = this.props;
        return (
            <PageHeaderWrapper
                loading={loading}
                skeletonParagraph={{ rows: 5 }}
                title={basic.proname || ' '}
                logo={<Avatar alt={basic.proname} src={basic.icon} size={96} />}
                content={this.renderDescription()}
                extraContent={this.renderExtra()}
                tabList={tabList}
                disableBreadcrumb
                onTabChange={this.onTabChange}
            >
                {this.renderContent()}
            </PageHeaderWrapper>
        );
    }
}

export default View;
