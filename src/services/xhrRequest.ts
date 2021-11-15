import _ from "../libraries/lodash";

import { queryString } from "../libraries/common";
import * as enums from "../enums";
import host from "./host";

export interface RequestConfig {
  // 请求的URL
  url?: string;
  // `baseURL` 将自动加在 `url` 前面
  baseURL?: string;
  // 请求的方法
  method?: enums.RequestMethod;
  // 请求的url参数
  params?: RequestParams;
  // 请求的主体参数
  data?: RequestData;
  // 超时时间(ms)
  timeout?: number;
  // 请求头
  headers?: { [headerName: string]: string | number | boolean };
  // 请求重试次数
  retryCount?: number;
  // 跨域请求是否带有授权信息(cookie | header)
  withCredentials?: boolean;
  // 验证
  auth?: {
    username: string;
    password: string | number;
  };
  responseType?: enums.ResponseType;
}

type DataType = string | number | boolean | RequestData;

export interface RequestData {
  [dataName: string]: DataType | Array<DataType>;
}

export interface RequestParams {
  [paramName: string]: string | number;
}

// dispath xhr request
function xhrRequest(config: RequestConfig) {
  const baseConfig: RequestConfig = xhrRequest.interceptor(config);

  if (config === undefined) {
    return console.error("xhrRequest config is undefined!!!");
  }
  if (Object.prototype.toString.call(config) !== "[object Object]") {
    return console.error("xhrRequest config must be an object!!!");
  }

  return new Promise((resolve, reject) => {
    xhrRequest.dispathcRequest(
      baseConfig,
      { resolve, reject },
      baseConfig.retryCount
    );
  });
}

// 拦截器
xhrRequest.interceptor = (config: RequestConfig): RequestConfig => {
  const defaultConfig: RequestConfig = {
    method: enums.RequestMethod.GET,
    params: {},
    timeout: 3000,
    retryCount: 3,
    withCredentials: true,
    responseType: enums.ResponseType.JSON,
  };

  const baseConfig: RequestConfig = Object.assign(defaultConfig, config);
  baseConfig.baseURL = host[_APP_ENV];
  baseConfig.headers = Object.assign(
    {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    config.headers
  );
  const searchs = queryString(baseConfig.params, true);
  searchs && (baseConfig.url += "?" + searchs);

  return baseConfig;
};

// xhr dispath request
xhrRequest.dispathcRequest = (config: RequestConfig, dispather, retryCount) => {
  let fullUrl = config.url;
  if (!/^https?\/\//.test(config.url) && config.baseURL) {
    fullUrl = config.baseURL + config.url;
  }
  console.log("fullUrl:", fullUrl);
  const xhr: XMLHttpRequest = new XMLHttpRequest();

  xhr.open(
    config.method,
    fullUrl,
    true,
    config.auth?.username,
    config.auth?.password
  );
  for (const headerName in config.headers || {}) {
    xhr.setRequestHeader(headerName, config.headers[headerName]);
  }
  xhr.timeout = config.timeout;
  xhr.responseType = config.responseType;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status >= 200 && xhr.status < 400) {
        dispather.resolve(xhr.response);
      } else if (xhr.status > 0) {
        dispather.reject(xhr.response);
      }
    }
  };
  xhr.onerror = () => {
    dispather.reject("XMLHttpRequest error!!!");
  };
  xhr.ontimeout = () => {
    if (retryCount > 1) {
      xhrRequest.dispathcRequest(config, dispather, retryCount - 1);
    } else {
      dispather.reject("XMLHttpRequest timeout!!!");
    }
  };
  xhr.send(JSON.stringify(config.data));
};

xhrRequest.post = (
  url: string,
  data: RequestData = {},
  config: RequestConfig = {}
) => {
  return xhrRequest({ ...config, url, data, method: enums.RequestMethod.POST });
};

xhrRequest.get = (
  url: string,
  params: RequestData = {},
  config: RequestConfig = {}
) => {
  return xhrRequest({
    ...config,
    url,
    params,
    method: enums.RequestMethod.GET,
  });
};

export default xhrRequest;
