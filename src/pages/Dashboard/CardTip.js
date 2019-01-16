import React, { PureComponent } from 'react';
import { Tooltip, Icon } from 'antd';

class CardTip extends PureComponent {
    render() {
        const { title } = this.props;
        return (
            <Tooltip title={title}>
                <Icon type="info-circle-o" />
            </Tooltip>
        );
    }
}

export default CardTip;
