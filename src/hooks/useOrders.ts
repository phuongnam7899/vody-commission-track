import { useState } from "react";
import { fetchCSVData } from "../utils/fetchCSV";
import { sheetsLinks } from "../configs/sheetLinks";
import dayjs from "dayjs";
import { Order, ProductType } from "../types/orders";

const productTypeMap: { [key: string]: string } = {
  "Thẻ VIP": "vip",
  NFT: "nft",
  "Hũ Vody": "investVD",
};
export const productTypeMapRevert: { [key: string]: string } = {
  vip: "Thẻ VIP",
  nft: "NFT",
  investVD: "Hũ Vody",
};

export const useOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const fetchedOrders = await fetchCSVData(sheetsLinks.orders);

    setOrders(
      fetchedOrders.map((order: any): Order => {
        return {
          createdAt: dayjs(new Date(order["Thời gian mua"])),
          id: order["ID"],
          username: order["Người mua"],
          productType: productTypeMap[order["Loại sản phẩm"]] as ProductType, // Added type assertion
          value: parseInt(order["Giá trị"], 10),
        };
      })
    );
  };
  return { orders, fetchOrders };
};
