import React, { PropTypes } from 'react';
import { Form } from 'antd';
import * as i18n from '../../../../../utils/i18n';

const MerchantRoleDetailInfoForm = (props) => {
  const bizMap = i18n.bizMap('mms/merchant');
  const { data } = props;
  return (
    <table className="detail_table">
      <tbody>
        <tr>
          <td>{bizMap.roleName}:</td>
          <td>{data.roleName}</td>
          <td>{bizMap.roleDesc}:</td>
          <td>{data.roleDesc}</td>
        </tr>
        <tr>
          <td>{bizMap.creObj}:</td>
          <td>{data.creObj}</td>
          <td>{bizMap.creTim}:</td>
          <td>{data.creTim}</td>
        </tr>
        <tr>
          <td>{bizMap.updObj}:</td>
          <td>{data.updObj}</td>
          <td>{bizMap.updTim}:</td>
          <td>{data.updTim}</td>
        </tr>
      </tbody>
    </table>
  );
}

MerchantRoleDetailInfoForm.propTypes = {
  data: PropTypes.object,
};

MerchantRoleDetailInfoForm.defaultProps = {
  data: {},
  submiting: false,
}

export default Form.create()(MerchantRoleDetailInfoForm);
