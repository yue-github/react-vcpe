import { connect } from 'dva/index';
import React, { Component } from 'react';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import Link from 'umi/link';
import {
    Form,
    Card,
    Select,
    Row,
    Col,
    Input,
    Rate,
    Icon,
    Button,
    Divider,
    Table,
    Modal,
    Popconfirm,
} from 'antd';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import { STATE, FINANCING } from '../../constants/project';

import 'antd/lib/rate/style';

const FormItem = Form.Item;

const formItemLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
    },
};

@connect(({ projectList, loading }) => ({
    ...projectList,
    loading: loading.effects['projectList/fetchFilter'] || loading.effects['projectList/fetchList'],
}))
class Project extends Component {
    index = 0;

    state = {
        expandForm: true,
        industry: '0',
        state: '0',
        user: '0',
        inputer: '0',
        page: 1,
        pageSize: 20,
        keyword: '',
        industryModal: false,
        industries: [],
    };

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '项目名称',
            dataIndex: 'proname',
        },
        {
            title: '行业',
            dataIndex: 'industryid',
            render: val => {
                const { industriesMap } = this.props;
                return industriesMap[val];
            },
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: val => STATE[val],
        },
        {
            title: '轮次',
            dataIndex: 'newrounds',
            render: val => FINANCING[val],
        },
        {
            title: '优先级',
            dataIndex: 'level',
            render: val => (
                <Rate character={<Icon type="flag" />} value={val} style={{ fontSize: 14 }} />
            ),
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
                    <Link to={`/project/view/${row.id}`}>查看</Link>
                    <Divider type="vertical" />
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
                </span>
            ),
        },
    ];

    constructor(props) {
        super(props);

        this.state.industries = cloneDeep(props.industries);
    }

    componentDidMount() {
        this.fetchFilters();
        this.fetchList({});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            industries: cloneDeep(nextProps.industries),
        });
    }

    handleIndustryChange = vs => {
        const industry = vs.pop();
        this.setState({ industry });
        this.fetchList({
            filter: {
                industryid: industry,
            },
        });
    };

    handleStateChange = vs => {
        const state = vs.pop();
        this.setState({ state });
        this.fetchList({
            filter: {
                state,
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
            type: 'projectList/deleteProject',
            payload: {
                id,
            },
        }).then(response => {
            if (response && response.status === 200) {
                this.fetchList();
            }
        });
    };

    handleNewIndustry = () => {
        const { industries } = this.state;

        industries.push({
            id: `new_${this.index++}`, // eslint-disable-line
            isNew: true,
            editable: true,
            name: '',
        });

        this.setState({
            industries,
        });
    };

    handleIndustryFieldChange(e, { id }) {
        const { industries } = this.state;
        const index = findIndex(industries, { id });

        if (industries[index]) {
            industries[index].name = e.target.value;
            this.setState({
                industries,
            });
        }
    }

    handleIndustryFieldKeyPress(e, record) {
        if (e.keyCode === 13) {
            this.handleSaveIndustry(record);
        }
    }

    handleIndustryEditable({ id }, state) {
        const { industries } = this.state;
        const index = findIndex(industries, { id });

        if (industries[index]) {
            industries[index].editable = state;

            if (state === false) {
                const { ...props } = this.props;
                const propsIndex = findIndex(props.industries, { id });
                if (props.industries[propsIndex]) {
                    industries[index].name = props.industries[propsIndex].name;
                }
            }

            this.setState({
                industries,
            });
        }
    }

    handleSaveIndustry(record) {
        const { dispatch } = this.props;
        if (record.name) {
            let response;

            if (record.isNew) {
                response = dispatch({
                    type: 'projectList/addIndustry',
                    payload: {
                        name: record.name,
                    },
                });
            } else {
                response = dispatch({
                    type: 'projectList/updateIndustry',
                    payload: {
                        id: record.id,
                        name: record.name,
                    },
                });
            }

            response.then(res => {
                if (res) {
                    dispatch({
                        type: 'projectList/fetchFilter',
                    });
                }
            });
        }
    }

    handleDeleteIndustry(record) {
        if (record.isNew) {
            const { industries } = this.state;
            const index = findIndex(industries, { id: record.id });
            if (industries[index]) {
                industries.splice(index, 1);

                this.setState({
                    industries,
                });
            }
        } else {
            const { dispatch } = this.props;
            dispatch({
                type: 'projectList/deleteIndustry',
                payload: {
                    id: record.id,
                },
            });
        }
    }

    fetchFilters() {
        const { dispatch } = this.props;

        dispatch({
            type: 'projectList/fetchFilter',
        });
    }

    fetchList({ filter, page, pageSize } = {}) {
        const { dispatch } = this.props;
        const { industry, state, user, inputer, keyword } = this.state;

        const filters = {
            industry,
            state,
            user,
            inputer,
            keyword,
            ...filter,
        };

        const payload = {
            filter: {
                industry: filters.industry,
                state: filters.state,
                manageteams: filters.user,
                manageuser: filters.inputer,
                keyword: filters.keyword,
            },
            page,
            pageSize,
        };

        dispatch({
            type: 'projectList/fetchList',
            payload,
        });
    }

    renderAdvancedForm() {
        const { industries, users } = this.props;
        const { state, industry, inputer, user } = this.state;
        return (
            <div>
                <StandardFormRow title="所属行业" block>
                    <FormItem>
                        <TagSelect
                            value={industry}
                            hideCheckAll
                            onChange={this.handleIndustryChange}
                        >
                            <TagSelect.Option value="0">全部</TagSelect.Option>
                            {map(industries, item => (
                                <TagSelect.Option value={item.id} key={item.id}>
                                    {item.name}
                                </TagSelect.Option>
                            ))}
                            <a onClick={() => this.setState({ industryModal: true })}>
                                <Icon type="plus" />
                            </a>
                        </TagSelect>
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态" block>
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
                <Link to="/project/create">
                    <Button icon="plus" type="primary">
                        创建项目
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

    renderIndustryModal() {
        const { industryModal, industries } = this.state;

        const columns = [
            {
                title: '行业名',
                dataIndex: 'name',
                render: (text, record) => {
                    if (record.editable === true) {
                        return (
                            <Input
                                defaultValue={text}
                                autoFocus
                                onChange={e => this.handleIndustryFieldChange(e, record)}
                                onKeyPress={e => this.handleIndustryFieldKeyPress(e, record)}
                                placeholder="行业名"
                            />
                        );
                    }
                    return text;
                },
            },
            {
                title: '操作',
                render: (text, record) => {
                    if (record.isNew) {
                        return (
                            <span>
                                <a onClick={() => this.handleSaveIndustry(record)}>保存</a>
                                <Divider type="vertical" />
                                <a onClick={() => this.handleDeleteIndustry(record)}>删除</a>
                            </span>
                        );
                    }

                    if (record.editable === true) {
                        return (
                            <span>
                                <a onClick={() => this.handleSaveIndustry(record)}>保存</a>
                                <Divider type="vertical" />
                                <a onClick={() => this.handleIndustryEditable(record, false)}>
                                    取消
                                </a>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={() => this.handleIndustryEditable(record, true)}>编辑</a>
                            <Divider type="vertical" />
                            <Popconfirm
                                title="是否要删除此行？"
                                onConfirm={() => this.handleDeleteIndustry(record)}
                            >
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    );
                },
            },
        ];

        return (
            <Modal
                visible={industryModal}
                title="行业领域"
                footer={false}
                onCancel={() => this.setState({ industryModal: false })}
                bodyStyle={{ padding: 0 }}
            >
                <Table
                    columns={columns}
                    dataSource={industries}
                    pagination={false}
                    showHeader={false}
                    rowKey="id"
                />
                <Button
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={this.handleNewIndustry}
                    icon="plus"
                >
                    新增行业
                </Button>
            </Modal>
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
                {this.renderIndustryModal()}
            </div>
        );
    }
}

export default Project;
