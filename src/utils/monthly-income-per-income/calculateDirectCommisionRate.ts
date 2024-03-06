import { commission } from "../../configs/commission";
import { ProductType } from "../../types/orders";

export const calculateDirectCommissionRate = (productType: ProductType) => {
  return {
    rate: commission[productType].direct,
  };
};
