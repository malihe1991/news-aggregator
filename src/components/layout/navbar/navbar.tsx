import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './navbar.module.scss';
import paths from '@/router/paths';

interface NavbarProps {
  title: string;
  searchInputComponent?: ReactNode;
}

const Navbar = ({ title, searchInputComponent }: NavbarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHomePage = pathname === paths.home;

  const handleNavigation = () => {
    const path = isHomePage ? '/panel' : '/';
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h4 className={styles.title}>{title}</h4>
        {searchInputComponent}
      </div>
      <div className={styles.backButton} onClick={handleNavigation}>
        {isHomePage ? <span>Panel &rarr;</span> : <span>&larr; Back</span>}
      </div>
    </div>
  );
};

export default Navbar;
