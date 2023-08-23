import { appStore } from "store/app.store";
import { MONITE_API_URL } from "utils/constants";
import { api } from "utils/http";

export default class PaymentService {
  static markInvoiceAsPaid = (invoiceId: string) => {
    return api(`${MONITE_API_URL}/v1/payables/${invoiceId}/mark_as_paid`, {
      method: "POST",
      entityId: appStore.entityId,
      body: {}
    });
  }
}