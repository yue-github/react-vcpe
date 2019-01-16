import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Card, List, Icon, Divider, Modal, Button, Input, Upload, Breadcrumb } from 'antd';
import { getCurrentOrganizationId } from '../../services/organization';
import Authorized from '../../components/Authorized/Authorized';
import styles from './index.less';

const fileTypesIcon = {
    dir: 'folder',
    doc: 'file-word',
    xslx: 'file-excel',
    xsl: 'file-excel',
    ppt: 'file-ppt',
    text: 'file-text',
    pdf: 'file-pdf',
    jpg: 'file-jpg',
};

const { Dragger } = Upload;

@connect(({ filesList, loading }) => ({
    ...filesList,
    loading: loading.effects['filesList/fetchList'],
}))
class Files extends Component {
    state = {
        id: 0,
        dirModal: false,
        dirName: null,
        dirId: null,
        uploadModal: false,
    };

    componentDidMount() {
        const { match } = this.props;
        this.state.id = match.params.id || 0;
        this.fetchList();
    }

    componentWillReceiveProps(nextProps) {
        const {
            match: {
                params: { id },
            },
        } = nextProps;
        const {
            match: {
                params: { id: oldId },
            },
        } = this.props;

        if (id !== oldId) {
            this.setState({ id: id || 0 });
            this.fetchList(id);
        }
    }

    handleItemClick = ({ id }) => {
        const { history } = this.props;
        history.push(`/files/${id}`);
    };

    handleDelete = (e, item) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'filesList/deleteFile',
            payload: {
                id: item.id,
            },
        }).then(() => this.fetchList());
    };

    handleDirSave = () => {
        const { dirName, dirId, id } = this.state;
        const { dispatch } = this.props;
        if (dirName) {
            let response;
            if (dirId) {
                response = dispatch({
                    type: 'filesList/updateDir',
                    payload: {
                        id: dirId,
                        filename: dirName,
                    },
                });
            } else {
                response = dispatch({
                    type: 'filesList/createDir',
                    payload: {
                        parentid: id,
                        filename: dirName,
                    },
                });
            }

            response.then(json => {
                if (json && json.status === 200) {
                    this.fetchList();
                }
            });
        }
    };

    fetchList(cid) {
        const { dispatch } = this.props;
        const { id } = this.state;
        dispatch({
            type: 'filesList/fetchList',
            payload: {
                fileid: cid === undefined ? id : cid,
            },
        });
    }

    renderAddModal() {
        const { dirModal, dirName, dirId } = this.state;

        return (
            <Modal
                visible={dirModal}
                title={dirId ? '重命名文件夹' : '新建文件夹'}
                onCancel={() => this.setState({ dirModal: false })}
                onOk={this.handleDirSave}
            >
                <Input
                    defaultValue={dirName}
                    placeholder="请输入文件夹名"
                    onChange={e => this.setState({ dirName: e.target.value })}
                />
            </Modal>
        );
    }

    renderUploadModal() {
        const { uploadModal, id } = this.state;
        return (
            <Modal
                visible={uploadModal}
                title="上传文件"
                footer={false}
                onCancel={() => {
                    this.setState({ uploadModal: false });
                    this.fetchList();
                }}
            >
                <Dragger
                    action="/api/file/uploadFile"
                    data={{ parentid: id, insid: getCurrentOrganizationId() }}
                    name="file"
                    listType="picture"
                    multipe
                >
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或者拖拽选择文件</p>
                    <p className="ant-upload-hint">
                        支持单个文件或批量上传，单个文件大小不得超过10M
                    </p>
                </Dragger>
            </Modal>
        );
    }

    renderItem = item => {
        const Operation = () => (
            <span>
                <a
                    onClick={() =>
                        this.setState({ dirModal: true, dirId: item.id, dirName: item.filename })
                    }
                >
                    编辑
                </a>
                <Divider type="vertical" />
                <a
                    onClick={e => {
                        e.stopPropagation();
                        Modal.confirm({
                            title: '警告',
                            content: '您是否要删除该文件，删除后不可恢复！',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: () => this.handleDelete(e, item),
                        });
                    }}
                >
                    删除
                </a>
            </span>
        );

        return (
            <List.Item
                key={item.filename}
                className={styles.item}
                onClick={() => this.handleItemClick(item)}
            >
                <div className={styles.content}>
                    <div>
                        <Icon
                            type={
                                item.is_floder
                                    ? fileTypesIcon.dir
                                    : fileTypesIcon[item.type] || item.type
                            }
                            style={{ fontSize: 20, verticalAlign: 'middle' }}
                        />
                        <span style={{ marginLeft: 16, verticalAlign: 'middle' }}>
                            {item.filename}
                        </span>
                    </div>
                    {item.is_system ? <span>系统文件夹</span> : <Operation item={item} />}
                </div>
            </List.Item>
        );
    };

    render() {
        const { files, loading, isOperation } = this.props;

        return (
            <Card
                title="文件柜"
                bodyStyle={{ padding: 0 }}
                loading={loading}
                extra={
                    isOperation ? (
                        <div>
                            <Authorized authory="fileCreateDir">
                                <Button
                                    type="primary"
                                    icon="folder"
                                    onClick={() =>
                                        this.setState({
                                            dirModal: true,
                                            dirId: null,
                                            dirName: '',
                                        })
                                    }
                                >
                                    新建文件夹
                                </Button>{' '}
                            </Authorized>
                            <Authorized authory="fileUpload">
                                <Button
                                    icon="upload"
                                    onClick={() => this.setState({ uploadModal: true })}
                                >
                                    上传文件
                                </Button>
                            </Authorized>
                        </div>
                    ) : null
                }
            >
                <Breadcrumb />
                <List loading={loading} dataSource={files} renderItem={this.renderItem} />
                {this.renderAddModal()}
                {this.renderUploadModal()}
            </Card>
        );
    }
}

export default Files;
