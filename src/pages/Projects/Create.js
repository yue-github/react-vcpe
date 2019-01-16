import { connect } from 'dva/index';
import React, { Component } from 'react';
import map from 'lodash/map';
import { Card, Form, Input, Button, Cascader, Select, Alert } from 'antd';
import { INDUSTRY, SOURCES, STATE, FINANCING } from '../../constants/project';
import REGIONS from '../../constants/region';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};
const submitFormLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
    },
};

@connect(({ projectCreate, loading }) => ({
    ...projectCreate,
    submitting: loading.effects['projectCreate/submit'],
}))
@Form.create()
class Create extends Component {
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'projectCreate/submit',
                    payload: values,
                });
            }
        });
    };

    renderErrorMessage() {
        const { errorMessage } = this.props;
        if (!errorMessage) {
            return null;
        }

        return <Alert message={errorMessage} type="error" />;
    }

    render() {
        const {
            form: { getFieldDecorator },
            submitting,
        } = this.props;

        return (
            <Card title="创建项目">
                {this.renderErrorMessage()}
                <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label="项目名称">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入项目名称',
                                },
                            ],
                        })(<Input placeholder="不超过30个字符" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属区域">
                        {getFieldDecorator('region', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入项目名称',
                                },
                            ],
                        })(<Cascader options={REGIONS} placeholder="请选择所属区域" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="行业领域">
                        {getFieldDecorator('industry', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择行业领域',
                                },
                            ],
                        })(
                            <Select placeholder="请选择行业领域">
                                {map(INDUSTRY, (name, key) => (
                                    <Option value={key} key={key}>
                                        {name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="项目来源">
                        {getFieldDecorator('source', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择项目来源',
                                },
                            ],
                        })(
                            <Select placeholder="请选择项目来源">
                                {map(SOURCES, (name, key) => (
                                    <Option value={key} key={key}>
                                        {name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="最新获投轮次">
                        {getFieldDecorator('financing', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择最新获投轮次',
                                },
                            ],
                        })(
                            <Select placeholder="请选择最新获投轮次">
                                {map(FINANCING, (name, key) => (
                                    <Option value={key} key={key}>
                                        {name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="项目状态">
                        {getFieldDecorator('state', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择项目状态',
                                },
                            ],
                        })(
                            <Select placeholder="请选择项目状态">
                                {map(STATE, (name, key) => (
                                    <Option value={key} key={key}>
                                        {name}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

export default Create;
