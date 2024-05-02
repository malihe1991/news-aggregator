import { ReactNode } from 'react';
import Container from './container';
import Navbar from './navbar';

type DefaultLayoutProps = {
  title: string;
  children: ReactNode;
  SearchNewsComponent?: ReactNode;
};

const DefaultLayout = ({
  title,
  children,
  SearchNewsComponent = null,
}: DefaultLayoutProps) => {
  return (
    <>
      <Navbar title={title} searchInputComponent={SearchNewsComponent} />
      <Container>{children}</Container>
    </>
  );
};

export default DefaultLayout;
