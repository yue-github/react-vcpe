import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Card, Avatar, List } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './index.less';

const FormItem = Form.Item;

@connect(({ messagesList, loading }) => ({
    ...messagesList,
    loading: loading.effects['messagesList/fetchNotices'],
}))
class Project extends Component {
    state = {
        page: 1,
        pageSize: 20,
        status: '0',
        type: '0',
    };

    componentDidMount() {
        this.fetchMessages();
    }

    handleTypeChange = vs => {
        const type = vs.pop();
        this.fetchMessages({
            filter: {
                type,
            },
        });
        this.setState({
            type,
        });
    };

    handleStatusChange = vs => {
        const status = vs.pop();
        this.fetchMessages({
            filter: {
                status,
            },
        });
        this.setState({
            status,
        });
    };

    fetchMessages(payload = {}) {
        const { dispatch } = this.props;
        const { page, pageSize } = this.state;

        const params = {
            page,
            pageSize,
            ...payload,
        };

        dispatch({
            type: 'messagesList/fetchNotices',
            payload: params,
        });
    }

    render() {
        const { messages, loading, total } = this.props;
        const { pageSize, page, status, type } = this.state;

        const paginationProps = {
            showSizeChanger: true,
            total,
            pageSize,
            current: page,
            style: { marginRight: 24 },
        };

        return (
            <div>
                <Card style={{ marginBottom: 24 }}>
                    <Form layout="inline">
                        <StandardFormRow title="状态" block>
                            <FormItem>
                                <TagSelect
                                    value={[status]}
                                    hideCheckAll
                                    onChange={this.handleStatusChange}
                                >
                                    <TagSelect.Option value="0">全部</TagSelect.Option>
                                    <TagSelect.Option value="unread">已读</TagSelect.Option>
                                    <TagSelect.Option value="read">未读</TagSelect.Option>
                                </TagSelect>
                            </FormItem>
                        </StandardFormRow>
                        <StandardFormRow title="类型" block>
                            <FormItem>
                                <TagSelect
                                    value={[type]}
                                    hideCheckAll
                                    onChange={this.handleTypeChange}
                                >
                                    <TagSelect.Option value="0">全部</TagSelect.Option>
                                    <TagSelect.Option value="task">任务</TagSelect.Option>
                                    <TagSelect.Option value="report">报告</TagSelect.Option>
                                </TagSelect>
                            </FormItem>
                        </StandardFormRow>
                    </Form>
                    <List
                        pagination={paginationProps}
                        dataSource={messages}
                        loading={loading}
                        renderItem={item => (
                            <List.Item key={item.id} style={{ cursor: 'pointer' }}>
                                <List.Item.Meta
                                    className={styles.meta}
                                    avatar={
                                        <span className={styles.iconElement}>
                                            <Avatar
                                                className={styles.avatar}
                                                src={item.avatar}
                                                size="large"
                                            />
                                        </span>
                                    }
                                    title={
                                        <div className={styles.title}>
                                            {item.title}
                                            <div className={styles.extra}>{item.label}</div>
                                        </div>
                                    }
                                    description={
                                        <div>
                                            <div
                                                className={styles.description}
                                                title={item.message}
                                            >
                                                {item.message}
                                            </div>
                                            <div className={styles.datetime}>
                                                {moment(item.created_at).format(
                                                    'YYYY-MM-DD HH:mm:ss'
                                                )}
                                            </div>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        );
    }
}

export default Project;
