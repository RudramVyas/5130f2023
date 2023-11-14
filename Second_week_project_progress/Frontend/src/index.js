import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import reportWebVitals from './reportWebVitals';
import { Provider } from './context';

// Pages
import App from './App';
import Profile from './pages/profile';
import SignUp from './pages/signup';
import ConfirmationApp from './pages/confirmation'; // Add your Confirmation page component

const theme = createTheme();

ReactDOM.render(
  <Provider>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route path="/" element={<App/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/confirm/setup-profile/:userId/:otp" element={<ConfirmationApp/>} />
          </Routes>
      </Router>``
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
