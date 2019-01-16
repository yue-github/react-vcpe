import { connect } from 'dva';
import map from 'lodash/map';
import React, { Component } from 'react';
import Link from 'umi/link';
import { Form, Card, Select, Row, Col, Input, Icon, Button, Divider, Table, Modal } from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import Authorized from '../../components/Authorized/Authorized';
import { toOptions } from '../../utils/utils';

import { ASSETS, STATE, TYPES } from '../../constants/inverstors';

import 'antd/lib/rate/style';

const FormItem = Form.Item;

const formItemLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
    },
};

@connect(({ investorList, loading }) => ({
    ...investorList,
    loading:
        loading.effects['investorList/fetchFilters'] || loading.effects['investorList/fetchList'],
}))
class Investors extends Component {
    state = {
        expandForm: true,
        state: '0',
        user: '0',
        assets: '0',
        fund: '0',
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
            title: '客户名称',
            dataIndex: 'name',
        },
        {
            title: '客户类型',
            dataIndex: 'type',
            render: type => TYPES[type],
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: state => STATE[state],
        },
        {
            title: '可投资资产',
            dataIndex: 'avalueable_financing',
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
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
                    <Authorized authory="investorInfo">
                        <Link to={`/investor/view/${row.id}`}>查看</Link>
                        <Divider type="vertical" />
                    </Authorized>
                    <Authorized authory="investorDel">
                        <a
                            onClick={() =>
                                Modal.confirm({
                                    title: '警告',
                                    content: '您是否要删除该项目，删除后不可恢复！',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: () => this.handleDelete(row),
                                })
                            }
                        >
                            删除
                        </a>
                    </Authorized>
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

    handleAssetsChange = vs => {
        const assets = vs.pop();
        this.setState({ assets });
        this.fetchList({
            filter: {
                assets,
            },
        });
    };

    handleFundChange = vs => {
        const fund = vs.pop();
        this.setState({ fund });
        this.fetchList({
            filter: {
                fund,
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
            type: 'investorList/deleteInvestor',
            payload: {
                id,
            },
        }).then(response => {
            if (response && response.status === 200) {
                this.fetchList();
            }
        });
    };

    fetchFilters() {
        const { dispatch } = this.props;

        dispatch({
            type: 'investorList/fetchFilters',
        });
    }

    fetchList({ filter, page, pageSize } = {}) {
        const { dispatch } = this.props;
        const { fund, state, user, inputer, keyword } = this.state;

        const filters = {
            fund,
            state,
            user,
            inputer,
            keyword,
            ...filter,
        };

        const payload = {
            filter: {
                fund: filters.fund,
                state: filters.state,
                manageteams: filters.user,
                manageuser: filters.inputer,
                keyword: filters.keyword,
            },
            page,
            pageSize,
        };

        dispatch({
            type: 'investorList/fetchList',
            payload,
        });
    }

    renderAdvancedForm() {
        const { user, inputer, state, assets, fund } = this.state;
        const { users, fundsMap } = this.props;
        return (
            <div>
                <StandardFormRow title="状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态" block>
                    <FormItem>
                        <TagSelect value={[state]} hideCheckAll onChange={this.handleStateChange}>
                            <TagSelect.Option value="0">全部</TagSelect.Option>
                            {toOptions(STATE, TagSelect.Option)}
                        </TagSelect>
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="可投资资产" block>
                    <FormItem>
                        <TagSelect value={[assets]} hideCheckAll onChange={this.handleAssetsChange}>
                            <TagSelect.Option value="0">全部</TagSelect.Option>
                            {map(toOptions(ASSETS, TagSelect.Option))}
                        </TagSelect>
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="基&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金" block>
                    <FormItem>
                        <TagSelect value={[fund]} hideCheckAll onChange={this.handleFundChange}>
                            <TagSelect.Option value="0">全部</TagSelect.Option>
                            {map(toOptions(fundsMap, TagSelect.Option))}
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
                <Authorized authory="investorAdd">
                    <Link to="/investor/create">
                        <Button icon="plus" type="primary">
                            添加投资人
                        </Button>
                    </Link>
                </Authorized>
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
        const { list, total, loading } = this.props;
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

export default Investors;
