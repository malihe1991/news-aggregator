import { useState } from 'react';
import s from './feed-panel.module.scss';
import Button from '@/components/common/button';
import Input from '@/components/common/input';
import DefaultLayout from '@/components/layout/default-layout';
import styles from '@/components/pages/home/filter-news/filter-news.module.scss';
import { FEED_OPTIONS } from '@/constants';
import { setNewsAPIState, setGuardianState } from '@/store/features/feed-slice';
import { useAppDispatch } from '@/store/hook';
import { FeedOptionType } from '@/types';

const InitialNewsApiOptions = { sources: '' };
const InitialGuardianOptions = { category: '' };

const FeedPanel = () => {
  const dispatch = useAppDispatch();

  const [newsApiOptions, setNewsApiOptions] = useState<FeedOptionType>(
    InitialNewsApiOptions,
  );

  const [guardianOptions, setGuardianOptions] = useState<FeedOptionType>(
    InitialGuardianOptions,
  );

  const sourceList = [
    {
      title: 'NewsAPI: ',
      handleSubmit: () => handleSubmit('newsAPI'),
      items: [
        {
          name: 'sources',
          value: newsApiOptions.sources,
          onChange: (e) =>
            setNewsApiOptions({ ...newsApiOptions, sources: e.target.value }),
        },
      ],
    },
    {
      title: 'The Guardian: ',
      handleSubmit: () => handleSubmit('guardian'),
      items: [
        {
          name: 'category',
          value: guardianOptions.category,
          onChange: (e) =>
            setGuardianOptions({
              ...guardianOptions,
              category: e.target.value,
            }),
        },
      ],
    },
  ];

  const handleSubmit = (storeName) => {
    switch (storeName) {
      case 'newsAPI':
        dispatch(setNewsAPIState(newsApiOptions));
        setNewsApiOptions(InitialNewsApiOptions);
        break;
      case 'guardian':
        dispatch(setGuardianState(guardianOptions));
        setGuardianOptions(InitialGuardianOptions);
        break;
    }
  };

  return (
    <DefaultLayout title="Personalize Feed Panel">
      {sourceList.map((source, index) => {
        return (
          <div key={index}>
            <h4 className={styles.title}>{source.title}</h4>
            <div className={styles.inputWrapper}>
              {source.items.map((item, i) => {
                return (
                  <Input
                    key={i}
                    type="text"
                    name={FEED_OPTIONS[item.name]}
                    placeholder={`Enter ${item.name}`}
                    value={item.value}
                    onChange={item.onChange}
                  />
                );
              })}
            </div>
            <Button type="button" onClick={source.handleSubmit}>
              Apply
            </Button>
            <hr className={s.line} />
          </div>
        );
      })}
    </DefaultLayout>
  );
};

export default FeedPanel;
