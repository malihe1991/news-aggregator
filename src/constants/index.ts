export const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
export const NEWS_API_KEY = 'c848e738768841508371748291d10d9e';

export const GUARDIAN_BASE_URL = 'https://content.guardianapis.com';
export const GUARDIAN_API_KEY = '94e39c03-5339-4b8c-8076-1ea1ff40483b';

export const PAGE_SIZE = 10;

export const FILTER_OPTIONS = {
  from: 'from',
  category: 'category',
  sources: 'sources',
};

export const FEED_OPTIONS = {
  author: 'author',
  category: 'category',
  sources: 'sources',
};

export const NEWS_API_DATA_FORMAT = {
  titleKey: 'title',
  authorKey: 'author',
  fromKey: 'publishedAt',
  imageKey: 'urlToImage',
};

export const GUARDIAN_DATA_FORMAT = {
  titleKey: 'webTitle',
  fromKey: 'webPublicationDate',
  webUrlKey: 'webUrl',
};
