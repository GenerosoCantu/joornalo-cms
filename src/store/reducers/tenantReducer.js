/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import {
  GET_TENANT
} from 'src/store/actions/tenantActions';

const initialState = {
  tenant: null,
  other: null
};

const tenantReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_TENANT: {
      const { tenant } = action.payload;
      sessionStorage.setItem("tenantUrls", JSON.stringify(tenant.urls));
      return produce(state, (draft) => {
        draft.tenant = tenant;
      });
    }

    default: {
      return state;
    }
  }
};

export default tenantReducer;
