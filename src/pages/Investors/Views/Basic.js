import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Cascader, Select } from 'antd';
import ListForm from '../../../components/ListForm';
import REGIONS, { getName } from '../../../constants/region';
import { STATE, TYPES, ASSETS } from '../../../constants/inverstors';
import { toOptions } from '../../../utils/utils';

const mapping = {
    name: {
        label: '客户名称',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入客户名称',
        },
        rules: [
            {
                required: true,
                message: '请输入客户名称',
            },
        ],
    },
    type: {
        label: '项目类型',
        defaultDisplay: '未知',
        display: v => TYPES[v],
        value: v => TYPES[v],
        item: Select,
        itemProps: {
            children: toOptions(TYPES),
            placeholder: '请选择客户类型',
        },
        rules: [
            {
                required: true,
                message: '请选择客户类型',
            },
        ],
    },
    state: {
        label: '项目状态',
        defaultDisplay: '未知',
        display: v => STATE[v],
        value: v => STATE[v],
        item: Select,
        itemProps: {
            children: toOptions(STATE),
            placeholder: '请选择项目状态',
        },
        rules: [
            {
                required: true,
                message: '请选择项目状态',
            },
        ],
    },
    province: {
        label: '所属区域',
        defaultDisplay: '未知',
        rules: [
            {
                required: true,
                message: '请选择所属区域',
            },
        ],
        item: Cascader,
        value: (val, basic) => [basic.province - 0, basic.area - 0],
        display: (val, basic) => getName([basic.province, basic.area]),
        itemProps: {
            options: REGIONS,
            placeholder: '请输入选择所属区域',
        },
    },
    assets: {
        label: '可投资资产(万元)',
        defaultDisplay: '未知',
        display: v => ASSETS[v],
        value: v => ASSETS[v],
        item: Select,
        itemProps: {
            children: toOptions(ASSETS),
            placeholder: '请选择可投资资产',
        },
        rules: [
            {
                required: true,
                message: '请选择可投资资产',
            },
        ],
    },
    identitylabel: {
        label: '身份标签',
        defaultDisplay: '未填写',
        item: Input,
        itemProps: {
            placeholder: '请输入身份标签',
        },
    },
    hobbylabel: {
        label: '投资偏好',
        defaultDisplay: '',
        item: Select,
        value: val => val.split('、'),
        itemProps: {
            mode: 'tags',
            placeholder: '请设置投资偏好',
        },
    },
    remark: {
        label: '其他备注',
        defaultDisplay: '未填写',
        item: Input.TextArea,
        itemProps: {
            placeholder: '其他备注信息',
        },
    },
    tel: {
        label: '联系电话',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入联系电话',
        },
    },
    email: {
        label: '邮箱',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            type: 'email',
            placeholder: '请输入邮箱',
        },
    },
    address: {
        label: '联系地址',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入联系地址',
        },
    },
    bankuser: {
        label: '户名',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入户名',
        },
    },
    bankuarea: {
        label: '开户行',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入开户行',
        },
    },
    bankid: {
        label: '银行卡号',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入银行卡号',
        },
    },
};

@connect(({ loading }) => ({
    submitting: loading.effects['investorView/updateBasic'],
}))
@Form.create()
class Basic extends Component {
    state = {
        // 表单模式
        editMode: false,
    };

    handleSubmit = () => {
        const { form, dispatch, id } = this.props;

        form.validateFieldsAndScroll((err, payload) => {
            if (!err) {
                dispatch({
                    type: 'investorView/updateBasic',
                    payload: {
                        id,
                        ...payload,
                    },
                }).then(() => this.setState({ editMode: false }));
            }
        });
    };

    renderAction() {
        const { submitting } = this.props;
        const { editMode } = this.state;
        if (editMode) {
            return (
                <div style={{ marginBottom: 24, textAlign: 'right' }}>
                    <span>
                        <Button type="primary" loading={submitting} onClick={this.handleSubmit}>
                            提交
                        </Button>
                        <Button onClick={() => this.setState({ editMode: false })}>取消</Button>
                    </span>
                </div>
            );
        }
        return (
            <div style={{ marginBottom: 24, textAlign: 'right' }}>
                <Button type="primary" onClick={() => this.setState({ editMode: true })}>
                    编辑基本信息
                </Button>
            </div>
        );
    }

    render() {
        const { data, form } = this.props;
        const { editMode } = this.state;
        const basicFields = [
            'name',
            'type',
            'state',
            'province',
            'assets',
            'identitylabel',
            'hobbylabel',
            'remark',
        ];
        return (
            <div>
                {this.renderAction()}
                <Row gutter={24}>
                    <Col xs={24} sm={12}>
                        <ListForm
                            title="基本信息"
                            mapping={mapping}
                            data={data}
                            fields={basicFields}
                            editMode={editMode}
                            form={form}
                        />
                    </Col>
                    <Col xs={24} sm={12}>
                        <ListForm
                            title="联系方式"
                            mapping={mapping}
                            data={data}
                            fields={['tel', 'email', 'address']}
                            editMode={editMode}
                            cardProps={{ style: { marginBottom: 35 } }}
                            form={form}
                        />
                        <ListForm
                            title="银行账户"
                            mapping={mapping}
                            data={data}
                            fields={['bankuser', 'bankuarea', 'bankid']}
                            editMode={editMode}
                            form={form}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Basic;
