import React, { Component, Fragment } from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';

const FormItem = Form.Item;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
    <Fragment>
        <div className={styles.avatar_title}>头像</div>
        <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
        </div>
        <Upload fileList={[]}>
            <div className={styles.button_view}>
                <Button icon="upload">更换头像</Button>
            </div>
        </Upload>
    </Fragment>
);

@connect(({ user }) => ({
    currentUser: user.currentUser,
}))
@Form.create()
class BaseView extends Component {
    componentDidMount() {
        this.setBaseInfo();
    }

    setBaseInfo = () => {
        const { currentUser, form } = this.props;
        Object.keys(form.getFieldsValue()).forEach(key => {
            const obj = {};
            obj[key] = currentUser[key] || null;
            form.setFieldsValue(obj);
        });
    };

    getAvatarURL() {
        const { currentUser } = this.props;
        if (currentUser.avatar) {
            return currentUser.avatar;
        }
        return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    }

    getViewDom = ref => {
        this.view = ref;
    };

    handleSubmit = e => {
        e.stopPropagation();
    };

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <div className={styles.baseView} ref={this.getViewDom}>
                <div className={styles.left}>
                    <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
                        <FormItem label="用户名">
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ],
                            })(<Input placeholder="请输入用户名" />)}
                        </FormItem>
                        <FormItem label="邮箱">
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入邮箱地址',
                                    },
                                ],
                            })(<Input placeholder="请输入邮箱地址" />)}
                        </FormItem>
                        <Button type="primary">保存</Button>
                    </Form>
                </div>
                <div className={styles.right}>
                    <AvatarView avatar={this.getAvatarURL()} />
                </div>
            </div>
        );
    }
}

export default BaseView;
