import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Avatar, Drawer } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import styles from './View.less';
import Basic from './Views/Basic';
import Files from './Views/Files';
import Task from './Views/Task';
import Team from './Views/Team';

const tabList = [
    {
        key: 'basic',
        tab: '基本信息',
    },
    {
        key: 'invest',
        tab: '投资信息',
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

@connect(({ investorView, loading }) => ({
    ...investorView,
    loading: loading.effects['investorView/fetchBasic'],
}))
class View extends Component {
    state = {
        tab: 'basic',
        // 显示关系维护
        showTeam: false,
        // 显示投资人动态
        showFeed: false,
        // 当前投资人ID
        id: undefined,
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
            type: 'investorView/fetchBasic',
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

    onFeedClick = () => {
        const { showFeed } = this.state;
        this.setState({ showFeed: !showFeed });
    };

    renderExtra() {
        return (
            <Row>
                <Col xs={24} sm={12}>
                    <div className={styles.textSecondary} onClick={this.onTeamClick}>
                        <Icon type="team" />
                        <div className={styles.heading}>关系维护</div>
                    </div>
                </Col>
                <Col xs={24} sm={12}>
                    <div className={styles.textSecondary} onClick={this.onFeedClick}>
                        <Icon type="message" />
                        <div className={styles.heading}>投资人动态</div>
                    </div>
                </Col>
            </Row>
        );
    }

    renderTeam() {
        const { showTeam } = this.state;
        return (
            <Drawer
                title="关系维护"
                placement="right"
                onClose={() => this.setState({ showTeam: false })}
                visible={showTeam}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        );
    }

    renderFeed() {
        const { showFeed } = this.state;
        return (
            <Drawer
                title="投资人动态"
                placement="right"
                onClose={() => this.setState({ showFeed: false })}
                visible={showFeed}
            >
                ...
            </Drawer>
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
            case 'invest':
                return null;
            case 'files':
                return <Files id={id} />;
            case 'task':
                return <Task id={id} />;
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
                content={<DescriptionList className={styles.headerList} size="small" col="1" />}
                extraContent={this.renderExtra()}
                tabList={tabList}
                disableBreadcrumb
                onTabChange={this.onTabChange}
            >
                {this.renderContent()}
                {this.renderFeed()}
                <Team leaders={[]} users={[]} />
            </PageHeaderWrapper>
        );
    }
}

export default View;
