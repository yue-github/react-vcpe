import React, { PureComponent } from 'react';
import map from 'lodash/map';
import { Card, List, Form } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};

class FormList extends PureComponent {
    getForm() {
        const { form } = this.props;
        return form;
    }

    renderForm(fields) {
        const {
            data,
            mapping,
            formProps,
            form: { getFieldDecorator },
        } = this.props;

        return (
            <div style={{ marginTop: 8 }} {...formProps}>
                {map(fields, (key, _) => {
                    const field = mapping[key];
                    if (!field) {
                        return null;
                    }
                    const value = field.value ? field.value(data[key], data, field) : data[key];
                    return (
                        <FormItem {...formItemLayout} label={field.label} key={_}>
                            {getFieldDecorator(key, {
                                rules: field.rules,
                                initialValue: value,
                            })(React.createElement(field.item, field.itemProps))}
                        </FormItem>
                    );
                })}
            </div>
        );
    }

    renderFields(fields) {
        const { editMode, mapping, listProps } = this.props;

        if (editMode) {
            return this.renderForm(fields);
        }

        const { data } = this.props;

        const dataSource = map(fields, key => {
            const field = mapping[key];
            if (!field) {
                return null;
            }
            const display = field.display ? field.display(data[key], data, field) : data[key];
            return (
                <span>
                    {field.label}：{display || field.defaultDisplay || ''}
                </span>
            );
        });

        return (
            <List
                dataSource={dataSource}
                renderItem={item => <List.Item style={{ paddingLeft: 24 }}>{item}</List.Item>}
                {...listProps}
            />
        );
    }

    render() {
        const { fields, title, cardProps } = this.props;
        return (
            <Card title={title} bodyStyle={{ padding: 0 }} {...cardProps}>
                {this.renderFields(fields)}
            </Card>
        );
    }
}

export default FormList;
