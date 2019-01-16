import { connect } from 'dva/index';
import moment from 'moment';
import React, { Component } from 'react';
import { Input, Select, Form, Button, DatePicker } from 'antd';
import InputNumber from '../../../components/Extends/InputNumber';
import ListForm from '../../../components/ListForm';
import { COMPANY_TYPE } from '../../../constants/project';
import { toOptions } from '../../../utils/utils';

const { RangePicker } = DatePicker;

const mapping = {
    companyname: {
        label: '公司名称',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入公司名称',
        },
        rules: [
            {
                required: true,
                message: '请输入公司名称',
            },
        ],
    },
    registenum: {
        label: '注册号',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入注册号',
        },
        rules: [
            {
                required: true,
                message: '请输入注册号',
            },
        ],
    },
    companytype: {
        label: '公司类型',
        defaultDisplay: '未知',
        display: v => COMPANY_TYPE[v],
        item: Select,
        itemProps: {
            placeholder: '请选择公司类型',
            children: toOptions(COMPANY_TYPE),
        },
        rules: [
            {
                required: true,
                message: '请选择公司类型',
            },
        ],
    },
    date: {
        label: '营业期限',
        defaultDisplay: '未知',
        display: (v, data) => `${data.begindate}  至  ${data.enddate}`,
        value: (v, data) => [moment(data.begindate), moment(data.enddate)],
        item: RangePicker,
        itemProps: {},
        rules: [
            {
                required: true,
                message: '请输入营业期限',
            },
        ],
    },
    registauthority: {
        label: '登记机关',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入登记机关',
        },
        rules: [
            {
                required: true,
                message: '请输入登记机关',
            },
        ],
    },
    registdate: {
        label: '注册时间',
        defaultDisplay: '未知',
        item: DatePicker,
        value: v => moment(v),
        itemProps: {},
        rules: [
            {
                required: true,
                message: '请输入注册时间',
            },
        ],
    },
    registcash: {
        label: '注册资本',
        defaultDisplay: '未知',
        display: v => `${v} 万元`,
        item: InputNumber,
        itemProps: {
            placeholder: '请输入注册资本',
            addonAfter: '万元',
        },
        rules: [
            {
                required: true,
                message: '请输入注册资本',
            },
        ],
    },
    adoptdate: {
        label: '发照日期',
        defaultDisplay: '未知',
        value: v => moment(v),
        item: DatePicker,
        itemProps: {},
        rules: [
            {
                required: true,
                message: '请输入发照日期',
            },
        ],
    },
    companyadress: {
        label: '公司地址',
        defaultDisplay: '未知',
        item: Input,
        itemProps: {
            placeholder: '请输入公司地址',
        },
        rules: [
            {
                required: true,
                message: '请输入公司地址',
            },
        ],
    },
};

@connect(({ loading }) => ({
    submitting: loading.effects['projectView/updateBasic'],
}))
@Form.create()
class Company extends Component {
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
                    编辑工商信息
                </Button>
            </div>
        );
    }

    render() {
        const { data, form } = this.props;
        const { editMode } = this.state;
        const fields = [
            'companyname',
            'registenum',
            'companytype',
            'date',
            'registauthority',
            'registdate',
            'registcash',
            'adoptdate',
            'companyadress',
        ];

        return (
            <div>
                {this.renderAction()}
                <ListForm
                    title="注册信息"
                    mapping={mapping}
                    data={data}
                    fields={fields}
                    editMode={editMode}
                    form={form}
                />
            </div>
        );
    }
}

export default Company;
