import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import LoginPage from 'src/pages/LoginPage';
import RegisterPage from 'src/pages/RegisterPage';
import { useAppSelector } from './reduxHooks';

const queryClient = new QueryClient();

function App() {
  const user = useAppSelector(state => state.auth.user);

  const renderUnauthorizedRoutes = () => {
    return (
      <>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Redirect exact from="/" to="/login" />
      </>
    );
  };

  const renderAuthorizedRoutes = () => {
    return <div>authorized</div>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          {user ? renderAuthorizedRoutes() : renderUnauthorizedRoutes()}
        </Switch>
      </BrowserRouter>
      <ToastContainer position="top-center" />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
