import { api } from "utils/http";
import { MONITE_API_URL } from "utils/constants";
import { appStore } from "store/app.store";

export default class UsersService {
  static getEntityUsers() {
    return api(`${MONITE_API_URL}/v1/entity_users`, {
      entityId: appStore.entityId,
    });
  }
}