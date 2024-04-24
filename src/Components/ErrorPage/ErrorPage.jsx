import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex w-full max-w-screen-2xl mx-auto min-h-screen justify-center items-center">
      <img src="" alt="" />
      <Link to={'/'}>
        <button>Go back</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
