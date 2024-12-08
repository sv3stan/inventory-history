import { RequestBody } from '../types/interfaces';
export const validateRequest = (reqBody: RequestBody) => {
  const { plu, shop_id, quantity_on_shelf, quantity_in_order } = reqBody;
  if (
    !plu ||
    !shop_id ||
    typeof quantity_on_shelf !== 'number' ||
    typeof quantity_in_order !== 'number'
  ) {
    return { isValid: false, message: 'All fields are required' };
  }

  if (isNaN(Number(quantity_on_shelf)) || isNaN(Number(quantity_in_order))) {
    return { isValid: false, message: 'Quantities must be valid numbers' };
  }

  return { isValid: true };
};
