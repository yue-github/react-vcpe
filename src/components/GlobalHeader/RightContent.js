import React, { PureComponent } from 'react';
import map from 'lodash/map';
import { Spin, Menu, Icon, Dropdown, Avatar, Badge } from 'antd';
import router from 'umi/router';
import styles from './index.less';
import env from '../../../config/env';

export default class GlobalHeaderRight extends PureComponent {
    onOrgClick(item) {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/saveOrganization',
            payload: item,
        });
    }
    resetPassword(){
        
    }
    render() {
        let {
            currentUser,
            organizations,
            currentOrganization,
            onMenuClick,
            theme,
            noticesCount,
        } = this.props;
        // currentUser={
        //     avatar:'',
        //     name:'wutongyue'
        // };
        // if(currentUser[0].name)currentUser=currentUser[0];
        // console.log('components/GlobalHeader/RightContent');
        const menu = (
            <Menu className={styles.menu} onClick={onMenuClick}>
                <Menu.Item key="settings">
                    <Icon type="user" />
                    账号资料
                </Menu.Item>
                <Menu.Item key="security">
                    <Icon type="safety" />
                    安全设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    退出登录
                </Menu.Item>
            </Menu>
        );
        const orgMenu = (
            <Menu className={styles.menu}>
                {map(organizations, item => (
                    <Menu.Item key={item.id} onClick={e => this.onOrgClick(item, e)}>
                        {item.insname}
                    </Menu.Item>
                ))}
            </Menu>
        );
        let className = styles.right;
        if (theme === 'dark') {
            className = `${styles.right}  ${styles.dark}`;
        }
        return (
            <div className={className}>
                {currentOrganization ? (
                    <Dropdown overlay={orgMenu} className={styles.dropdown}>
                        <span>
                            {currentOrganization.insname} <Icon type="down" />
                        </span>
                    </Dropdown>
                ) : (
                    <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
                )}

                <span className={styles.action}>
                    <Badge count={noticesCount} onClick={() => router.push('/messages')}>
                        <Icon type="bell" style={{ padding: 4 }} />
                    </Badge>
                </span>
                {currentUser.name ? (
                    <Dropdown overlay={menu}>
                        <span className={`${styles.action} ${styles.account}`}>
                            <Avatar
                                size="small"
                                className={styles.avatar}
                                src={env.static.path + currentUser.avatar}
                                alt="avatar"
                            />
                            <span className={styles.name}>{currentUser.name}</span>
                        </span>
                    </Dropdown>
                ) : (
                    <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
                )}
            </div>
        );
    }
}
