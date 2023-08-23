import { api } from "utils/http";
import { MONITE_API_URL } from "utils/constants";
import { appStore } from "store/app.store";

export default class InvoicesService {
  static getInvoices = () => {
    return api(`${MONITE_API_URL}/v1/receivables`, {
      entityId: appStore.entityId,
    });
  }
}