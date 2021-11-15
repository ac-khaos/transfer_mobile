import React, { useState, useEffect, useMemo, ReactElement } from "react";
import { Tabs, Input } from "antd-mobile";

export default (props) => {
  return (
    <div className="prepay">
      <Tabs>
        <Tabs.TabPane title="移动" key="fruits">
          <Input placeholder="请输入手机号" clearable />
        </Tabs.TabPane>
        <Tabs.TabPane title="联通" key="vegetables">
          <Input placeholder="请输入手机号" clearable />
        </Tabs.TabPane>
        <Tabs.TabPane title="电信" key="animals">
          <Input placeholder="请输入手机号" clearable />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
