import { NEWS_API_BASE_URL, NEWS_API_KEY } from '@/constants';
import { request } from '@/services/axios';

export const getNewsApiArticles = (params = {}) =>
  request.get({
    url: `${NEWS_API_BASE_URL}/everything?apiKey=${NEWS_API_KEY}`,
    params: {
      ...params,
    },
  });
