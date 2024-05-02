import styles from './input.module.scss';

const Input = ({ ...props }) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
