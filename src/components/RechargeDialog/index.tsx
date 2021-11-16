import React, {
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
  ReactNode,
} from "react";
import { Dialog, NoticeBar, List, Button } from "antd-mobile";

import { SectionType } from "../../enums";
import { Grade } from "../../views/prepay/sections";
import "./index.less";

export interface ChargeInfo {
  mobileNumber: string;
  operator: string;
  sectionType: SectionType;
  grade: Grade;
}

export default forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({ show }));

  const [visible, setVisible] = useState<boolean>(false);
  const [chargeInfo, setChargeInfo] = useState<ChargeInfo | {}>({});

  function show(chargeInfo: ChargeInfo): void {
    setChargeInfo(chargeInfo);
    setVisible(true);
  }

  const rechargeDescribes: Array<string> = useMemo(() => {
    return [
      "话费慢充1-72小时到账，快充1-30分钟到账",
      "请认证核对充值号码，充错号码将无法退回或转存",
      "本充值服务为代办业务，最终由运营商为终端用户提供发票 (话费使用完后在运营商APP申请发票)",
    ];
  }, []);

  const dialogContent: ReactNode = useMemo(() => {
    return (
      <div className="recharge_box">
        <div className="recharge_cancel" onClick={() => setVisible(false)}>
          关闭
        </div>
        <div className="recharge_title">确认充值信息</div>
        <NoticeBar
          content="温馨提示：请仔细核对号码，充错号码无法退回~"
          color="alert"
          icon={null}
        />
        <div className="recharge_number">
          <span>{chargeInfo.mobileNumber?.substr(0, 3)}</span>
          <span>{chargeInfo.mobileNumber?.substr(3, 4)}</span>
          <span>{chargeInfo.mobileNumber?.substr(7, 11)}</span>
        </div>
        <List mode="card">
          <List.Item
            extra={`${
              chargeInfo.sectionType === SectionType.slow
                ? "全国慢充"
                : "话费快充"
            } ${chargeInfo.grade?.bidPrice}元`}
          >
            充值产品：
          </List.Item>
          <List.Item extra={`${chargeInfo.grade?.price}元`}>
            付款金额：
          </List.Item>
        </List>
        {chargeInfo.sectionType === SectionType.slow && (
          <div className="recharge_tip">慢充72小时内分多笔到账</div>
        )}
        <div className="recharge_describe">
          {rechargeDescribes.map((des: string, idx: number) => (
            <div className="recharge_describe_row" key={idx}>
              {idx + 1}. {des}
            </div>
          ))}
        </div>
        <div className="recharge_submit">
          <Button color="primary">确认支付</Button>
        </div>
      </div>
    );
  }, [chargeInfo]);

  return (
    <div className="recharge_dialog">
      <Dialog
        visible={visible}
        bodyClassName="recharge_dialog_body"
        content={dialogContent}
      />
    </div>
  );
});
