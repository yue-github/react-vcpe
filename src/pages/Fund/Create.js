import { connect } from 'dva/index';
import React, { Component } from 'react';
import map from 'lodash/map';
import { Card, Form, Input, Button, Select, Alert, Cascader, DatePicker } from 'antd';
import { INDUSTRIES, STATE, CURRENCY } from '../../constants/fund';
import REGIONS from '../../constants/region';
import InputNumber from '../../components/Extends/InputNumber';
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

@connect(({ fundCreate, loading }) => ({
    ...fundCreate,
    submitting: loading.effects['fundCreate/submit'],
}))
@Form.create()
class Create extends Component {
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'fundCreate/submit',
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
            <Card title="创建基金">
                {this.renderErrorMessage()}
                <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label="基金名称">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入基金名称',
                                },
                            ],
                        })(<Input placeholder="请输入基金名称" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="投资领域">
                        {getFieldDecorator('type', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择投资领域',
                                },
                            ],
                        })(
                            <Select placeholder="请选择投资领域">
                                {map(toOptions(INDUSTRIES))}
                            </Select>
                        )}
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
                    <FormItem {...formItemLayout} label="基金状态">
                        {getFieldDecorator('state', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择基金状态',
                                },
                            ],
                        })(<Select placeholder="请选择基金状态">{map(toOptions(STATE))}</Select>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="基金期限">
                        {getFieldDecorator('date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择基金期限',
                                },
                            ],
                        })(<Select placeholder="请选择基金期限">{map(toOptions(STATE))}</Select>)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="设立时间">
                        {getFieldDecorator('time', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择设立时间',
                                },
                            ],
                        })(<DatePicker placeholder="请选择设立时间" format="YYYY-MM-DD" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="基金币种">
                        {getFieldDecorator('date', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择基金币种',
                                },
                            ],
                        })(
                            <Select placeholder="请选择基金币种">{map(toOptions(CURRENCY))}</Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="目标募集金额">
                        {getFieldDecorator('assets', {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写目标募集金额',
                                },
                            ],
                        })(<InputNumber placeholder="请填写目标募集金额" addonAfter="万元" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="已募集金额">
                        {getFieldDecorator('assets', {
                            rules: [
                                {
                                    required: true,
                                    message: '请填写已募集金额',
                                },
                            ],
                        })(<InputNumber placeholder="请填写已募集金额" addonAfter="万元" />)}
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
