import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Avatar } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import Basic from './Views/Basic';
import Company from './Views/Company';
import styles from './View.less';
import { INDUSTRY } from '../../constants/project';
import Files from './Views/Files';
import Task from './Views/Task';

const { Description } = DescriptionList;
const tabList = [
    {
        key: 'basic',
        tab: '基本信息',
    },
    {
        key: 'company',
        tab: '工商信息',
    },
    {
        key: 'financial',
        tab: '融资信息',
    },
    {
        key: 'files',
        tab: '相关文档',
    },
    {
        key: 'flow',
        tab: '投决管理',
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
        id: 0,
    };

    constructor(props) {
        super(props);
        const { match } = props;
        this.state.id = match.params.id;
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { id } = this.state;
        dispatch({
            type: 'projectView/fetchBasic',
            payload: {
                id,
            },
        });
    }

    onTabChange = key => {
        this.setState({ tab: key });
    };

    onTeamClick = () => {
        const { showTeam } = this.state;
        this.setState({ showTeam: !showTeam });
    };

    renderDescription() {
        const { basic } = this.props;
        return (
            <DescriptionList className={styles.headerList} size="small" col="1">
                <Description term="所属区域">{basic.province || '未知'}</Description>
                <Description term="行业">{INDUSTRY[basic.industry] || '未知'}</Description>
                <Description term="估值">{`${basic.valuation}万元` || '未知'}</Description>
            </DescriptionList>
        );
    }

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
                        <div className={styles.heading}>项目动态</div>
                    </div>
                </Col>
                <Col xs={24} sm={8}>
                    <div className={styles.textSecondary}>
                        <Icon type="rocket" />
                        <div className={styles.heading}>项目追踪</div>
                    </div>
                </Col>
            </Row>
        );
    }

    renderContent() {
        const { tab, loading, id } = this.state;
        if (loading) {
            return null;
        }
        const { basic } = this.props;
        switch (tab) {
            case 'basic':
                return <Basic data={basic} id={id} />;
            case 'company':
                return <Company data={basic} id={id} />;
            // case 'financial':
            //     return this.renderFinancial();
            case 'files':
                return <Files id={id} />;
            // case 'flow':
            //     return this.renderFlow();
            case 'task':
                return <Task id={id} />;
            // case 'feeds':
            //     return this.renderFeeds();
            // case 'follow':
            //     return this.renderFollow();
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
