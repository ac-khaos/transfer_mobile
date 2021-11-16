import React, {
  useState,
  useEffect,
  useMemo,
  ReactElement,
  useRef,
  RefObject,
} from "react";
import { Tabs, Input, Toast } from "antd-mobile";
import {
  PhonebookOutline,
  ExclamationTriangleOutline,
} from "antd-mobile-icons";

import RechargeDialog, { ChargeInfo } from "../../components/RechargeDialog";
import sections, { RechargeSection, Grade } from "./sections";
import { SectionType } from "../../enums";
import "./index.less";

export default (props) => {
  const [activeKey, setActiveKey] = useState<string>("cmcc");
  const [rechargeSections, setRechargeSections] = useState<
    Array<RechargeSection>
  >(sections["cmcc"]);
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const dialogRef: RefObject = useRef();

  function onTabChange(tabKey: string): void {
    setActiveKey(tabKey);
    setRechargeSections(sections[tabKey]);
  }

  function onRecharge(sectionType: SectionType, grade: Grade): void {
    if (/^1[^012]\d{9}$/.test(mobileNumber)) {
      dialogRef.current.show({
        mobileNumber: mobileNumber,
        operator: activeKey,
        sectionType,
        grade,
      });
    } else if (!mobileNumber) {
      Toast.show({
        icon: <ExclamationTriangleOutline />,
        content: "请输入手机号!",
        duration: 1500,
      });
    } else {
      Toast.show({
        icon: <ExclamationTriangleOutline />,
        content: "请输入正确的手机号!",
        duration: 1500,
      });
    }
  }

  return (
    <div className="prepay">
      <Tabs activeKey={activeKey} onChange={onTabChange}>
        <Tabs.TabPane title="移动" key="cmcc" />
        <Tabs.TabPane title="联通" key="unicom" />
        <Tabs.TabPane title="电信" key="telecom" />
      </Tabs>
      <div className="prepay_content">
        <div className="prepay_content_input">
          <PhonebookOutline className="prepay_content_input_icon" />
          <Input
            type="tel"
            value={mobileNumber}
            onChange={(value) => {
              /^\d*$/.test(value) && setMobileNumber(value);
            }}
            onClear={() => setMobileNumber("")}
            placeholder="请输入手机号"
            clearable
          />
        </div>
        <div className="prepay_content_options">
          {rechargeSections.map((section: RechargeSection) => (
            <div className="prepay_option" key={section.key}>
              <div className="prepay_option_head">
                <div className="prepay_option_head_title">{section.title}</div>
                <div className="prepay_option_head_describe">
                  {section.describe}
                </div>
              </div>
              <div className="prepay_option_grades">
                {(section.grades || []).map((grade: Grade) => (
                  <div
                    className="prepay_grade"
                    key={`${section.key}_${grade.key}`}
                    onClick={() => onRecharge(section.type, grade)}
                  >
                    <div className="prepay_grade_price">{grade.bidPrice}</div>
                    <div className="prepay_grade_realprice">
                      <span>售价</span>
                      <span>{grade.price}</span>
                      <span>元</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <RechargeDialog ref={dialogRef} />
    </div>
  );
};
