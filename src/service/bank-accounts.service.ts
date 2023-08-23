import { api } from "utils/http";
import { MONITE_API_URL } from "utils/constants";
import { appStore } from "store/app.store";

export default class BankAccountsService {
  static getBankAccounts = () => {
    return api(`${MONITE_API_URL}/v1/bank_accounts`, {
      entityId: appStore.entityId,
    });
  };
}