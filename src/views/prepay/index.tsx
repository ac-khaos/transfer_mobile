import React, { useState, useEffect, useMemo, ReactElement } from "react";
import { Tabs, Input } from "antd-mobile";
import { PhonebookOutline } from "antd-mobile-icons";

import sections, { RechargeSection, Grade } from "./sections";
import "./index.less";

export default (props) => {
  const [activeKey, setActiveKey] = useState<string>("cmcc");
  const [rechargeSections, setRechargeSections] = useState<
    Array<RechargeSection>
  >(sections["cmcc"]);
  const [mobileNumber, setMobileNumber] = useState<string>("");

  return (
    <div className="prepay">
      <Tabs activeKey={activeKey}>
        <Tabs.TabPane title="移动" key="cmcc" />
        <Tabs.TabPane title="联通" key="unicom" />
        <Tabs.TabPane title="电信" key="telecom" />
      </Tabs>
      <div className="prepay_content">
        <div className="prepay_content_input">
          <PhonebookOutline className="prepay_content_input_icon" />
          <Input type="tel" placeholder="请输入手机号" clearable />
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
    </div>
  );
};
