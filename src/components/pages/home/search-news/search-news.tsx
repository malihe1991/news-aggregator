import { ChangeEvent } from 'react';
import styles from './search-news.module.scss';
import Input from '@/components/common/input';

type SearchNewsProps = {
  searchValue: string;
  handleSearchInput: (e: ChangeEvent) => void;
};

const SearchNews = ({ searchValue, handleSearchInput }: SearchNewsProps) => {
  return (
    <div className={styles.searchInputWrapper}>
      <div className={styles.searchIcon}>&#128269;</div>
      <Input
        type="text"
        placeholder="Search content"
        value={searchValue}
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchNews;
