import React, { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Dialog } from "antd-mobile";
import {
  ReceivePaymentOutline,
  HandPayCircleOutline,
  MailOutline,
  MovieOutline,
  UserContactOutline,
  UserSetOutline,
  FileOutline,
} from "antd-mobile-icons";

import Layout from "../../components/Layout";
import "./index.less";

export default () => {
  const history = useHistory();

  const services = useMemo(() => {
    return [
      {
        key: "mobile_service",
        title: "手机业务",
        modules: [
          {
            key: "recharge",
            icon: <ReceivePaymentOutline />,
            name: "话费充值",
            link: "/prepaid",
          },
        ],
      },
      {
        key: "multiple_service",
        title: "综合业务",
        modules: [
          {
            key: "rebate",
            icon: <HandPayCircleOutline />,
            name: "佣金返利",
          },
          {
            key: "complaint",
            icon: <MailOutline />,
            name: "投诉建议",
          },
          {
            key: "course",
            icon: <MovieOutline />,
            name: "店铺教程",
          },
          {
            key: "customerService",
            icon: <UserContactOutline />,
            name: "在线客服",
          },
        ],
      },
      {
        key: "personal_service",
        title: "我的",
        modules: [
          {
            key: "personalCenter",
            icon: <UserSetOutline />,
            name: "个人中心",
          },
          {
            key: "record",
            icon: <FileOutline />,
            name: "充值记录",
          },
        ],
      },
    ];
  }, []);

  // 默认点击事件
  function onModuleClick(module) {
    if (module.link) {
      return history.push(module.link);
    } else {
      Dialog.alert({ content: "此功能暂未开放，敬请期待!" });
    }
  }

  return (
    <Layout>
      <div className="home">
        {services.map((service) => (
          <div className="home_service" key={service.key}>
            <div className="title">{service.title}</div>
            <div className="modules">
              {service.modules.map((module) => (
                <div key={module.key} className="module_col">
                  <div
                    className="module"
                    onClick={module.onClick || (() => onModuleClick(module))}
                  >
                    <div className="module_logo">{module.icon}</div>
                    <div className="module_name">{module.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
