import { connect } from 'dva/index';
import React, { Component } from 'react';
import { Row, Col, Icon, Rate, Button, Form, Input, Cascader, Select } from 'antd';
import InputNumber from '../../../components/Extends/InputNumber';
import ListForm from '../../../components/ListForm';
import REGIONS from '../../../constants/region';
import { INDUSTRY, STATE, SOURCES, FINANCING, CURRENCY } from '../../../constants/project';
import { toOptions } from '../../../utils/utils';

const mapping = {
    proname: {
        label: '项目名称',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入项目名称',
        },
        rules: [
            {
                required: true,
                message: '请输入项目名称',
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
        value: (val, basic) => [basic.province, basic.area],
        itemProps: {
            options: REGIONS,
            placeholder: '请输入选择所属区域',
        },
    },
    industryid: {
        label: '行业领域',
        defaultDisplay: '未知',
        display: v => INDUSTRY[v],
        item: Select,
        itemProps: {
            placeholder: '请选择行业领域',
            children: toOptions(INDUSTRY),
        },
        rules: [
            {
                required: true,
                message: '请选择行业领域',
            },
        ],
    },
    state: {
        label: '项目状态',
        defaultDisplay: '未知',
        display: v => STATE[v],
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
    source: {
        label: '项目来源',
        defaultDisplay: '未知',
        display: v => SOURCES[v],
        item: Select,
        itemProps: {
            children: toOptions(SOURCES),
            placeholder: '请选择项目来源',
        },
        rules: [
            {
                required: true,
                message: '请输入项目名称',
            },
        ],
    },
    newrounds: {
        label: '最新获投轮次',
        defaultDisplay: '未知',
        display: v => FINANCING[v],
        item: Select,
        itemProps: {
            children: toOptions(FINANCING),
            placeholder: '请选择最新获投轮次',
        },
        rules: [
            {
                required: true,
                message: '请输入项目名称',
            },
        ],
    },
    valuation: {
        label: '目前估值',
        defaultDisplay: '未知',
        item: InputNumber,
        display: v => `${v}万元`,
        itemProps: {
            placeholder: '请输入目前估值',
            addonAfter: '万元',
        },
        rules: [
            {
                required: true,
                message: '请输入目前估值',
            },
        ],
    },
    conistype: {
        label: '估值币种',
        defaultDisplay: '未知',
        display: v => CURRENCY[v],
        item: Select,
        itemProps: {
            children: toOptions(CURRENCY),
            placeholder: '请选择估值币种',
        },
        rules: [
            {
                required: true,
                message: '请选择估值币种',
            },
        ],
    },
    level: {
        label: '优先级',
        defaultDisplay: '未知',
        display: value => (
            <Rate character={<Icon type="flag" />} value={value} style={{ fontSize: 14 }} />
        ),
        item: Rate,
        itemProps: {
            character: <Icon type="flag" />,
            style: { fontSize: 14 },
        },
    },
    intro: {
        label: '项目介绍',
        defaultDisplay: '未填写',
        item: Input.TextArea,
        itemProps: {
            placeholder: '请输入项目介绍',
        },
    },
    link: {
        label: '主页链接',
        defaultDisplay: '未填写',
        item: Input,
        itemProps: {
            placeholder: '请输入主页链接',
        },
    },
    remark: {
        label: '项目备注',
        defaultDisplay: '未填写',
        item: Input.TextArea,
        itemProps: {
            placeholder: '项目的其他备注信息',
        },
    },
    foundername: {
        label: '创始人姓名',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入创始人姓名',
        },
    },
    founteremail: {
        label: '创始人邮箱',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            type: 'email',
            placeholder: '请输入创始人邮箱',
        },
    },
    founderetel: {
        label: '创始人电话',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入创始人电话',
        },
    },
};

@connect(({ loading }) => ({
    submitting: loading.effects['projectView/updateBasic'],
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
                    type: 'projectView/updateBasic',
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
                        <Button type="primary" loading={submitting} htmlType="submit">
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
            'proname',
            'province',
            'industryid',
            'state',
            'source',
            'newrounds',
            'valuation',
            'conistype',
            'level',
            'link',
            'intro',
            'remark',
        ];
        const founderFields = ['foundername', 'founteremail', 'founderetel'];

        return (
            <Form onSubmit={this.handleSubmit}>
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
                            title="创始人信息"
                            mapping={mapping}
                            data={data}
                            fields={founderFields}
                            editMode={editMode}
                            form={form}
                        />
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Basic;
