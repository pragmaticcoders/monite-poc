import { MONITE_API_URL } from 'utils/constants';
import { api } from 'utils/http';
import { appStore } from 'store/app.store';

export default class CounterPartsService {
  static getCounterParts() {
    return api(`${MONITE_API_URL}/v1/counterparts`, {
      entityId: appStore.entityId,
    });
  }

  static addCounterPart(name: string, email: string) {
    return api(`${MONITE_API_URL}/v1/counterparts`, {
      method: 'POST',
      entityId: appStore.entityId,
      body: {
        type: 'organization',
        organization: {
          legal_name: name,
          is_vendor: false,
          is_customer: true,
          phone: 1234567890,
          email,
          registered_address: {
            country: 'DE',
            city: 'Berlin',
            postal_code: '10115',
            state: '',
            line1: 'Flughafenstrasse 52',
            line2: '',
          },
        },
      },
    });
  }

  static addCounterPartTax(counterPartId: string, type: string, value: string) {
    return api(`${MONITE_API_URL}/v1/counterparts/${counterPartId}/tax_ids`, {
      method: 'POST',
      entityId: appStore.entityId,
      body: {
        type,
        value,
      },
    });
  }

  static addCounterPartAddress(counterPartId: string, address: object) {
    return api(`${MONITE_API_URL}/v1/counterparts/${counterPartId}/addresses`, {
      method: 'POST',
      entityId: appStore.entityId,
      body: {
        ...address,
      },
    });
  }
}
