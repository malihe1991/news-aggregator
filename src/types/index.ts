export type TApiCall = {
  url: string;
  headers?: Record<string, string>;
  body?: any;
  params?: any;
};

type ListType = {
  author: string;
  from: string;
  title: string;
  image: string;
};

export type NewsListType = {
  total: number;
  list: ListType[];
};

export type FilterType = {
  from: string;
  category: string;
  sources: string;
};

export type FeedOptionType = {
  author: string;
  category: string;
  sources: string;
};
