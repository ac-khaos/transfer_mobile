import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dialog } from "antd-mobile";

import { layoutRouters } from "../routers";
import {
  isWxenv,
  QueryParams,
  queryString,
  getUrlParam,
} from "../libraries/common";
import pkgConfig from "../../package.json";
import xhrRequest from "../services/xhrRequest";

import "./index.less";

const LayoutRoot = () => {
  useEffect(() => {
    wxLogin();
  }, []);

  function wxLogin(): void {
    const wxcode = getUrlParam("code");
    if (wxcode) {
      xhrRequest
        .post("/h5/wx/user/login", { authSourceTypeCode: 0, code: wxcode })
        .then((res) => {
          console.log("login-----------", res);
        });
    } else {
      const wxLoginParams: QueryParams = {
        appid: pkgConfig.wxConfig?.appId,
        redirect_uri: location.href,
        response_type: "code",
        scope: "snsapi_base",
      };
      const wxLoginLink: string = `https://open.weixin.qq.com/connect/oauth2/authorize?${queryString(
        wxLoginParams,
        true
      )}#wechat_redirect`;

      location.href = wxLoginLink;
    }
  }

  return (
    <Router>
      <Switch>
        {layoutRouters.map((rt) => (
          <Route
            key={rt.key}
            exact={rt.exact}
            path={rt.path}
            component={rt.component}
          />
        ))}
      </Switch>
    </Router>
  );
};

if (isWxenv()) {
  ReactDOM.render(<LayoutRoot />, document.querySelector("#layout_root"));
} else {
  Dialog.show({
    content: "不支持在非微信环境下打开!",
    actions: [],
  });
}
