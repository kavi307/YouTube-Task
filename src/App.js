import { Provider } from "react-redux";
import "./App.css";
import Body from "./component/body";
import Head from "./component/head";
import store from "./utils/Store";
import MainContainer from "./component/Maincontainer"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WatchPage from "./component/WatchPage";

const appRouter = createBrowserRouter([{
  path : "/",
  element : <Body/>,
  children : [
    {
      path : "/",
      element : <MainContainer></MainContainer>
    },
    {
      path : "watch",
      element : <WatchPage></WatchPage>
    }
  ]
}])

function App() {
  return (
    <Provider store = {store}>
    <div>
      <Head/>
      <RouterProvider router={appRouter}/>
      
    </div>
    </Provider>

  );

 
}

export default App;
