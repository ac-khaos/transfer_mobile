import { ReactNode } from "react";
import {
  DashboardOutlined,
  BranchesOutlined,
  FilterOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import home from "./views/home";
import prepay from "./views/prepay";

export const ROUTERPREFIX = "/transfer-mobile";

// 路由key枚举
export enum RouterKeys {
  home = "home",
  prepay = "prepay",
}

// 路由path枚举
export enum RouterPaths {
  home = `${ROUTERPREFIX}/`,
  prepay = `${ROUTERPREFIX}/prepaid`,
}

// 路由项接口
export interface RouterIF {
  key: RouterKeys;
  title?: string;
  path: RouterPaths;
  exact: boolean;
  component: ReactNode;
}

// 菜单项接口
export interface MenuItemIF {
  key: string;
  name: string;
  icon?: ReactNode;
  path?: string;
  subItems?: Array<MenuItemIF>;
}

export const layoutRouters: Array<RouterIF> = [
  {
    key: RouterKeys.prepay,
    path: RouterPaths.prepay,
    exact: true,
    component: prepay,
  },
  {
    key: RouterKeys.home,
    path: RouterPaths.home,
    exact: false,
    component: home,
  },
];

export const menus: Array<MenuItemIF> = [];
