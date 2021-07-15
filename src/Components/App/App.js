import "./App.css";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Navbar from "../Navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import {UserContextProvider} from "../../context/AuthContext"
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "../Theme/Globalstyle";
import { lightTheme, darkTheme } from "../Theme/Theme"
import  {useDarkMode} from "../Theme/useDarkMode"
import Post from "../Postview/Post";
import UserProfile from "../UserProfile/UserProfile";
import { MainContextProvider } from "../../context/MainContext";




function App() {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <UserContextProvider>
      <MainContextProvider>
      <ThemeProvider theme={themeMode}>
      <GlobalStyles/>
        <div className="App">
        <Navbar theme={theme} toggleTheme={themeToggler} />
          <div className="main-content-view">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/userprofile" component={UserProfile} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </div>
        </div>
        </ThemeProvider>
        </MainContextProvider>
    </UserContextProvider>
        
    
    
  );
}

export default App;
