import { GUARDIAN_BASE_URL, GUARDIAN_API_KEY } from '@/constants';
import { request } from '@/services/axios';

export const getGuardianArticles = (params = {}) =>
  request.get({
    url: `${GUARDIAN_BASE_URL}/search?api-key=${GUARDIAN_API_KEY}`,
    params: {
      ...params,
    },
  });
