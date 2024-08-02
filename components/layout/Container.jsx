import css from './Container.module.css';

const Container = ({ children, style }) => {
  return (
    <div className={css.container} style={style}>
      {children}
    </div>
  );
};

export default Container;