import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import styles from './news-list.module.scss';
import { PAGE_SIZE } from '@/constants';
import { NewsListType } from '@/types';
import { formatDate } from '@/utils/date';

type NewsListProps = {
  newsList: NewsListType;
  currentPage: number;
  handlePageChange: (page: number) => void;
};
const NewsList = ({
  newsList,
  currentPage,
  handlePageChange,
}: NewsListProps) => {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  const handleLink = (link: string) => () => {
    window.open(link);
  };

  return (
    <>
      {newsList.list.slice(start, end).map((news, key) => (
        <div key={key} className={styles.card}>
          <div className={styles.newsContent}>
            {news?.author && (
              <div>
                <span className={styles.authorPrefix}>by </span>
                <span className={styles.authorName}>{news.author}</span>
              </div>
            )}
            <h4>{news?.title}</h4>
            <div>
              <span className={styles.publishedAtPrefix}>Published at: </span>
              <span className={styles.publishedAt}>
                {formatDate(news?.from)}
              </span>
            </div>
            {news?.webUrl && (
              <div onClick={handleLink(news?.webUrl)} className={styles.link}>
                Go to the site &rarr;
              </div>
            )}
          </div>
          {news?.image && (
            <img
              src={news.image}
              width="150"
              height="100"
              alt="news_image"
              className={styles.newsImage}
            />
          )}
        </div>
      ))}
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={newsList.total}
        pageSize={PAGE_SIZE}
        className={styles.pagination}
      />
    </>
  );
};

export default NewsList;
