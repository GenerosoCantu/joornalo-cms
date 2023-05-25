import tenantService from 'src/services/tenantService';
import { setError, clearError } from 'src/store/actions/errorActions';

export const GET_TENANT = '@tenant/get-tenant';

export function getTenant(tenantId) {
  return async (dispatch) => {
    try {
      console.log(tenantId);
      const tenant = await tenantService.getTenant(tenantId);
      dispatch({
        type: GET_TENANT,
        payload: {
          tenant
        }
      });
      dispatch(clearError());
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  };
}
