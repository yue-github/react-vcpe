import { connect } from 'dva/index';
import React, { Component } from 'react';
import map from 'lodash/map';
import { Card, Form, Input, Button, Select, Alert, Cascader } from 'antd';
import { STATE, TYPES, ASSETS } from '../../constants/inverstors';
import REGIONS from '../../constants/region';
import { toOptions } from '../../utils/utils';

const FormItem = Form.Item;

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

@connect(({ investorCreate, loading }) => ({
    ...investorCreate,
    submitting: loading.effects['investorCreate/submit'],
}))
@Form.create()
class Create extends Component {
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'investorCreate/submit',
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
            <Card title="创建投资人">
                {this.renderErrorMessage()}
                <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label="客户名称">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入客户名称',
                                },
                            ],
                        })(<Input placeholder="请输入客户名称" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="客户类型">
                        {getFieldDecorator('type', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择客户类型',
                                },
                            ],
                        })(<Select placeholder="请选择客户类型">{map(toOptions(TYPES))}</Select>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="所属区域">
                        {getFieldDecorator('region', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择所属区域',
                                },
                            ],
                        })(<Cascader options={REGIONS} placeholder="请选择所属区域" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="状态">
                        {getFieldDecorator('state', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择投资人状态',
                                },
                            ],
                        })(<Select placeholder="请选择投资人状态">{map(toOptions(STATE))}</Select>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="可投资资产">
                        {getFieldDecorator('assets', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择可投资资产',
                                },
                            ],
                        })(
                            <Select placeholder="请选择可投资资产">{map(toOptions(ASSETS))}</Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="联系电话">
                        {getFieldDecorator('tel', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入联系电话',
                                },
                            ],
                        })(<Input placeholder="请输入联系电话" />)}
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
