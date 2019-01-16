import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Form, Input, Button, Row, Col, Popover, Progress, Alert } from 'antd';
import styles from './Register.less';

const FormItem = Form.Item;

const passwordStatusMap = {
    ok: <div className={styles.success}>强度：强</div>,
    pass: <div className={styles.warning}>强度：中</div>,
    poor: <div className={styles.error}>强度：太短</div>,
};

const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
};

@connect(({ forgetPassword, loading }) => ({
    ...forgetPassword,
    submitting: loading.effects['forgetPassword/submit'],
}))
@Form.create()
class ForgetPassword extends Component {
    state = {
        count: 0,
        confirmDirty: false,
        visible: false,
        help: '',
        token: null,
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onGetCaptcha = () => {
        const { form } = this.props;
        form.validateFields(['mobile'], {}, (err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                dispatch({
                    type: 'forgetPassword/sendForgetPasswordSmsCode',
                    payload: values.mobile,
                }).then(json => {
                    if (json) {
                        let count = 59;
                        this.setState({ count, token: json.token });
                        this.interval = setInterval(() => {
                            count -= 1;
                            this.setState({ count });
                            if (count === 0) {
                                clearInterval(this.interval);
                            }
                        }, 1000);
                    }
                });
            }
        });
    };

    getPasswordStatus = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch } = this.props;
        const { token } = this.state;
        form.validateFields({ force: true }, (err, values) => {
            if (!err) {
                dispatch({
                    type: 'forgetPassword/submit',
                    payload: {
                        token,
                        ...values,
                    },
                });
            }
        });
    };

    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        const { visible, confirmDirty } = this.state;
        if (!value) {
            this.setState({
                help: '请输入密码！',
                visible: !!value,
            });
            callback('error');
        } else {
            this.setState({
                help: '',
            });
            if (!visible) {
                this.setState({
                    visible: !!value,
                });
            }
            if (value.length < 6) {
                callback('error');
            } else {
                const { form } = this.props;
                if (value && confirmDirty) {
                    form.validateFields(['confirm'], { force: true });
                }
                callback();
            }
        }
    };

    renderPasswordProgress = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        const passwordStatus = this.getPasswordStatus();
        return value && value.length ? (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className={styles.progress}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );

    render() {
        const { form, submitting, status, errorMessage } = this.props;
        const { getFieldDecorator } = form;
        const { count, help, visible } = this.state;
        return (
            <div className={styles.main}>
                <h3>找回密码</h3>
                {status !== 200 && errorMessage ? this.renderMessage(errorMessage) : null}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('mobile', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号！',
                                },
                                {
                                    pattern: /^1\d{10}$/,
                                    message: '手机号格式错误！',
                                },
                            ],
                        })(<Input size="large" placeholder="11位手机号" />)}
                    </FormItem>
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={16}>
                                {getFieldDecorator('captcha', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入验证码！',
                                        },
                                    ],
                                })(<Input size="large" placeholder="验证码" />)}
                            </Col>
                            <Col span={8}>
                                <Button
                                    size="large"
                                    disabled={count}
                                    className={styles.getCaptcha}
                                    onClick={this.onGetCaptcha}
                                >
                                    {count ? `${count} s` : '获取验证码'}
                                </Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem help={help}>
                        <Popover
                            content={
                                <div style={{ padding: '4px 0' }}>
                                    {passwordStatusMap[this.getPasswordStatus()]}
                                    {this.renderPasswordProgress()}
                                    <div style={{ marginTop: 10 }}>
                                        请至少输入 6 个字符。请不要使用容易被猜到的密码。
                                    </div>
                                </div>
                            }
                            overlayStyle={{ width: 240 }}
                            placement="right"
                            visible={visible}
                        >
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.checkPassword,
                                    },
                                ],
                            })(
                                <Input
                                    size="large"
                                    type="password"
                                    placeholder="至少6位密码，区分大小写"
                                />
                            )}
                        </Popover>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '请确认密码！',
                                },
                                {
                                    validator: this.checkConfirm,
                                },
                            ],
                        })(<Input size="large" type="password" placeholder="确认密码" />)}
                    </FormItem>
                    <FormItem>
                        <Button
                            size="large"
                            loading={submitting}
                            className={styles.submit}
                            type="primary"
                            htmlType="submit"
                        >
                            重置密码
                        </Button>
                        <Link className={styles.login} to="/User/Login">
                            使用已有账户登录
                        </Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default ForgetPassword;
