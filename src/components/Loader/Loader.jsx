import RingLoader from 'react-spinners/RingLoader';

const override = {
  display: 'block',
  margin: '100px auto',
  borderColor: 'green',
};
const Loader = ({ loading }) => {
  return (
    <div>
      <RingLoader color="#6dc55f" cssOverride={override} loading={loading} />
    </div>
  );
};
export default Loader;
