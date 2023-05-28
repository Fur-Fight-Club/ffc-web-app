import styles from './InputError.module.scss';

type InputErrorProps = {
  errorMessage: string;
};

const InputError = ({ errorMessage }: InputErrorProps) => {
  return <p className={styles.errorParagraph}>{errorMessage}</p>;
};

export default InputError;
