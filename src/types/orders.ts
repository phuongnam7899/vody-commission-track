import dayjs from "dayjs";

export type ProductType = "vip" | "nft" | "investVD";

export type Order = {
  id: string;
  createdAt: dayjs.Dayjs;
  value: number;
  productType: ProductType;
  username: string;
};
