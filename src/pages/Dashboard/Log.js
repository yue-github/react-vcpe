import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Card, Divider, List, Avatar } from 'antd';

@connect(({ dashboard, loading }) => ({
    dashboard,
    loading: loading.effects['dashboard/fetchEvents'],
}))
class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageSize: 10,
        };
    }

    componentDidMount() {
        const { page } = this.state;
        this.fetchEvents(page);
    }

    onPageChange = page => {
        this.setState({
            page,
        });
        this.fetchEvents(page);
    };

    onPageSizeChange = (i, pageSize) => {
        const { page } = this.state;
        this.setState({
            pageSize,
        });
        this.fetchEvents(page, pageSize);
    };

    fetchEvents(page, forcePageSize) {
        const { dispatch } = this.props;
        const { pageSize } = this.state;
        dispatch({
            type: 'dashboard/fetchEvents',
            payload: {
                page,
                pageSize: forcePageSize || pageSize,
            },
        });
    }

    render() {
        const {
            dashboard: { events, eventsTotal },
            loading,
        } = this.props;
        const { pageSize, page } = this.state;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            page,
            total: eventsTotal,
            onChange: this.onPageChange,
            onShowSizeChange: this.onPageSizeChange,
        };

        return (
            <Card>
                <Divider
                    style={{
                        fontWeight: 'normal',
                        fontSize: 14,
                        color: 'rgba(0, 0, 0, 0.45)',
                    }}
                >
                    对系统造成重要信息增减的操作记录
                </Divider>
                <List
                    size="large"
                    rowKey="id"
                    loading={loading}
                    pagination={paginationProps}
                    dataSource={events}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} shape="square" size={48} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.time}
                                style={{ flex: 'none' }}
                            />
                            <span>{item.description}</span>
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default Log;
