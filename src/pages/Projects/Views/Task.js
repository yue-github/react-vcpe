import { connect } from 'dva/index';
import moment from 'moment/moment';
import React, { Component } from 'react';
import Link from 'umi/link';
import { Button, Form, Card, List, Avatar } from 'antd';

@connect(({ projectView, loading }) => ({
    tasks: projectView.tasks,
    loading: loading.effects['projectView/fetchTasks'],
}))
@Form.create()
class Task extends Component {
    componentDidMount() {
        const { id, dispatch } = this.props;

        dispatch({
            type: 'projectView/fetchTasks',
            payload: {
                id,
            },
        });
    }

    render() {
        const { loading, tasks, id } = this.props;

        return (
            <Card
                title="相关任务"
                extra={
                    <Link to={`/task/create/?project=${id}`}>
                        <Button type="primary">发起任务</Button>
                    </Link>
                }
            >
                <List
                    size="large"
                    rowKey="id"
                    loading={loading}
                    dataSource={tasks}
                    renderItem={item => (
                        <List.Item actions={[<Link to={`/task/view/${item.id}`}>查看详情</Link>]}>
                            <List.Item.Meta
                                avatar={
                                    item.logo ? (
                                        <Avatar src={item.logo} shape="square" size="large" />
                                    ) : null
                                }
                                title={<Link to={`/task/view/${item.id}`}>{item.title}</Link>}
                                description={item.description}
                            />
                            {moment(item.enddate).format('YYYY-MM-DD HH:mm')}
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default Task;
