import React, { PureComponent } from 'react';
import { Icon, Menu, Dropdown } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';

import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';

export default class GlobalHeader extends PureComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }

    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        // eslint-disable-line
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    handleMenuClick = menu => {
        router.push({
            pathname: `/${menu.key}/create`,
            state: {},
        });
    };

    render() {
        const { collapsed, isMobile, logo } = this.props;
        const menu = (
            <Menu className={styles.menu} onClick={this.handleMenuClick}>
                <Menu.Item key="project">
                    <Icon type="project" />
                    项目
                </Menu.Item>
                <Menu.Item key="investor">
                    <Icon type="team" />
                    投资人
                </Menu.Item>
                <Menu.Item key="fund">
                    <Icon type="property-safety" />
                    基金
                </Menu.Item>
                <Menu.Item key="task">
                    <Icon type="flag" />
                    任务
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="organizations">
                    <Icon type="deployment-unit" />
                    机构
                </Menu.Item>
            </Menu>
        );
        return (
            <div className={styles.header}>
                {isMobile && (
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>
                )}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <Dropdown overlay={menu} className={styles['left-menu']}>
                    <span>
                        新建 <Icon type="down" />
                    </span>
                </Dropdown>
                <RightContent {...this.props} />
            </div>
        );
    }
}
