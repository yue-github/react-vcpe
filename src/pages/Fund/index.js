import { connect } from 'dva/index';
import React, { Component } from 'react';
import map from 'lodash/map';
import Link from 'umi/link';
import { Form, Card, Select, Row, Col, Input, Icon, Button, Divider, Table, Modal } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import { STATE, SCALE, TERM } from '../../constants/fund';
import moment from '../../utils/moment';

const FormItem = Form.Item;

const formItemLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
    },
};

@connect(({ fundList, loading }) => ({
    ...fundList,
    loading: loading.effects['fundList/fetchFilter'] || loading.effects['fundList/fetchList'],
}))
class Fund extends Component {
    index = 0;

    state = {
        expandForm: true,
        scale: '0',
        state: '0',
        user: '0',
        inputer: '0',
        page: 1,
        pageSize: 20,
        keyword: '',
    };

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '基金名称',
            dataIndex: 'fundname',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: state => STATE[state],
        },
        {
            title: '基金规模',
            dataIndex: 'targetcash',
            render: target => `${target}万元`,
        },
        {
            title: '基金期限',
            dataIndex: 'timelimit',
            render: term => TERM[term],
        },
        {
            title: '设立时间',
            dataIndex: 'created_at',
            render: time => moment(time).format('YYYY-MM-DD'),
        },
        {
            title: '负责人',
            dataIndex: 'leader',
        },
        {
            title: '录入人',
            dataIndex: 'inputer',
        },
        {
            title: '操作',
            render: (text, row) => (
                <span>
                    <Link to={`/fund/view/${row.id}`}>查看</Link>
                    <Divider type="vertical" />
                    <a
                        onClick={() =>
                            Modal.confirm({
                                title: '警告',
                                content: '您是否要删除该基金，删除后不可恢复！',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => this.handleDelete(row),
                            })
                        }
                    >
                        删除
                    </a>
                </span>
            ),
        },
    ];

    componentDidMount() {
        this.fetchFilters();
        this.fetchList({});
    }

    handleStateChange = vs => {
        const state = vs.pop();
        this.setState({ state });
        this.fetchList({
            filter: {
                state,
            },
        });
    };

    handleScaleChange = vs => {
        const scale = vs.pop();
        this.setState({ scale });
        this.fetchList({
            filter: {
                scale,
            },
        });
    };

    handleUserChange = user => {
        this.setState({ user });
        this.fetchList({
            filter: {
                user,
            },
        });
    };

    handleInputerChange = inputer => {
        this.setState({ inputer });
        this.fetchList({
            filter: {
                inputer,
            },
        });
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

    handleExpandForm = () => {
        const { expandForm } = this.state;
        this.setState({
            expandForm: !expandForm,
        });
    };

    handleDelete = ({ id }) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'fundList/deleteFund',
            payload: { id },
        }).then(response => {
            if (response && response.status === 200) {
                this.fetchList();
            }
        });
    };

    fetchFilters() {
        const { dispatch } = this.props;
        dispatch({
            type: 'fundList/fetchFilters',
        });
    }

    fetchList({ filter, page, pageSize } = {}) {
        const { dispatch } = this.props;
        const { scale, state, user, inputer, keyword } = this.state;

        const filters = {
            scale,
            state,
            user,
            inputer,
            keyword,
            ...filter,
        };

        const payload = {
            filter: {
                scale: filters.scale,
                fundstate: filters.state,
                manageteams: filters.user,
                manageuser: filters.inputer,
                keyword: filters.keyword,
            },
            page,
            pageSize,
        };

        dispatch({
            type: 'fundList/fetchList',
            payload,
        });
    }

    renderAdvancedForm() {
        const { users } = this.props;
        const { state, scale, inputer, user } = this.state;
        return (
            <div>
                <StandardFormRow title="基金状态" block>
                    <FormItem>
                        <TagSelect value={state} hideCheckAll onChange={this.handleStateChange}>
                            <TagSelect.Option value="0">全部</TagSelect.Option>
                            {map(STATE, (name, key) => (
                                <TagSelect.Option value={key} key={key}>
                                    {name}
                                </TagSelect.Option>
                            ))}
                        </TagSelect>
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="基金规模" block>
                    <FormItem>
                        <TagSelect value={scale} hideCheckAll onChange={this.handleScaleChange}>
                            <TagSelect.Option value="0">全部</TagSelect.Option>
                            {map(SCALE, (name, key) => (
                                <TagSelect.Option value={key} key={key}>
                                    {name}
                                </TagSelect.Option>
                            ))}
                        </TagSelect>
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员" grid>
                    <Row gutter={24}>
                        <Col xl={6} lg={10} md={12} sm={24} xs={24}>
                            <FormItem label="负责人" {...formItemLayout}>
                                <Select value={user} onChange={this.handleUserChange}>
                                    <Select.Option value="0">不限</Select.Option>
                                    {map(users, item => (
                                        <Select.Option value={item.id} key={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col xl={6} lg={10} md={12} sm={24} xs={24}>
                            <FormItem label="录入人" {...formItemLayout}>
                                <Select value={inputer} onChange={this.handleInputerChange}>
                                    <Select.Option value="0">不限</Select.Option>
                                    {map(users, item => (
                                        <Select.Option value={item.id} key={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </StandardFormRow>
                {this.renderSimpleForm()}
            </div>
        );
    }

    renderSimpleForm() {
        const { expandForm, keyword } = this.state;
        return (
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
                <Link to="/fund/create">
                    <Button icon="plus" type="primary">
                        创建基金
                    </Button>
                </Link>
                {expandForm ? (
                    <a style={{ float: 'right' }} onClick={this.handleExpandForm}>
                        收起 <Icon type="up" />
                    </a>
                ) : (
                    <a style={{ float: 'right' }} onClick={this.handleExpandForm}>
                        展开 <Icon type="down" />
                    </a>
                )}
            </StandardFormRow>
        );
    }

    render() {
        const { expandForm, page, pageSize } = this.state;
        const { loading, list, total } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            total,
            current: page,
            pageSize,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handlePageChange,
            style: { marginRight: 24 },
        };

        return (
            <div>
                <Card style={{ marginBottom: 24 }}>
                    <Form layout="inline">
                        {expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()}
                    </Form>
                </Card>
                <Card bodyStyle={{ padding: 0 }}>
                    <Table
                        rowKey="id"
                        loading={loading}
                        dataSource={list}
                        columns={this.columns}
                        onSelectRow={this.handleSelectRows}
                        onChange={this.handleStandardTableChange}
                        pagination={paginationProps}
                    />
                </Card>
            </div>
        );
    }
}

export default Fund;
