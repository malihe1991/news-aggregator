import { ChangeEvent } from 'react';
import styles from './filter-news.module.scss';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import { FILTER_OPTIONS } from '@/constants';
import { FilterType } from '@/types';

type FilterProps = {
  filter: FilterType;
  handleFilterInput: (name: string, value: string) => void;
  submitFilter: () => void;
};

const FilterNews = ({
  filter,
  handleFilterInput,
  submitFilter,
}: FilterProps) => {
  const handleChange = (e: ChangeEvent) => {
    const targetEvent = e.target as HTMLInputElement;
    handleFilterInput(targetEvent.name, targetEvent.value);
  };

  return (
    <div>
      <h4 className={styles.title}>Filter: </h4>
      <div className={styles.inputWrapper}>
        <Input
          type="text"
          name={FILTER_OPTIONS.from}
          placeholder="From (YYYY-MM-DD)"
          value={filter.from}
          onChange={handleChange}
        />
        <Input
          type="text"
          name={FILTER_OPTIONS.category}
          placeholder="Enter category"
          value={filter.category}
          onChange={handleChange}
        />
        <Input
          type="text"
          name={FILTER_OPTIONS.sources}
          placeholder="Enter source"
          value={filter.sources}
          onChange={handleChange}
        />
      </div>
      <Button type="button" onClick={submitFilter}>
        Apply
      </Button>
    </div>
  );
};

export default FilterNews;
