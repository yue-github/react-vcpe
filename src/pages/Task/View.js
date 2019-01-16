import React, { Component, Fragment } from 'react';
import map from 'lodash/map';
import router from 'umi/router';
import {
    Form,
    Card,
    Button,
    Modal,
    Tooltip,
    Progress,
    Input,
    Popconfirm,
    DatePicker,
    List,
    Avatar,
    Icon,
    Popover,
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';
import DescriptionList from '../../components/DescriptionList';
import ListForm from '../../components/ListForm';
import moment from '../../utils/moment';
import { STATE, FINANCING } from '../../constants/project';
import styles from './View.less';

const FormItem = Form.Item;
const { Description } = DescriptionList;
const { TextArea, Search } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};

const mapping = {
    title: {
        label: '任务标题',
        item: Input,
        itemProps: {
            placeholder: '请输入任务标题',
        },
        rules: [
            {
                required: true,
                message: '请输入任务标题',
            },
        ],
    },
    description: {
        label: '任务描述',
        item: TextArea,
        itemProps: {
            placeholder: '请输入任务描述',
        },
        rules: [
            {
                required: true,
                message: '请输入任务描述',
            },
        ],
    },
    enddate: {
        label: '截止时间',
        item: DatePicker,
        value: v => moment(v),
        itemProps: {
            placeholder: '请选择截止时间',
            format: 'YYYY-MM-DD HH:mm:ss',
            showTime: { defaultValue: moment('00:00:00', 'HH:mm:ss') },
        },
        rules: [
            {
                required: true,
                message: '请选择截止时间',
            },
        ],
    },
};

@connect(({ taskView, loading }) => ({
    ...taskView,
    loading: loading.effects['taskView/fetchTask'],
    loadingUsers: loading.effects['taskView/fetchUsers'],
}))
@Form.create()
class Create extends Component {
    state = {
        edit: false,
        checkItemDesc: '',
        checkItemUser: null,
        commentContent: '',
    };

    componentDidMount() {
        this.fetchTask();
        this.fetchUsers();
    }

    getTaskId() {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        return id;
    }

    handleDelete = () => {
        const { dispatch, history } = this.props;

        dispatch({
            type: 'taskView/deleteTask',
            payload: {
                taskid: this.getTaskId(),
            },
        }).then(json => {
            if (json && json.status === 200) {
                history.push('/task');
            }
        });
    };

    handleSave = () => {
        const { dispatch } = this.props;

        this.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'taskView/updateTask',
                    payload: {
                        ...values,
                        enddate: values.enddate.format('YYYY-MM-DD HH:mm:ss'),
                    },
                }).then(json => {
                    if (json && json.status === 200) {
                        this.fetchTask();
                        this.setState({ edit: false });
                    }
                });
            }
        });
    };

    handleDeleteFollower = user => {
        const { dispatch } = this.props;

        dispatch({
            type: 'taskView/deleteFollower',
            payload: {
                taskid: this.getTaskId(),
                uid: user.id,
            },
        }).then(json => {
            if (json && json.status === 200) {
                this.fetchTask();
            }
        });
    };

    handleAddFollower = user => {
        const { dispatch } = this.props;
        dispatch({
            type: 'taskView/fetchTask',
            payload: {
                taskid: this.getTaskId(),
                uid: user.id,
            },
        }).then(json => {
            if (json && json.status === 200) {
                this.fetchTask();
            }
        });
    };

    handleCheckItem = (item, e) => {
        e.stopPropagation();
    };

    handleUncheckItem = (item, e) => {
        e.stopPropagation();
    };

    handleDeleteCheckItem = (item, e) => {
        e.stopPropagation();
    };

    handleAddCheckItem = e => {
        e.stopPropagation();
    };

    handleCommentSubmit = () => {
        const { dispatch } = this.props;
        const { commentContent } = this.state;

        if (commentContent) {
            dispatch({
                type: 'taskView/addComment',
                payload: {
                    taskid: this.getTaskId(),
                    contents: commentContent,
                },
            }).then(json => {
                if (json && json.status === 200) {
                    this.fetchTask();
                    this.setState({ commentContent: '' });
                }
            });
        }
    };

    fetchTask() {
        const { dispatch } = this.props;
        dispatch({
            type: 'taskView/fetchTask',
            payload: {
                taskid: this.getTaskId(),
            },
        });
    }

    fetchUsers({ filter } = {}) {
        const { dispatch } = this.props;
        dispatch({
            type: 'taskView/fetchUsers',
            payload: {
                filter,
            },
        });
    }

    renderAddFollowerPopover(onClick) {
        const { loadingUsers, users } = this.props;
        return (
            <div>
                <Search
                    placeholder="按姓名搜索"
                    onSearch={keyword => this.fetchUsers({ filter: { keyword } })}
                />
                <List
                    loading={loadingUsers}
                    dataSource={users}
                    renderItem={item => (
                        <List.Item style={{ cursor: 'pointer' }} onClick={e => onClick(item, e)}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} size={40} />}
                                title={item.name}
                                description={item.rolename}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }

    renderDescription() {
        const { task } = this.props;

        let status = '处理中';
        let progressStatus = 'active';
        let percent = task.process;

        if (task.isok) {
            status = '已完成';
            progressStatus = 'success';
            percent = 100;
        } else if (moment(task.enddate).diff(moment()) < 0) {
            status = '已超期';
            progressStatus = 'exception';
        }
        return (
            <DescriptionList className={styles.headerList} size="small" col="2">
                <Description term="创建人">曲丽丽</Description>
                <Description term="任务状态">{status}</Description>
                <Description term="创建时间">{task.created_at}</Description>
                <Description term="任务进度">
                    <Progress
                        percent={percent}
                        status={progressStatus}
                        strokeWidth={6}
                        style={{ width: 180 }}
                    />
                </Description>
            </DescriptionList>
        );
    }

    renderComment() {
        const { comments, loading } = this.props;
        const { commentContent } = this.state;

        const paginationProps = {
            hideOnSinglePage: true,
            pageSize: 10,
            total: comments && comments.length,
        };

        return (
            <Card title="任务评论">
                <List
                    size="large"
                    itemLayout="vertical"
                    rowKey="id"
                    loading={loading}
                    pagination={paginationProps}
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="/" size="large" />}
                                title={
                                    <span>
                                        {item.user.name}
                                        <span
                                            style={{ marginLeft: 12, color: 'rgba(0, 0, 0, 0.45)' }}
                                        >
                                            {moment(item.created_at).fromNow()}
                                        </span>
                                    </span>
                                }
                                description={item.content}
                            />
                            {item.attch ? <div style={{ marginLeft: 56 }}>附件</div> : null}
                        </List.Item>
                    )}
                />
                <div className={styles['comment-box']}>
                    <TextArea
                        rows={5}
                        placeholder="请输入评论内容"
                        value={commentContent}
                        onChange={e => this.setState({ commentContent: e.target.value })}
                    />
                    <div className={styles['comment-box-footer']}>
                        <span />
                        <Button type="primary" onClick={this.handleCommentSubmit}>
                            提交
                        </Button>
                    </div>
                </div>
            </Card>
        );
    }

    renderModule = item => {
        let { name } = item;
        const { avatar } = item;
        let content;
        const link = `/${item.class}/view/${item.id}`;

        switch (item.class) {
            case 'project':
                name = (
                    <span>
                        {item.proname}
                        <span style={{ color: 'rgba(0,0,0,0.45)' }}>{item.industry}</span>
                    </span>
                );
                content = (
                    <div>
                        状态： {STATE[item.state]}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {item.newrounds ? `融资轮次：${FINANCING[item.newrounds]}` : null}
                    </div>
                );
                break;
            case 'investor':
                content = `状态：${STATE[item.state]}`;
                break;
            case 'fund':
                name = item.fundname;
                break;
            default:
                return null;
        }

        return (
            <List.Item
                onClick={() => router.push(link)}
                style={{ cursor: 'pointer' }}
                key={item.id}
            >
                <List.Item.Meta title={name} avatar={avatar} description={content} />
                <a onClick={e => this.handleDeleteCheckItem(item, e)} className={styles.module}>
                    删除
                </a>
            </List.Item>
        );
    };

    render() {
        const { loading, task, follows, modules } = this.props;
        const { edit, checkItemDesc, checkItemUser } = this.state;

        const { distributions } = task;

        return (
            <PageHeaderWrapper
                title={task.title}
                logo={task.avatar ? <img alt="" src={task.avatar} /> : null}
                action={
                    <Button
                        type="primary"
                        onClick={() =>
                            Modal.confirm({
                                title: '警告',
                                content: '您是否要删除该项目，删除后不可恢复！',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: this.handleDelete,
                            })
                        }
                    >
                        删除
                    </Button>
                }
                content={this.renderDescription()}
                loading={loading}
                disableBreadcrumb
            >
                <Card
                    title="基本信息"
                    style={{ marginBottom: 24 }}
                    extra={
                        edit ? (
                            <Fragment>
                                <Button type="primary" onClick={this.handleSave}>
                                    保存
                                </Button>
                                &nbsp;&nbsp;
                                <a onClick={() => this.setState({ edit: false })}>取消</a>
                            </Fragment>
                        ) : (
                            <a onClick={() => this.setState({ edit: true })}>编辑</a>
                        )
                    }
                >
                    <ListForm
                        editMode={edit}
                        fields={['title', 'description', 'enddate']}
                        mapping={mapping}
                        data={task}
                        cardProps={{ style: { border: 0 } }}
                        listProps={{ split: false }}
                        ref={form => {
                            if (form) this.form = form.getForm();
                        }}
                    />
                </Card>
                <Card title="任务详情" style={{ marginBottom: 24 }}>
                    <FormItem {...formItemLayout} label="关注者">
                        {map(follows, item => (
                            <Popconfirm
                                key={item.id}
                                title="是否要删除？"
                                className={styles.follower}
                                placement="bottom"
                                onConfirm={() => this.handleDeleteFollower(item)}
                            >
                                <Tooltip trigger="hover" title={`${item.name}[${item.rolename}]`}>
                                    <Avatar alt={item.name} src={item.avatar} size={40} />
                                </Tooltip>
                            </Popconfirm>
                        ))}

                        <Popover
                            trigger="click"
                            placement="right"
                            content={this.renderAddFollowerPopover(this.handleAddFollower)}
                        >
                            <a className={styles['follower-add']}>
                                <Icon type="plus" />
                            </a>
                        </Popover>
                    </FormItem>
                    <FormItem {...formItemLayout} label="任务目标">
                        <Card type="inner">
                            <List dataSource={modules} renderItem={item => this.renderModule(item)}>
                                <List.Item>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            width: '100%',
                                            marginTop: 14,
                                        }}
                                    >
                                        <a>
                                            <Icon type="plus" />
                                            &nbsp;添加
                                        </a>
                                    </div>
                                </List.Item>
                            </List>
                        </Card>
                    </FormItem>
                    <FormItem {...formItemLayout} label="检查项">
                        <Card type="inner">
                            <List
                                dataSource={distributions}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={item.checkitem}
                                            description={
                                                <div>
                                                    <span>分配给：</span>
                                                    <Tooltip
                                                        className={styles.follower}
                                                        trigger="hover"
                                                        title={`${item.user.name}[${
                                                            item.user.rolename
                                                        }]`}
                                                    >
                                                        <Avatar
                                                            alt={item.user.name}
                                                            src={item.user.avatar}
                                                            size={40}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            }
                                        />
                                        {item.isok === '1' || item.isok === 1 ? (
                                            <a onClick={e => this.handleUncheckItem(item, e)}>
                                                取消审核
                                            </a>
                                        ) : (
                                            <a onClick={e => this.handleCheckItem(item, e)}>
                                                审核通过
                                            </a>
                                        )}
                                        &nbsp;&nbsp;
                                        <a onClick={e => this.handleDeleteCheckItem(item, e)}>
                                            删除
                                        </a>
                                    </List.Item>
                                )}
                            >
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <Input
                                                placeholder="请输入描述"
                                                value={checkItemDesc}
                                                onChange={e =>
                                                    this.setState({ checkItemDesc: e.target.value })
                                                }
                                            />
                                        }
                                        description={
                                            <div style={{ marginTop: 10 }}>
                                                <span>分配给：</span>
                                                <Popover
                                                    trigger="click"
                                                    placement="right"
                                                    content={this.renderAddFollowerPopover(item =>
                                                        this.setState({ checkItemUser: item })
                                                    )}
                                                >
                                                    {checkItemUser ? (
                                                        <Tooltip
                                                            className={styles.follower}
                                                            trigger="hover"
                                                            title={`${checkItemUser.name}[${
                                                                checkItemUser.rolename
                                                            }]`}
                                                        >
                                                            <Avatar
                                                                alt={checkItemUser.name}
                                                                src={checkItemUser.avatar}
                                                                size={40}
                                                            />
                                                        </Tooltip>
                                                    ) : (
                                                        <a className={styles['follower-add']}>
                                                            <Icon type="plus" />
                                                        </a>
                                                    )}
                                                </Popover>
                                                <a
                                                    style={{ lineHeight: '40px', float: 'right' }}
                                                    onClick={this.handleAddCheckItem}
                                                >
                                                    提交
                                                </a>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            </List>
                        </Card>
                    </FormItem>
                </Card>
                {this.renderComment()}
            </PageHeaderWrapper>
        );
    }
}

export default Create;
