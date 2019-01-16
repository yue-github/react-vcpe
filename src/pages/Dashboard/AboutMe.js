import { connect } from 'dva/index';
import React, { Component } from 'react';
import map from 'lodash/map';
import { Card, Row, Col, Avatar } from 'antd';
import Link from 'umi/link';
import NoData from '../../components/NoData';
import styles from './AboutMe.less';

function renderItem(item, type) {
    return (
        <Col sm={4} key={item.id}>
            <Link to={`/${type}/view/${item.id}`}>
                <div className={styles.investors}>
                    <Avatar
                        size={80}
                        src="https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png"
                    />
                    <div className={styles['investor-name']}>{item.name}</div>
                </div>
            </Link>
        </Col>
    );
}

@connect(({ dashboard, loading }) => ({
    dashboard,
    loading: loading.effects['dashboard/fetchAboutMe'],
}))
class AboutMe extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'dashboard/fetchAboutMe',
        });
    }

    render() {
        const {
            dashboard: { myProjects, myFunds, myInvestors },
        } = this.props;
        return (
            <div>
                <Card title="我负责的项目" style={{ marginBottom: 24 }} bordered={false}>
                    {myProjects.length ? (
                        <Row gutter={24}>
                            {map(myProjects, item => renderItem(item, 'project'))}
                        </Row>
                    ) : (
                        <NoData style={{ height: 100 }} />
                    )}
                </Card>
                <Card title="我负责的投资人" style={{ marginBottom: 24 }} bordered={false}>
                    {myInvestors.length ? (
                        <Row gutter={24}>
                            {map(myInvestors, item => renderItem(item, 'investor'))}
                        </Row>
                    ) : (
                        <NoData style={{ height: 100 }} />
                    )}
                </Card>
                <Card title="我负责的基金" style={{ marginBottom: 24 }} bordered={false}>
                    {myFunds.length ? (
                        <Row gutter={24}>{map(myFunds, item => renderItem(item, 'fund'))}</Row>
                    ) : (
                        <NoData style={{ height: 100 }} />
                    )}
                </Card>
            </div>
        );
    }
}

export default AboutMe;
