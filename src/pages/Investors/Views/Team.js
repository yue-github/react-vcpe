import React, { Component } from 'react';
import { List, Drawer, Divider } from 'antd';

class Team extends Component {
    static = {};

    render() {
        const { leaders, users, ...props } = this.props;
        return (
            <Drawer title="关系维护" placement="right" {...props}>
                <List
                    dataSource={leaders}
                    // renderItem={}
                />
                <Divider />
                <List
                    dataSource={users}
                    // renderItem={}
                />
            </Drawer>
        );
    }
}

export default Team;
