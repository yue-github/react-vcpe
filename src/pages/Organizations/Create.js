import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert } from 'antd';
import styles from './Create.less';

const FormItem = Form.Item;

@connect(({ organization, loading }) => ({
    organization,
    submitting: loading.effects['organization/create'],
}))
@Form.create()
class OrganizationCreate extends Component {
    state = {};

    componentDidMount() {}

    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch } = this.props;
        form.validateFields({ force: true }, (err, values) => {
            if (!err) {
                dispatch({
                    type: 'organization/create',
                    payload: {
                        ...values,
                    },
                });
            }
        });
    };

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );

    render() {
        const { form, submitting, organization } = this.props;
        const { getFieldDecorator } = form;

        return (
            <div className={styles.main}>
                <h3>创建机构</h3>
                {organization.status !== 200 && organization.errorMessage
                    ? this.renderMessage(organization.errorMessage)
                    : null}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('insname', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入机构名称！',
                                },
                            ],
                        })(<Input size="large" placeholder="机构名称" />)}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('contactname', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入联系人姓名！',
                                },
                            ],
                        })(<Input size="large" placeholder="联系人姓名" />)}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('contacttel', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入联系人手机号！',
                                },
                            ],
                        })(<Input size="large" placeholder="联系人手机号" />)}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('contactadress', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入联系人地址！',
                                },
                            ],
                        })(<Input size="large" placeholder="联系人地址" />)}
                    </FormItem>
                    <FormItem>
                        <Button size="large" loading={submitting} type="primary" htmlType="submit">
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default OrganizationCreate;
