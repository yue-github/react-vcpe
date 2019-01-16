import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Checkbox, Alert } from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const { Tab, Email, Password, Mobile, Submit } = Login;

@connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
    state = {
        type: 'mobile',
        autoLogin: true,
    };

    onTabChange = type => {
        this.setState({ type });
    };

    onGetCaptcha = () =>
        new Promise((resolve, reject) => {
            this.loginForm.validateFields(['mobile'], {}, (err, values) => {
                if (err) {
                    reject(err);
                } else {
                    const { dispatch } = this.props;
                    dispatch({
                        type: 'login/getCaptcha',
                        payload: values.mobile,
                    })
                        .then(resolve)
                        .catch(reject);
                }
            });
        });

    handleSubmit = (err, values) => {
        const { type } = this.state;
        if (!err) {
            const { dispatch } = this.props;
            // console.log(dispatch);
            dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    type,
                },
            });
        }
    };

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    );

    render() {
        const { login, submitting } = this.props;
        const { type, autoLogin } = this.state;
        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form;
                    }}
                >
                    <Tab key="mobile" tab="手机号登录">
                        {login.status !== 200 &&
                            login.type === 'mobile' &&
                            !submitting &&
                            this.renderMessage('手机号或密码错误')}
                        <Mobile name="phone" />
                        <Password
                            name="password"
                            placeholder="请输入密码"
                            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
                        />
                    </Tab>
                    <Tab key="email" tab="邮箱登录">
                        {login.status !== 200 &&
                            login.type === 'email' &&
                            !submitting &&
                            this.renderMessage('邮箱或密码错误')}
                        <Email name="email" placeholder="请输入邮箱" />
                        <Password
                            name="password"
                            placeholder="请输入密码"
                            onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
                        />
                    </Tab>
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            自动登录
                        </Checkbox>
                        <Link style={{ float: 'right' }} to="/User/forgetPassword">
                            忘记密码
                        </Link>
                    </div>
                    
                    <Submit loading={submitting}>登录</Submit>
                    <div className={styles.other}>
                        <Link className={styles.register} to="/User/Register">
                            注册账户
                        </Link>
                    </div>
                </Login>
            </div>
        );
    }
}

export default LoginPage;
