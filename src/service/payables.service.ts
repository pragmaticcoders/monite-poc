import { MONITE_API_URL } from "utils/constants";
import { api } from "utils/http";
import { appStore } from "store/app.store";

export default class PayablesService {
  static getPayables = () => {
    return api(`${MONITE_API_URL}/v1/payables`, {
      entityId: appStore.entityId,
    });
  };
}