import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Menu } from 'antd';
import GridContent from '../../../components/PageHeaderWrapper/GridContent';
import styles from './Info.less';

const { Item } = Menu;

@connect(({ user }) => ({
    currentUser: user.currentUser,
}))
class Info extends Component {
    constructor(props) {
        super(props);
        const { match, location } = props;
        const menuMap = {
            base: '基本设置',
            security: '安全设置',
            // binding: '账号绑定',
            // notification: '消息通知',
        };
        const key = location.pathname.replace(`${match.path}/`, '');
        this.state = {
            mode: 'inline',
            menuMap,
            selectKey: menuMap[key] ? key : 'base',
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { match, location } = props;
        let selectKey = location.pathname.replace(`${match.path}/`, '');
        selectKey = state.menuMap[selectKey] ? selectKey : 'base';
        if (selectKey !== state.selectKey) {
            return { selectKey };
        }
        return null;
    }

    getmenu = () => {
        const { menuMap } = this.state;
        return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
    };

    getRightTitle = () => {
        const { selectKey, menuMap } = this.state;
        return menuMap[selectKey];
    };

    selectKey = ({ key }) => {
        router.push(`/account/settings/${key}`);
        this.setState({
            selectKey: key,
        });
    };

    render() {
        const { children, currentUser } = this.props;
        if (!currentUser.id) {
            return '';
        }
        const { mode, selectKey } = this.state;
        return (
            <GridContent>
                <div className={styles.main}>
                    <div className={styles.leftmenu}>
                        <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
                            {this.getmenu()}
                        </Menu>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.title}>{this.getRightTitle()}</div>
                        {children}
                    </div>
                </div>
            </GridContent>
        );
    }
}

export default Info;
