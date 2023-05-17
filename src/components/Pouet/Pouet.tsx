type PouetProps = {
  children: React.ReactNode;
};

const Pouet = ({children}: PouetProps) => {
  return (
    <div>
      <h1>Pouet</h1>
      {children}
    </div>
  );
}

export default Pouet;