import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Select, Row, Cascader, Col } from 'antd';
import * as i18n from '../../../../../utils/i18n';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';
import { numValid, userRealNameValidate } from '../../../../../utils/vaild';
import SuBankQueryForm from '../subBankInfo/SuBankQueryForm';
import SubBankCallBackPageTable from '../subBankInfo/SubBankCallBackPageTable';
import currency from '../../../../../../config/i18n/zh-cn/currency.json';
import { getProvLabel, getCityLabel } from '../../../../../utils/continentCountryProvCityUtil';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;

const AgentStepForm2 = (props) => {
  const bizMap = i18n.bizMap('mms/agent');
  const vaildMap = i18n.bizMap('mms/agentVaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick, prevClick, bankList, querySubBanklist,
    subBankList, subBankModalVisible, onCancelSubBankModel } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const stlBankNameOnSelect = (value) => {
    if (value && value.split('-').length > 0) {
      setFieldsValue({ stlBank: value.split('-')[0] });
    }
  }

  const queryFormProps = {
    formSubmit: (datas) => {
      const formData = getFieldsValue();
      const param = {};
      if (formData.stlProvCity && formData.stlProvCity.length > 0) {
        param.provName = getProvLabel(formData.stlProvCity[2]);
        param.cityName = getCityLabel(formData.stlProvCity[3]);
      }
      param.subBranch = datas.subBranch;
      param.bankParentCode = formData.stlBankName && formData.stlBankName.split('-').length > 2 ? formData.stlBankName.split('-')[2] : '';
      querySubBanklist(Object.assign({}, param, { currentPage: 1 }));
    },
  };

  const handleQuerySubBanklist = () => {
    const formData = getFieldsValue();
    const param = {};
    if (formData.stlProvCity && formData.stlProvCity.length > 0) {
      param.provName = getProvLabel(formData.stlProvCity[2]);
      param.cityName = getCityLabel(formData.stlProvCity[3]);
    }
    param.bankParentCode = formData.stlBankName && formData.stlBankName.split('-').length > 2 ? formData.stlBankName.split('-')[2] : '';
    querySubBanklist(Object.assign(param, { currentPage: 1 }));
  }

  const infoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.subBankDetail,
    visible: subBankModalVisible,
    onCancel: () => {
      onCancelSubBankModel();
    },
  };

  const tableProps = {
    tableCurrentPage: subBankList.tableCurrentPage,
    tableList: subBankList.tableList,
    tableTotal: subBankList.tableTotal,
    tableLoading: subBankList.tableLoading,
    tablePageChange(next) {
      const param = subBankList.tableParam;
      param.currentPage = next;
      const formData = getFieldsValue();
      param.provName = getProvLabel(formData.stlProvCity[2]);
      param.cityName = getCityLabel(formData.stlProvCity[3]);
      param.bankParentCode = formData.stlBankName && formData.stlBankName.split('-').length > 2 ? formData.stlBankName.split('-')[2] : '';
      querySubBanklist(param);
    },
    rowClickCallback(data) {
      form.setFieldsValue({ stlCnaps: data.bankCode });
      form.setFieldsValue({ stlCnapsName: data.subBranch });
      onCancelSubBankModel();
    },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        dat.stlCity = dat.stlProvCity.join(',');
        if (dat.stlBankName && dat.stlBankName.split('-').length > 1) {
          dat.stlBankName = dat.stlBankName.split('-')[1];
        }
        delete dat.stlProvCity;
        nextClick(dat);
      }
    });
  };

  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlName', {
                initialValue: data.stlName,
                rules: [{ required: true, message: vaildMap.vaildAgtStlName },
                { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.stlName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.ccy} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('ccy', {
                initialValue: data.ccy,
                rules: [{ required: true, message: vaildMap.vaildCcy }],
              })(

                <Select>
                  {
                      currency.map((item, idx) => {
                        return <Option key={idx} value={item.value}>{item.label}</Option>;
                      })
                    }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlAcc} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlAcc', {
                initialValue: data.stlAcc,
                rules: [{ required: true, message: vaildMap.vaildAgtStlAc },
                { validator: numValid }],
              })(
                <Input placeholder={bizMap.stlAcc} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlBankName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlBankName', {
                initialValue: data.bizScope,
                rules: [{ required: true, message: vaildMap.vaildStlBankName }],
              })(
                <Select onSelect={value => stlBankNameOnSelect(value)} showSearch>
                  {
                    bankList.map((item, idx) => {
                      return <Option key={idx} value={`${item.bankCode}-${item.bankName}-${item.bankNo}`}>{item.bankName}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlBank} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlBank', {
                initialValue: data.stlBank ? data.stlBank : '',
                rules: [{ required: true, message: vaildMap.vaildStlBank }],
              })(
                <Input placeholder={bizMap.stlBank} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.agtprovCityArea} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlProvCity', {
                initialValue: data.stlCity ? data.stlCity.split(',') : null,
                rules: [{ required: true, message: vaildMap.vaildAddress }],
              })(
                <Cascader placeholder={bizMap.agtprovCityArea} options={CITYDATAS} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.stlCnapsName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('stlCnapsName', {
                initialValue: data.stlCnapsName,
              })(
                <Input placeholder={bizMap.stlCnapsName} onClick={handleQuerySubBanklist} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
        {subBankModalVisible
        ? <Col>
          <Modal {...infoModalProps}>
            <SuBankQueryForm {...queryFormProps} />
            <SubBankCallBackPageTable {...tableProps} />
          </Modal>
        </Col>
        : null
       }
        <Col span={24}>
          <FormItem label={bizMap.stlCnaps} {...formItemLayout} hasFeedback >
            {
              getFieldDecorator('stlCnaps', {
                initialValue: data.stlCnaps,
              })(
                <Input placeholder={bizMap.stlCnaps} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split" className="split">&nbsp;</h4>
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button onClick={prevClick} style={{ marginRight: 16 }}>{commonMap.prevStep}</Button>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.nextStep}</Button>
        </Col>
      </Row>
    </Form>
  );
}

AgentStepForm2.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  prevClick: PropTypes.func,
  querySubBanklist: PropTypes.func,
};

AgentStepForm2.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  prevClick: noop,
  querySubBanklist: noop,
}

export default Form.create()(AgentStepForm2);
