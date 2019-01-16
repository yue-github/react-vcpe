import { connect } from 'dva/index';
import React, { Component, Fragment } from 'react';
import { List } from 'antd';

@connect(({ user }) => ({
    currentUser: user.currentUser,
}))
class SecurityView extends Component {
    getData = () => {
        const { currentUser } = this.props;
        return [
            {
                title: '账户密码',
                description: '定期修改密码已确保安全',
                actions: [<a>修改</a>],
            },
            {
                title: '手机号',
                description: currentUser.phone
                    ? `已绑定手机号：${currentUser.phone}`
                    : '请绑定手机',
                actions: [currentUser.phone ? <a>修改</a> : <a>绑定</a>],
            },
        ];
    };

    render() {
        return (
            <Fragment>
                <List
                    itemLayout="horizontal"
                    dataSource={this.getData()}
                    renderItem={item => (
                        <List.Item actions={item.actions}>
                            <List.Item.Meta title={item.title} description={item.description} />
                        </List.Item>
                    )}
                />
            </Fragment>
        );
    }
}

export default SecurityView;
