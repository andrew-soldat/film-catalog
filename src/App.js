import Header from "./components/Header";
import { HashRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { GlobalProvider } from "./GlobalState";
import Footer from "./components/Footer";

function App() {
   return (
      <GlobalProvider>
         <HashRouter>
            <div className="wrapper">
               <Header />
               <div className="page">
                  <AppRouter />
               </div>
               <Footer />
            </div>
         </HashRouter>
      </GlobalProvider>
   );
}

export default App;
