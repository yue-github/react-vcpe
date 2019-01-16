import { connect } from 'dva/index';
import map from 'lodash/map';
import find from 'lodash/find';
import React, { PureComponent } from 'react';
import {
    Card,
    Row,
    Col,
    List,
    Button,
    Icon,
    Modal,
    Popconfirm,
    Form,
    Input,
    Avatar,
    Tooltip,
    Select,
    Divider,
    Switch,
    notification,
} from 'antd';

import { checkPermission } from '../../utils/Authorized';
import Authorized from '../../components/Authorized/Authorized';

import styles from './Role.less';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};

@connect(({ role, loading }) => ({
    ...role,
    loading: loading.effects['role/fetchRoles'],
    loadingUsers: loading.effects['role/fetchUsers'],
}))
class Roles extends PureComponent {
    state = {
        current: null,
        tab: 'users',
        users: [],
        addRoleModal: false,
        addRoleName: '',
        roleUserSwapModal: false,
        swapRoleUser: null,
        swapRole: null,
        permissions: null,
        invitePhone: '',
    };

    componentDidMount() {
        this.fetchRoles();
    }

    handleItemClick = item => {
        this.setState({ current: item.id });
        this.fetchUsers(item.id);
    };

    handleItemDelete = (item, e) => {
        const { dispatch } = this.props;
        e.stopPropagation();
        dispatch({
            type: 'role/deleteRole',
            payload: {
                roleid: item.id,
            },
        }).then(json => {
            if (json && json.status === 200) {
                this.setState({ current: null });
                this.fetchRoles();
            }
        });
    };

    handleAddRole = () => {
        this.setState({ addRoleModal: false });
        this.fetchRoles();
    };

    handleRoleUserSwap = () => {
        this.setState({ roleUserSwapModal: false, swapRoleUser: null, swapRole: null });
    };

    handleSendInvite = () => {
        const { invitePhone, current } = this.state;
        const { dispatch } = this.props;

        dispatch({
            type: 'role/sendInvite',
            payload: {
                phone: invitePhone,
                roleid: current,
            },
        }).then(json => {
            if (json && json.status === 200) {
                notification.success({
                    message: '发送成功',
                });
            }
        });
    };

    handleRemoveRoleUser(user) {
        const { dispatch } = this.props;
        const { current } = this.state;
        dispatch({
            type: 'role/deleteRoleUser',
            payload: {
                roleid: current,
                uid: user.id,
            },
        }).then(json => {
            if (json && json.status === 200) {
                this.fetchUsers();
            }
        });
    }

    handlePermissionChange(permission, open) {
        const { dispatch } = this.props;
        const { current } = this.state;

        dispatch({
            type: 'role/updatePermission',
            payload: {
                roleid: current,
                permissions: {
                    [permission.id]: open,
                },
            },
        }).then(json => {
            if (json && json.status === 200) {
                this.fetchPermissions();
            }
        });
    }

    fetchRoles() {
        const { dispatch } = this.props;
        const { current } = this.state;

        dispatch({
            type: 'role/fetchRoles',
        }).then(json => {
            if (json && json.roles && current === null) {
                this.setState({ current: json.roles[0].id });
                this.fetchUsers(json.roles[0].id);
            }
        });
    }

    fetchUsers(id) {
        const { dispatch } = this.props;
        const { current } = this.state;
        dispatch({
            type: 'role/fetchRoleUsers',
            payload: {
                id: id || current,
            },
        }).then(json => {
            if (json) {
                this.setState({ users: json.users });
            }
        });
    }

    fetchPermissions(id) {
        const { dispatch } = this.props;
        const { current } = this.state;
        dispatch({
            type: 'role/fetchPermissions',
            payload: {
                id: id || current,
            },
        }).then(json => {
            if (json) {
                this.setState({
                    permissions: json.menus,
                });
            }
        });
    }

    renderUsers() {
        const { users } = this.state;
        const { loadingUsers } = this.props;

        return (
            <List
                loading={loadingUsers}
                dataSource={users}
                renderItem={item => {
                    const actions = [];
                    if (checkPermission('roleUpdate')) {
                        actions.push(
                            <Tooltip title="切换角色">
                                <a
                                    onClick={() =>
                                        this.setState({
                                            roleUserSwapModal: true,
                                            swapRoleUser: item,
                                        })
                                    }
                                >
                                    <Icon type="swap" />
                                </a>
                            </Tooltip>
                        );
                    }
                    if (checkPermission('roleDelUser')) {
                        actions.push(
                            <Popconfirm
                                title="确定要从该机构中删除吗？"
                                onConfirm={() => this.handleRemoveRoleUser(item)}
                            >
                                <a>
                                    <Icon type="close" />
                                </a>
                            </Popconfirm>
                        );
                    }
                    return (
                        <List.Item actions={actions}>
                            <List.Item.Meta
                                avatar={<Avatar alt={item.name} src={item.avatar} size="large" />}
                                title={item.name}
                                description={item.email}
                            />
                        </List.Item>
                    );
                }}
            />
        );
    }

    renderPermissions() {
        const { permissions } = this.state;
        if (permissions === null) {
            this.fetchPermissions();
        }

        return (
            <div className={styles['permissions-box']}>
                {map(permissions, (item, i) => (
                    <div key={i} className={styles['permissions-group']}>
                        <div className={styles.permissions}>
                            <span>{item.name}</span>
                            <Switch
                                checked={item.checked}
                                onChange={e => this.handlePermissionChange(item, e)}
                            />
                        </div>
                        {map(item.childrens, child => (
                            <div key={child.id} className={styles.permissions}>
                                <span>{child.name}</span>
                                <Switch
                                    checked={child.checked}
                                    onChange={e => this.handlePermissionChange(child, e)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    renderInvite() {
        const { current, invitePhone } = this.state;
        const { roles } = this.props;
        const role = find(roles, { id: current });
        return (
            <div className={styles.invite}>
                <Icon type="team" />
                <br />
                <span className={styles.title}>
                    邀请成员加入【
                    {role.rolename}】
                </span>
                <br />
                <Input
                    placeholder="请输入用户手机号"
                    value={invitePhone}
                    onChange={e => this.setState({ invitePhone: e.target.value })}
                />
                <br />
                <Button type="primary" block onClick={this.handleSendInvite}>
                    发送邀请
                </Button>
            </div>
        );
    }

    renderAddRoleModal() {
        const { addRoleModal, addRoleName } = this.state;

        return (
            <Modal
                visible={addRoleModal}
                title="创建角色"
                onCancel={() => this.setState({ addRoleModal: false })}
                onOk={this.handleAddRole}
            >
                <FormItem label="角色名" {...formItemLayout}>
                    <Input
                        placeholder="请输入角色名"
                        value={addRoleName}
                        onChange={e => this.setState({ addRoleName: e.target.value })}
                    />
                </FormItem>
            </Modal>
        );
    }

    renderUserSwapModal() {
        const { roles } = this.props;
        const { current, roleUserSwapModal, swapRoleUser, swapRole } = this.state;

        if (!(current && swapRoleUser)) {
            return null;
        }
        const role = find(roles, 'id', current);
        const currentRole = swapRole || current;
        return (
            <Modal
                title="修改角色"
                visible={roleUserSwapModal}
                onCancel={() => this.setState({ roleUserSwapModal: false, swapRoleUser: null })}
                onOk={this.handleRoleUserSwap}
            >
                <List.Item.Meta
                    avatar={
                        <Avatar alt={swapRoleUser.name} src={swapRoleUser.avatar} size="large" />
                    }
                    title={`${swapRoleUser.name} (${role.rolename})`}
                    description={swapRoleUser.email}
                />
                <Divider />
                <FormItem label="新角色" {...formItemLayout}>
                    <Select
                        style={{ width: 300 }}
                        value={currentRole}
                        onChange={e => this.setState({ swapRole: e })}
                    >
                        {map(roles, item => (
                            <Select.Option value={item.id} key>
                                {item.rolename}
                            </Select.Option>
                        ))}
                    </Select>
                </FormItem>
            </Modal>
        );
    }

    renderItem(item, index) {
        const { current } = this.state;

        const classNames = [styles.item];
        if ((!current && index === 0) || item.id === current) {
            classNames.push(styles.active);
        }
        return (
            <List.Item className={classNames} onClick={e => this.handleItemClick(item, e)}>
                <div className={styles.content}>
                    <span> {item.rolename}</span>
                    <Authorized authority="roleDel">
                        <Popconfirm
                            title="确定要删除吗？"
                            onConfirm={e => this.handleItemDelete(item, e)}
                        >
                            <Icon type="close" style={{ fontSize: 12 }} />
                        </Popconfirm>
                    </Authorized>
                </div>
            </List.Item>
        );
    }

    renderContent() {
        const { tab } = this.state;

        switch (tab) {
            case 'users':
                return this.renderUsers();
            case 'permissions':
                return this.renderPermissions();
            case 'invite':
                return this.renderInvite();
            default:
                return null;
        }
    }

    render() {
        const { roles } = this.props;

        const operationTabList = [
            {
                key: 'users',
                tab: '用户列表',
            },
            {
                key: 'permissions',
                tab: '权限管理',
            },
        ];

        if (checkPermission('roleInvitation')) {
            operationTabList.push({
                key: 'invite',
                tab: '邀请成员',
            });
        }

        const { tab } = this.state;

        return (
            <Row gutter={24}>
                <Col sm={6} md={6} xl={6} lg={24}>
                    <Card title="角色" bodyStyle={{ padding: 0 }}>
                        <List
                            dataSource={roles}
                            renderItem={(item, index) => this.renderItem(item, index)}
                        >
                            <Authorized authority="roleAdd">
                                <List.Item style={{ padding: 12 }}>
                                    <div style={{ textAlign: 'center', width: '100%' }}>
                                        <Button
                                            icon="plus"
                                            type="primary"
                                            onClick={() => this.setState({ addRoleModal: true })}
                                        >
                                            创建角色
                                        </Button>
                                    </div>
                                </List.Item>
                            </Authorized>
                        </List>
                    </Card>
                </Col>
                <Col sm={18} md={18} xl={18} lg={24}>
                    <Card
                        activeTabKey={tab}
                        tabList={operationTabList}
                        onTabChange={t => this.setState({ tab: t })}
                    >
                        {this.renderContent()}
                    </Card>
                </Col>
                {this.renderAddRoleModal()}
                {this.renderUserSwapModal()}
            </Row>
        );
    }
}

export default Roles;
