import React from 'react';
import { Icon } from 'antd';

export default props => (
    <div className="noData" {...props}>
        <Icon type="frown-o" />
        暂无数据
    </div>
);
