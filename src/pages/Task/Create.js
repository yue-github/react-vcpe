import { connect } from 'dva/index';
import React, { Component } from 'react';
import moment from 'moment';
import { Card, Form, Input, Button, DatePicker, Alert } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
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

@connect(({ taskCreate, loading }) => ({
    ...taskCreate,
    submitting: loading.effects['taskCreate/submit'],
}))
@Form.create()
class Create extends Component {
    state = {
        submitting: false,
    };

    componentDidMount() {}

    handleSubmit = e => {
        const { dispatch, form, history } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'taskCreate/submit',
                    payload: values,
                }).then(json => {
                    if (json && json.status === 200) {
                        history.push(`/task/view/${json.id}`);
                    }
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
        const { submitting } = this.state;
        const {
            form: { getFieldDecorator },
        } = this.props;

        return (
            <Card title="创建任务">
                {this.renderErrorMessage()}
                <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label="任务名称">
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入任务名称',
                                },
                            ],
                        })(<Input placeholder="请输入任务名称" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="任务描述">
                        {getFieldDecorator('description', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入任务描述',
                                },
                            ],
                        })(<TextArea placeholder="请输入任务描述" />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="截止时间">
                        {getFieldDecorator('enddate', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择截止时间',
                                },
                            ],
                        })(
                            <DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            />
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
