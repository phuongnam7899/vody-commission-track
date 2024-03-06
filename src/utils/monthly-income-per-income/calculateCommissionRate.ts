import { commission } from "../../configs/commission";
import { ProductType } from "../../types/orders";

export const calculateCommissionRate = (
  productType: ProductType,
  star: number,
  additionalStar: number
) => {
  return {
    rate: commission[productType].forUpper[
      Math.min(star - 1 + additionalStar, 2)
    ],
    starLeft: 3 - star,
  };
};
