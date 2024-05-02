import {
  ChangeEvent,
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import { getArticles } from '@/api/news-api';
import DefaultLayout from '@/components/layout';
import FilterNews from '@/components/pages/home/filter-news';
import NewsList from '@/components/pages/home/news-list';
import SearchNews from '@/components/pages/home/search-news';
import { NEWS_API_DATA_FORMAT } from '@/constants';
import { useAppSelector } from '@/store/hook';
import { FilterType, NewsListType } from '@/types';

const initialNewsList = {
  total: 0,
  list: [],
};

const Home = () => {
  const { newsAPI } = useAppSelector((state) => ({
    newsAPI: state.feed.newsAPI,
  }));
  const [newsList, setNewsList] = useState<NewsListType>(initialNewsList);
  const [filter, setFilter] = useState<FilterType>({
    from: '',
    category: '',
    sources: '',
  });
  const [searchValue, setSearchValue] = useState('');
  const deferredQuery = useDeferredValue(searchValue);

  const fetchNewsAPI = () => {
    const params = {
      sources: filter.sources || newsAPI?.sources,
      from: filter.from,
      q: deferredQuery,
    };
    return getArticles(params);
  };

  const aggregateNews = () => {
    Promise.allSettled([fetchNewsAPI()]).then((responses) => {
      let total = 0;
      const list = [];
      responses.forEach((response, index) => {
        if (response.status !== 'fulfilled') {
          return;
        }
        switch (index) {
          case 0:
            total += response.value.data.totalResults;
            const formattedList = normalizeResFormat(
              response.value.data.articles,
              NEWS_API_DATA_FORMAT,
            );
            list.push(...formattedList);
            break;
        }
      });
      setNewsList({ total, list });
    });
  };

  const normalizeResFormat = (
    list: any[],
    keys: {
      titleKey: string;
      authorKey: string;
      fromKey: string;
      imageKey: string;
    },
  ) => {
    return list.map((data) => ({
      from: data[keys.fromKey],
      author: data[keys.authorKey],
      title: data[keys.titleKey],
      image: data[keys.imageKey],
    }));
  };

  useEffect(() => {
    aggregateNews();
  }, [deferredQuery]);

  const handleSearchInput = (e: ChangeEvent) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  const handleFilterInput = (name, value) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const submitFilter = () => {
    aggregateNews();
  };

  const SearchNewsComponent = (
    <SearchNews
      searchValue={searchValue}
      handleSearchInput={handleSearchInput}
    />
  );

  return (
    <DefaultLayout
      title="News Aggregator"
      SearchNewsComponent={SearchNewsComponent}
    >
      <FilterNews
        filter={filter}
        handleFilterInput={handleFilterInput}
        submitFilter={submitFilter}
      />
      <Suspense fallback={<h2>Loading...</h2>}>
        <NewsList newsList={newsList} />
      </Suspense>
    </DefaultLayout>
  );
};

export default Home;
