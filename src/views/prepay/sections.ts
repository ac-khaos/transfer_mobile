export interface RechargeSection {
  key: string;
  title: string;
  describe?: string;
  grades?: Array<Grade>;
}

export interface Grade {
  key: string;
  bidPrice: number;
  price: number;
}

export default {
  // 移动
  cmcc: [
    {
      key: "cmcc_fast",
      title: "话费慢充",
      describe: "1-72小时到账 请耐心等待",
      grades: [
        {
          key: "100",
          bidPrice: 100,
          price: 100,
        },
        {
          key: "200",
          bidPrice: 200,
          price: 200,
        },
      ],
    },
    {
      key: "cmcc_slow",
      title: "话费快充",
      describe: "1-30分钟到账",
      grades: [
        {
          key: "100",
          bidPrice: 100,
          price: 100,
        },
        {
          key: "200",
          bidPrice: 200,
          price: 200,
        },
        {
          key: "300",
          bidPrice: 300,
          price: 300,
        },
        {
          key: "500",
          bidPrice: 500,
          price: 500,
        },
      ],
    },
  ],
  // 联通
  unicom: [
    {
      key: "unicom_fast",
      title: "话费慢充",
      describe: "1-72小时到账 请耐心等待",
      grades: [
        {
          key: "100",
          bidPrice: 100,
          price: 100,
        },
        {
          key: "200",
          bidPrice: 200,
          price: 200,
        },
      ],
    },
    {
      key: "unicom_slow",
      title: "话费快充",
      describe: "1-30分钟到账",
      grades: [
        {
          key: "100",
          bidPrice: 100,
          price: 100,
        },
        {
          key: "200",
          bidPrice: 200,
          price: 200,
        },
        {
          key: "300",
          bidPrice: 300,
          price: 300,
        },
        {
          key: "500",
          bidPrice: 500,
          price: 500,
        },
      ],
    },
  ],
  // 电信
  telecom: [
    {
      key: "telecom_fast",
      title: "话费慢充",
      describe: "1-72小时到账 请耐心等待",
      grades: [
        {
          key: "30",
          bidPrice: 30,
          price: 30,
        },
        {
          key: "50",
          bidPrice: 50,
          price: 50,
        },
        {
          key: "100",
          bidPrice: 100,
          price: 100,
        },
        {
          key: "200",
          bidPrice: 200,
          price: 200,
        },
        {
          key: "300",
          bidPrice: 300,
          price: 300,
        },
        {
          key: "500",
          bidPrice: 500,
          price: 500,
        },
      ],
    },
    {
      key: "telecom_slow",
      title: "话费快充",
      describe: "1-30分钟到账",
      grades: [
        {
          key: "100",
          bidPrice: 100,
          price: 100,
        },
        {
          key: "200",
          bidPrice: 200,
          price: 200,
        },
        {
          key: "300",
          bidPrice: 300,
          price: 300,
        },
        {
          key: "500",
          bidPrice: 500,
          price: 500,
        },
      ],
    },
  ],
};
