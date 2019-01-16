import { connect } from 'dva/index';
import React, { Component } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Icon, Button, Form, Card, List } from 'antd';

import styles from '../View.less';

@connect(({ investorView, loading }) => ({
    id: investorView.files.id,
    files: investorView.files.list,
    loading: loading.effects['investorView/fetchFiles'],
}))
@Form.create()
class Files extends Component {
    componentDidMount() {
        const { id, dispatch } = this.props;

        dispatch({
            type: 'investorView/fetchFiles',
            payload: {
                id,
            },
        });
    }

    handleItemClick = ({ id }) => {
        router.push(`/files/${id}`);
    };

    render() {
        const { loading, files, id } = this.props;
        return (
            <Card
                title="相关文档"
                bodyStyle={{ padding: 0 }}
                extra={
                    <Link to={`/files/${id}`}>
                        <Button type="primary">进入投资人文件库</Button>
                    </Link>
                }
            >
                <List
                    loading={loading}
                    dataSource={files}
                    renderItem={item => (
                        <List.Item
                            key={item.filename}
                            className={styles['file-item']}
                            onClick={() => this.handleItemClick(item)}
                        >
                            <div className={styles.content}>
                                <div>
                                    <Icon
                                        type="folder"
                                        style={{ fontSize: 20, verticalAlign: 'middle' }}
                                    />
                                    <span style={{ marginLeft: 16, verticalAlign: 'middle' }}>
                                        {item.filename}
                                    </span>
                                </div>
                                <span>{item.created_at}</span>
                            </div>
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default Files;
