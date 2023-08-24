import { useRouteError } from 'react-router-dom';
import './ErrorPage.scss';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-page" id="error-page">
      <header className="error-page-header">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>{error.statusText || error.message}</p>
      </header>
    </div>
  );
};

export default ErrorPage;
