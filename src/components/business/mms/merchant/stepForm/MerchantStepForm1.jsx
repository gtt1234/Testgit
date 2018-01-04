import React, { PropTypes } from 'react';
import { Form, Input, Modal, Select, DatePicker, Button, Row, Col, Cascader, InputNumber } from 'antd';
import moment from 'moment';
import { apIDValid, limitNameSpaceValid, postValid, faxValid, phoneValid, mobileValid, userRealNameValidate, codeValid, emailValid, merSnameValid } from '../../../../../utils/vaild';
import * as i18n from '../../../../../utils/i18n';
import CITYDATAS from '../../../../../../config/i18n/zh-cn/continentCountryProvCityData.json';
import AREACODE from '../../../../../../config/i18n/zh-cn/continentCountryAreaCode.json';
import AgentQueryForm from '../agentInfo/AgentQueryForm';
import AgentCallBackPageTable from '../agentInfo/AgentCallBackPageTable';

const noop = () => { };
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const MerchantStepForm1 = (props) => {
  const dateFormat = 'YYYYMMDD';
  const bizMap = i18n.bizMap('mms/merchant');
  const vaildMap = i18n.bizMap('mms/merchantVaild');
  const commonMap = i18n.commonMap();
  const { form, style, data, submiting, nextClick, queryAgentList, onCancelAgentModel, agentModalVisible, agentData, bizSaleList } = props;
  const { getFieldDecorator, getFieldsValue, validateFieldsAndScroll, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const formItemLayout2 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    validateFieldsAndScroll((errors) => {
      if (errors) {
        console.log('errors =>', errors);
      } else {
        const dat = getFieldsValue();
        if (dat.idDat && dat.idDat.length > 0) {
          dat.idEffDat = dat.idDat[0].format(dateFormat);
          dat.idExpDat = dat.idDat[1].format(dateFormat);
        }
        if (dat.orgDat && dat.orgDat.length > 0) {
          dat.orgEffDat = dat.orgDat[0].format(dateFormat);
          dat.orgExpDat = dat.orgDat[1].format(dateFormat);
        }
        if (dat.licDat && dat.licDat.length > 0) {
          dat.licEffDat = dat.licDat[0].format(dateFormat);
          dat.licExpDat = dat.licDat[1].format(dateFormat);
        }
        if (dat.certDat && dat.certDat.length > 0) {
          dat.certEffDat = dat.certDat[0].format(dateFormat);
          dat.certExpDat = dat.certDat[1].format(dateFormat);
        }
        if (dat.lawDat && dat.lawDat.length > 0) {
          dat.lawEffDat = dat.lawDat[0].format(dateFormat);
          dat.lawExpDat = dat.lawDat[1].format(dateFormat);
        }
        if (dat.merAddress && dat.merAddress.length > 0) {
          dat.merArea = dat.merAddress.join(',');
        }

        delete dat.merAddress;
        delete dat.idDat;
        delete dat.orgDat;
        delete dat.licDat;
        delete dat.certDat;
        delete dat.lawDat;
        console.log('dat内容为', dat);
        nextClick(dat);
      }
    });
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      queryAgentList(Object.assign({}, dat, { currentPage: 1 }));
    },
  };
  const handQueryAgentList = () => {
    queryAgentList(Object.assign({}, { currentPage: 1 }, { isFirst: true }));
  }
  const infoModalProps = {
    width: 848,
    footer: null,
    title: bizMap.memQueryList,
    visible: agentModalVisible,
    onCancel: () => {
      onCancelAgentModel();
    },
  };
  const tableProps = {
    tableCurrentPage: agentData.tableCurrentPage,
    tableList: agentData.tableList,
    tableTotal: agentData.tableTotal,
    tableLoading: agentData.tableLoading,
    tablePageChange(next) {
      const param = agentData.tableParam;
      param.currentPage = next;
      queryAgentList(param);
    },
    rowClickCallback(data) {
      form.setFieldsValue({ agtId: data.agtId });
      onCancelAgentModel();
    },
  };
  const apIdValid = (rule, value, callback) => {
    if (value) {
      if (getFieldsValue().idType === '01') {
        apIDValid(rule, value, callback);
      } else {
        callback();
      }
    } else {
      callback(vaildMap.vaildApId);
      return;
    }
    callback();
  }
  const bizSaleOnSelect = (value, option) => {
    setFieldsValue({ bizSaleName: option.props.children })
  }
  const idDatArr = [];
  if (data.idEffDat && data.idExpDat) {
    idDatArr.push(moment(data.idEffDat, dateFormat));
    idDatArr.push(moment(data.idExpDat, dateFormat));
  }
  const licDatArr = [];
  if (data.licEffDat && data.licExpDat) {
    licDatArr.push(moment(data.licEffDat, dateFormat));
    licDatArr.push(moment(data.licExpDat, dateFormat));
  }
  const orgDatArr = [];
  if (data.orgEffDat && data.orgExpDat) {
    orgDatArr.push(moment(data.orgEffDat, dateFormat));
    orgDatArr.push(moment(data.orgExpDat, dateFormat));
  }
  const lawDatArr = [];
  if (data.lawEffDat && data.lawExpDat) {
    lawDatArr.push(moment(data.lawEffDat, dateFormat));
    lawDatArr.push(moment(data.lawExpDat, dateFormat));
  }
  const prefixSelector = getFieldDecorator('phoneAreaCode', {
    initialValue: '86',
  })(
    <Select style={{ width: 120 }} showSearch filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
      {AREACODE.map(d => <Option key={d.area_code} title={d.area_code}>{d.value}</Option>)}
    </Select> 
    );
  return (
    <Form layout="horizontal" style={style} onSubmit={handleSubmit}>
      <Row style={{ display: 'none' }}>
        <Col span={24}>
          <FormItem label={bizMap.merId} {...formItemLayout}>
            {
              getFieldDecorator('merId', {
                initialValue: data.merId,
              })(
                <Input placeholder={bizMap.merId} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.merName} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('merName', {
                initialValue: data.merName,
                rules: [{ required: true, message: vaildMap.vaildMerName }],
              })(
                <Input placeholder={bizMap.merName} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.merSname} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merSname', {
                initialValue: data.merSname,
                rules: [{ required: true, message: vaildMap.vaildMerSname },
                  { validator: merSnameValid }],
              })(
                <Input placeholder={bizMap.merSname} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row style={{ display: 'none' }}>
        <Col span={12}>
          <FormItem label={bizMap.agtId} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('agtId', {
                initialValue: data.agtId,
                rules: [{ required: false }],
              })(
                <Input placeholder={bizMap.agtId} onClick={handQueryAgentList} readOnly="true" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      {agentModalVisible
        ? <Row>
          <Modal {...infoModalProps}>
            <AgentQueryForm {...queryFormProps} />
            <AgentCallBackPageTable {...tableProps} />
          </Modal>
        </Row>
        : null
      }
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.bizScope} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('bizScope', {
                initialValue: data.bizScope,
                rules: [{ required: true, message: vaildMap.vaildBizScope }],
              })(
                <Input placeholder={bizMap.bizScope} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.merPhone} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merPhone', {
                initialValue: data.merPhone,
                rules: [{ validator: phoneValid }],
              })(
                <Input placeholder={bizMap.merPhone} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.merMobile} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merMobile', {
                initialValue: data.merMobile,
                rules: [{ required: true, message: vaildMap.vaildMobile }, { validator: mobileValid }],
              })(
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder={bizMap.merMobile} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.merFax} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merFax', {
                initialValue: data.merFax,
                rules: [{ validator: faxValid }],
              })(
                <Input placeholder={bizMap.merFax} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.merEmail} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merEmail', {
                initialValue: data.merEmail,
                rules: [{ required: true, message: vaildMap.vaildEmail },
                { validator: emailValid }],
              })(
                <Input placeholder={bizMap.merEmail} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.merAddress} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merAddress', {
                initialValue: data.merArea ? data.merArea.split(',') : null,
                rules: [{ required: true, type: 'array', message: vaildMap.vaildAddress }],
              })(
                <Cascader
                  placeholder={bizMap.merAddress}
                  options={CITYDATAS}
                />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.merPost} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merPost', {
                initialValue: data.merPost,
                rules: [{ validator: postValid }],
              })(
                <Input placeholder={bizMap.merPost} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem label={bizMap.merAddr} {...formItemLayout2} hasFeedback>
            {
              getFieldDecorator('merAddr', {
                initialValue: data.merAddr,
                rules: [{ required: true, message: vaildMap.vaildAddr }, { validator: limitNameSpaceValid }],
              })(
                <Input placeholder={bizMap.merAddr} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.contName} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('contName', {
                initialValue: data.contName,
                rules: [{ validator: limitNameSpaceValid }],
              })(
                <Input placeholder={bizMap.contName} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.contMobile} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('contMobile', {
                initialValue: data.contMobile,
                rules: [{ validator: mobileValid }],
              })(
                <Input placeholder={bizMap.contMobile} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split1" className="split">&nbsp;</h4>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.merAp} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('merAp', {
                initialValue: data.merAp,
                rules: [{ required: true, message: vaildMap.vaildApName }, { validator: userRealNameValidate }],
              })(
                <Input placeholder={bizMap.merAp} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.idType} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('idType', {
                initialValue: data.idType,
                rules: [{ required: true, message: vaildMap.vaildIdType }],
              })(
                <Select>
                  <Option value="">&nbsp;</Option>
                  <Option value="01">{bizMap['idType-01']}</Option>
                  <Option value="02">{bizMap['idType-02']}</Option>
                  <Option value="03">{bizMap['idType-03']}</Option>
                  <Option value="04">{bizMap['idType-99']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.apId} {...formItemLayout} hasFeedback required>
            {
              getFieldDecorator('apId', {
                initialValue: data.apId,
                rules: [
                  { validator: apIdValid },
                ],
              })(
                <Input placeholder={bizMap.apId} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.idValidDat} {...formItemLayout} >
            {
              getFieldDecorator('idDat', {
                initialValue: idDatArr,
                rules: [{ required: true, message: vaildMap.vaildIdDat }],
              })(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split2" className="split">&nbsp;</h4>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.merType} {...formItemLayout} >
            {
              getFieldDecorator('merType', {
                initialValue: data.merType,
                rules: [{ required: true, message: vaildMap.vaildMerType }],
              })(
                <Select>
                  <Option value="">&nbsp;</Option>
                  <Option value="0">{bizMap['merType-0']}</Option>
                  <Option value="1">{bizMap['merType-1']}</Option>
                  <Option value="2">{bizMap['merType-2']}</Option>
                  <Option value="3">{bizMap['merType-3']}</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.regFund} {...formItemLayout} hasFeedback>
            {
              getFieldDecorator('regFund', {
                initialValue: data.regFund,
              })(
                <InputNumber min={1} max={9999999999999} step={0.01} maxLength="13" placeholder="" style={{ width: 260 }} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {
            getFieldsValue().merType === '0' || getFieldsValue().merType === '1' ?
              <FormItem label={bizMap.bizLic} {...formItemLayout} >
                {
                  getFieldDecorator('bizLic', {
                    initialValue: data.bizLic,
                    rules: [{ required: true, message: vaildMap.vaildCode },
                    { validator: codeValid }],
                  })(
                    <Input placeholder={bizMap.bizLic} />,
                  )
                }
              </FormItem>
              :
              null
          }
          {
            getFieldsValue().merType === '2' ?
              <FormItem label={bizMap.instCert} {...formItemLayout} >
                {
                  getFieldDecorator('instCert', {
                    initialValue: data.instCert,
                    rules: [{ required: true, message: vaildMap.vaildInstCert }],
                  })(
                    <Input placeholder={bizMap.instCert} />,
                  )
                }
              </FormItem>
              :
              null
          }
          {
            getFieldsValue().merType === '3' ?
              <FormItem label={bizMap.lawCert} {...formItemLayout} >
                {
                  getFieldDecorator('lawCert', {
                    initialValue: data.lawCert,
                    rules: [{ required: true, message: vaildMap.vaildLawCert }],
                  })(
                    <Input placeholder={bizMap.lawCert} />,
                  )
                }
              </FormItem>
              :
              null
          }
        </Col>
        <Col span={12}>
          {
            getFieldsValue().merType === '0' || getFieldsValue().merType === '1' ?
              <FormItem label={bizMap.licValidDat} {...formItemLayout} >
                {
                  getFieldDecorator('licDat', {
                    initialValue: licDatArr,
                    rules: [{ required: true, message: vaildMap.vaildLicDat }],
                  })(
                    <RangePicker format={dateFormat} />,
                  )
                }
              </FormItem>
              :
              null
          }
          {
            getFieldsValue().merType === '2' ?
              <FormItem label={bizMap.instCert} {...formItemLayout} >
                {
                  getFieldDecorator('certDat', {
                    rules: [{ required: true, message: vaildMap.vaildCertDat }],
                  })(
                    <RangePicker format={dateFormat} />,
                  )
                }
              </FormItem>
              :
              null
          }
          {
            getFieldsValue().merType === '3' ?
              <FormItem label={bizMap.lawCert} {...formItemLayout} >
                {
                  getFieldDecorator('lawDat', {
                    initialValue: lawDatArr,
                    rules: [{ required: true, message: vaildMap.vaildLawDat }],
                  })(
                    <RangePicker format={dateFormat} />,
                  )
                }
              </FormItem>
              :
              null
          }
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.orgCod} {...formItemLayout} >
            {
              getFieldDecorator('orgCod', {
                initialValue: data.orgCod,
                rules: [{ required: true, message: vaildMap.vaildOrdCod }, { validator: codeValid }],
              })(
                <Input placeholder={bizMap.orgCod} />,
              )
            }
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem label={bizMap.orgValidDat} {...formItemLayout} >
            {
              getFieldDecorator('orgDat', {
                initialValue: orgDatArr,
                rules: [{ required: true, message: vaildMap.vaildOrgDat }],
              })(
                <RangePicker format={dateFormat} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem label={bizMap.taxNo} {...formItemLayout} >
            {
              getFieldDecorator('taxNo', {
                initialValue: data.taxNo,
                rules: [{ required: true, message: vaildMap.vaildTaxNo }, { validator: codeValid }],
              })(
                <Input placeholder={bizMap.taxNo} />,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <h4 key="btn-split3" className="split">&nbsp;</h4>

      <Row>
        <Col span={12}>
          <FormItem label={bizMap.bizSale} {...formItemLayout} >
            {
              getFieldDecorator('bizSale', {
                initialValue: data.bizSale,
              })(
                <Select onSelect={(value, option) => bizSaleOnSelect(value, option)}>
                  <Option value="">&nbsp;</Option>
                  {
                    bizSaleList.map((bizsaleOption, idx) => {
                      return <Option key={idx} value={bizsaleOption.usrId}>{bizsaleOption.usrName}</Option>;
                    })
                  }
                </Select>,
              )
            }
          </FormItem>
        </Col>
      </Row>
      <div hidden >
        {
          getFieldDecorator('bizSaleName')(<Input />)
        }
      </div>
      < h4 key="btn-split" className="split" >&nbsp;</h4 >
      <Row key="btn-row">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submiting}>{commonMap.nextStep}</Button>
        </Col>
      </Row>
    </Form >
  );
}

MerchantStepForm1.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
  submiting: PropTypes.bool,
  nextClick: PropTypes.func,
  agentData: PropTypes.object,
  agentModalVisible: PropTypes.bool,
  queryAgentList: PropTypes.func,
  onCancelAgentModel: PropTypes.func,
  bizSaleList: PropTypes.array,
};

MerchantStepForm1.defaultProps = {
  style: {},
  data: {},
  submiting: false,
  nextClick: noop,
  agentData: {},
  agentModalVisible: false,
  queryAgentList: noop,
  onCancelAgentModel: noop,
  bizSaleList: [],
}

export default Form.create()(MerchantStepForm1);
