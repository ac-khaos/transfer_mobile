import Paragraph from "antd/lib/skeleton/Paragraph";

export function isWxenv(): boolean {
  const ua: string = navigator.userAgent.toLowerCase();
  return /MicroMessenger/gi.test(ua);
}

type baseType = string | number | boolean;

// url参数拼接
export interface QueryParams {
  [paramName: string]: baseType;
}
export function queryString(params: QueryParams, encode: boolean): string {
  let str = "";
  for (const name in params) {
    str += `${str && "&"}${name}=${
      encode ? encodeURIComponent(params[name]) : params[name]
    }`;
  }
  return str;
}

// 获取url参数
export function getUrlParam(paramName: string): baseType {
  let paramValue: baseType = "";
  const searchStr = location.search;

  const paramMatch: any = searchStr.match(eval(`/${paramName}=[^&]*/`));
  if (paramMatch) {
    const arr: Array<baseType> = paramMatch[0].split("=");
    paramValue = arr[1];
  }
  return paramValue;
}
