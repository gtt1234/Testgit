import React, { PropTypes } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { userRealNameValidate } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';

const Option = Select.Option;
const noop = () => { };
const FormItem = Form.Item;
const MerchantStoreUsrInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchantStore');
  const vaildMap = i18n.bizMap('mms/merchantStoreVaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, formBaseSubmit } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        formBaseSubmit(dat);
      }
    });
  };
  const handleReset = () => {
    resetFields();
  }
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col xs={24} sm={12} md={8}>
          <FormItem label={bizMap.usrId} {...formItemLayout}>
            {
              getFieldDecorator('usrId', {
                initialValue: data.usrId,
              })(
                <Input placeholder={bizMap.usrId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braUser} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braUser', {
                initialValue: data.braUser,
                rules: [{ required: true, message: vaildMap.vaildUsrName }, { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.braUser} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braUserName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braUserName', {
                initialValue: data.braUserName,
                rules: [{ required: true, message: vaildMap.vaildUsrRealName }, { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.braUserName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braName', {
                initialValue: data.braName,
                rules: [{ required: true, message: vaildMap.vaildEmail }, { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.braName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.braRole} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('braRole', {
                initialValue: data.braRole,
                rules: [{ required: true, message: vaildMap.vaildMobile }],
              })(
                <Select initialValue="">
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['braRole-0']}</Option>
                  <Option value="02">{bizMap['braRole-1']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.submit}</Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>{commonMap.reset}</Button>
        </Col>
      </Row>
    </Form>
  );
}

MerchantStoreUsrInfoForm.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  formBaseSubmit: PropTypes.func,
};

MerchantStoreUsrInfoForm.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  formBaseSubmit: noop,
}

export default Form.create()(MerchantStoreUsrInfoForm);
