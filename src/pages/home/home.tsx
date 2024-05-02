import {
  ChangeEvent,
  Suspense,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import { getGuardianArticles } from '@/api/guardian';
import { getNewsApiArticles } from '@/api/news-api';
import DefaultLayout from '@/components/layout';
import FilterNews from '@/components/pages/home/filter-news';
import NewsList from '@/components/pages/home/news-list';
import SearchNews from '@/components/pages/home/search-news';
import { GUARDIAN_DATA_FORMAT, NEWS_API_DATA_FORMAT } from '@/constants';
import { useAppSelector } from '@/store/hook';
import { FilterType, NewsListType } from '@/types';
import { cleanParams } from '@/utils/clean-params';

const initialNewsList = {
  total: 0,
  list: [],
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsList, setNewsList] = useState<NewsListType>(initialNewsList);

  const [searchValue, setSearchValue] = useState('');
  const deferredQuery = useDeferredValue(searchValue);

  const { newsAPI, guardian } = useAppSelector((state) => ({
    newsAPI: state.feed.newsAPI,
    guardian: state.feed.guardian,
  }));
  const [filter, setFilter] = useState<FilterType>({
    from: '',
    category: '',
    sources: '',
  });

  const fetchNewsAPI = () => {
    const params = {
      sources: filter.sources || newsAPI?.sources,
      from: filter.from,
      q: deferredQuery,
    };
    return getNewsApiArticles(cleanParams(params));
  };

  const fetchGuardian = () => {
    let params = {
      section: filter.category || guardian.category,
      'from-date': filter.from,
      q: deferredQuery,
    };
    return getGuardianArticles(cleanParams(params));
  };

  const aggregateNews = () => {
    Promise.allSettled([fetchNewsAPI(), fetchGuardian()]).then((responses) => {
      let total = 0;
      const list = [];
      responses.forEach((response, index) => {
        if (response?.status !== 'fulfilled') {
          return;
        }
        switch (index) {
          case 0:
            {
              total += response.value.data.totalResults;
              const formattedList = normalizeResFormat(
                response.value.data.articles,
                NEWS_API_DATA_FORMAT,
              );
              list.push(...formattedList);
            }
            break;
          case 1:
            {
              total += response.value.data.response.total;
              const formattedList = normalizeResFormat(
                response.value.data.response.results,
                GUARDIAN_DATA_FORMAT,
              );
              list.push(...formattedList);
            }
            break;
        }
      });
      setNewsList({ total, list });
    });
  };

  const normalizeResFormat = (
    list: any[],
    keys: {
      fromKey: string;
      titleKey: string;
      webUrlKey?: string;
      authorKey?: string;
      imageKey?: string;
    },
  ) => {
    return list.map((data) => ({
      from: data[keys.fromKey],
      title: data[keys.titleKey],
      webUrl: data[keys.webUrlKey],
      author: data[keys.authorKey],
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
        <NewsList
          newsList={newsList}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </Suspense>
    </DefaultLayout>
  );
};

export default Home;
