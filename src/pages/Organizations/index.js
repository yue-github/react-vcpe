import React, { Component } from 'react';
import map from 'lodash/map';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Spin, Modal, Input } from 'antd';
import styles from './index.less';

@connect(({ global, loading }) => ({
    organizations: global.organizations,
    loading: loading.effects['global/fetchOrganizations'],
}))
class Organizations extends Component {
    state = {
        editOrganization: null,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/fetchOrganizations',
        });
    }

    onItemClick(item) {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/saveOrganization',
            payload: item,
        });
    }

    onItemSettingClick(item, e) {
        e.stopPropagation();

        this.setState({ editOrganization: item });
    }

    handleSaveOrganization = () => {
        const { editOrganization } = this.state;
        const { dispatch } = this.props;

        if (editOrganization && editOrganization.insname) {
            dispatch({
                type: 'organization/updateOrganization',
                payload: {
                    insid: editOrganization.id,
                    insname: editOrganization.insname,
                },
            }).then(json => {
                if (json && json.status === 200) {
                    this.setState({ editOrganization: null });
                    dispatch({
                        type: 'global/fetchOrganizations',
                    });
                }
            });
        }
    };

    renderEditModal() {
        const { editOrganization } = this.state;
        if (!editOrganization) {
            return null;
        }

        return (
            <Modal
                visible
                title="修改机构名称"
                onCancel={() => this.setState({ editOrganization: null })}
                onOk={this.handleSaveOrganization}
            >
                <Input
                    placeholder="请输入机构名称"
                    value={editOrganization.insname}
                    onChange={e =>
                        this.setState({
                            editOrganization: {
                                ...editOrganization,
                                insname: e.target.value,
                            },
                        })
                    }
                />
            </Modal>
        );
    }

    renderContent() {
        const { organizations } = this.props;
        return (
            <div className={styles.organizations}>
                {map(organizations, item => (
                    <div className={styles.item} key={item.id}>
                        <div className={styles.box} onClick={e => this.onItemClick(item, e)}>
                            <div className={styles.title}>
                                <span>{item.insname}</span>
                                <span>
                                    <Icon
                                        type="setting"
                                        style={{ fontSize: '80%' }}
                                        onClick={e => this.onItemSettingClick(item, e)}
                                    />
                                </span>
                            </div>
                            <div>
                                <Icon type="caret-right" className={styles.icon} />
                                正在使用「
                                {item.spacemenu.name}」
                            </div>
                        </div>
                    </div>
                ))}
                <div className={styles.item}>
                    <div className={styles.box} style={{ textAlign: 'center', lineHeight: '42px' }}>
                        <Link to="/organizations/create">
                            <Icon type="plus" /> 新建
                        </Link>
                    </div>
                </div>
                {this.renderEditModal()}
            </div>
        );
    }

    render() {
        const { loading } = this.props;

        return loading ? (
            <div className={styles.organizations}>
                <Spin />
            </div>
        ) : (
            this.renderContent()
        );
    }
}

export default Organizations;
