import React, { Component } from 'react';
import { Card, Row, Col, List, Icon, Button } from 'antd';

import Pie from '../../components/Charts/Pie';
import styles from './Services.less';

function ServiceCard({ title, dataSource }) {
    return (
        <Card title={title} bodyStyle={{ padding: 0 }}>
            <List
                dataSource={dataSource}
                renderItem={item => (
                    <List.Item className={styles['list-item']}>
                        {item.enabled ? (
                            <Icon type="check-circle" style={{ color: '#1890FF' }} />
                        ) : (
                            <Icon type="stop" style={{ color: '#F04864' }} />
                        )}
                        <span className={styles.content}>{item.content}</span>
                    </List.Item>
                )}
            >
                <List.Item className={styles['list-item']}>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <Button type="primary">购买此服务</Button>
                    </div>
                </List.Item>
            </List>
        </Card>
    );
}

const services = {
    free: [
        {
            content: '价格：￥0.00/月',
            enabled: true,
        },
        {
            content: '存储空间： 300M',
            enabled: true,
        },
        {
            content: '支持机构用户数：10人',
            enabled: true,
        },
        {
            content: 'LP/项目方系统支持',
        },
        {
            content: '智能项目云库支持',
        },
        {
            content: '项目跟踪支持',
        },
        {
            content: '基金一键报告',
        },
    ],
    generate: [
        {
            content: '价格：￥399.00/月',
            enabled: true,
        },
        {
            content: '存储空间： 5G',
            enabled: true,
        },
        {
            content: '支持机构用户数：10人',
            enabled: true,
        },
        {
            content: 'LP/项目方系统支持',
            enabled: true,
        },
        {
            content: '智能项目云库支持',
            enabled: true,
        },
        {
            content: '项目跟踪支持',
            enabled: true,
        },
        {
            content: '基金一键报告',
            enabled: true,
        },
    ],
    full: [
        {
            content: '价格：￥899.00/月',
            enabled: true,
        },
        {
            content: '存储空间： 无限制',
            enabled: true,
        },
        {
            content: '支持机构用户数：无限制',
            enabled: true,
        },
        {
            content: 'LP/项目方系统支持',
            enabled: true,
        },
        {
            content: '智能项目云库支持',
            enabled: true,
        },
        {
            content: '项目跟踪支持',
            enabled: true,
        },
        {
            content: '基金一键报告',
            enabled: true,
        },
    ],
};

class Services extends Component {
    componentDidMount() {}

    render() {
        return (
            <div>
                <Card
                    title={
                        <span>
                            您正在使用: <span style={{ color: '#1890FF' }}>免费版</span>
                        </span>
                    }
                    style={{ marginBottom: 24 }}
                >
                    <Row gutter={24}>
                        <Col sm={8} xl={8} md={24} lg={24}>
                            <div style={{ textAlign: 'center' }}>
                                300M
                                <br />
                                存储空间大小
                            </div>
                            <Pie
                                percent={28}
                                subTitle="已使用"
                                total="50M"
                                height={180}
                                color="#1890FF"
                            />
                        </Col>
                        <Col sm={8} xl={8} md={24} lg={24}>
                            <div style={{ textAlign: 'center' }}>
                                2人
                                <br />
                                支持成员数量
                            </div>
                            <Pie
                                percent={100}
                                subTitle="已加入"
                                total="2人"
                                height={180}
                                color="#1890FF"
                            />
                        </Col>
                        <Col sm={8} xl={8} md={24} lg={24}>
                            <div style={{ textAlign: 'center' }}>
                                无期限
                                <br />
                                版本使用期限
                            </div>
                            <Pie
                                percent={100}
                                height={180}
                                subTitle={<span style={{ fontSize: 30 }}>∞</span>}
                                color="#1890FF"
                            />
                        </Col>
                    </Row>
                </Card>
                <Row gutter={24}>
                    <Col sm={8} xl={8} md={24} lg={24}>
                        <ServiceCard title="免费版" dataSource={services.free} key="free" />
                    </Col>
                    <Col sm={8} xl={8} md={24} lg={24}>
                        <ServiceCard title="标准版" dataSource={services.generate} key="generate" />
                    </Col>
                    <Col sm={8} xl={8} md={24} lg={24}>
                        <ServiceCard title="豪华版" dataSource={services.full} key="full" />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Services;
