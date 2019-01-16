import React, { PureComponent } from 'react';
import Link from 'umi/link';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Input, Progress, Button, Avatar, Modal, Form } from 'antd';

import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import Authorized from '../../components/Authorized/Authorized';

import styles from './index.less';

const FormItem = Form.Item;

const STATUS_MAP = {
    success: 'success',
    processing: 'active',
    expired: 'exception',
};

@connect(({ taskList, loading }) => ({
    ...taskList,
    loading: loading.effects['taskList/fetchList'],
}))
@Form.create()
class Task extends PureComponent {
    state = {
        page: 1,
        pageSize: 20,
        keyword: '',
        status: '0',
        user: '0',
    };

    componentDidMount() {
        this.fetchList();
    }

    handleStatusChange = vs => {
        const status = vs.pop();
        this.fetchList({ filter: { status } });
        this.setState({ status });
    };

    handleUserChange = vs => {
        const user = vs.pop();
        this.fetchList({ filter: { user } });
        this.setState({ user });
    };

    handleKeywordChange = keyword => {
        this.setState({
            keyword,
        });

        this.fetchList({
            filter: {
                keyword,
            },
        });
    };

    handlePageChange = (page, pageSize) => {
        this.setState({
            page,
            pageSize,
        });
        this.fetchList({
            page,
            pageSize,
        });
    };

    deleteItem = id => {
        const { dispatch } = this.props;
        dispatch({
            type: 'list/submit',
            payload: { id },
        });
    };

    fetchList(params = {}) {
        const { dispatch } = this.props;
        const { page, pageSize, keyword, user, status } = this.state;

        const payload = {
            page,
            pageSize,
            keyword,
            user,
            status,
            ...params,
        };

        dispatch({
            type: 'taskList/fetchList',
            payload,
        });
    }

    render() {
        const { list, total, loading } = this.props;

        const { pageSize, page, status, user, keyword } = this.state;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize,
            current: page,
            total,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handlePageChange,
        };

        const ListContent = ({ data: { owner, start, percent, ...other } }) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem}>
                    <span>分配给</span>
                    <p>{owner}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>开始时间</span>
                    <p>{moment(start).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div className={styles.listContentItem}>
                    <Progress
                        percent={percent}
                        status={STATUS_MAP[other.status]}
                        strokeWidth={6}
                        style={{ width: 180 }}
                    />
                </div>
            </div>
        );
        return (
            <div>
                <Card style={{ marginBottom: 24 }}>
                    <Form layout="inline">
                        <StandardFormRow
                            title="状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态"
                            block
                        >
                            <FormItem>
                                <TagSelect
                                    value={status}
                                    hideCheckAll
                                    onChange={this.handleStatusChange}
                                >
                                    <TagSelect.Option value="0">全部</TagSelect.Option>
                                    <TagSelect.Option value="processing">进行中</TagSelect.Option>
                                    <TagSelect.Option value="success">已完成</TagSelect.Option>
                                    <TagSelect.Option value="expired">已过期</TagSelect.Option>
                                </TagSelect>
                            </FormItem>
                        </StandardFormRow>
                        <StandardFormRow
                            title="用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户"
                            block
                        >
                            <FormItem>
                                <TagSelect
                                    value={user}
                                    hideCheckAll
                                    onChange={this.handleUserChange}
                                >
                                    <TagSelect.Option value="0">全部</TagSelect.Option>
                                    <TagSelect.Option value="owner">分配给我的</TagSelect.Option>
                                    <TagSelect.Option value="create">我创建的</TagSelect.Option>
                                </TagSelect>
                            </FormItem>
                        </StandardFormRow>
                        <StandardFormRow title="关&nbsp;&nbsp;键&nbsp;&nbsp;词" last>
                            <FormItem>
                                <Input.Search
                                    placeholder="请输入关键词"
                                    enterButton="搜索"
                                    style={{ width: 300 }}
                                    defaultValue={keyword}
                                    onSearch={this.handleKeywordChange}
                                />
                            </FormItem>
                            <Authorized authority="taskAdd">
                                <Link to="/task/create">
                                    <Button icon="plus" type="primary">
                                        创建任务
                                    </Button>
                                </Link>
                            </Authorized>
                        </StandardFormRow>
                    </Form>
                </Card>
                <div className={styles.standardList}>
                    <Card title="任务列表">
                        <List
                            size="large"
                            rowKey="id"
                            loading={loading}
                            pagination={paginationProps}
                            dataSource={list}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <Link to={`/task/view/${item.id}`}>查看详情</Link>,
                                        <a
                                            onClick={e => {
                                                e.preventDefault();
                                                Modal.confirm({
                                                    title: '删除任务',
                                                    content: '确定删除该任务吗？',
                                                    okText: '确认',
                                                    cancelText: '取消',
                                                    onOk: () => this.deleteItem(item.id),
                                                });
                                            }}
                                        >
                                            删除
                                        </a>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            item.logo ? (
                                                <Avatar
                                                    src={item.logo}
                                                    shape="square"
                                                    size="large"
                                                />
                                            ) : null
                                        }
                                        title={
                                            <Link to={`/task/view/${item.id}`}>{item.title}</Link>
                                        }
                                        description={item.description}
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

export default Task;
