
import './App.css';
import Header from './components/Header'
import { BrowserRouter } from 'react-router-dom';
import  AppRouter from './components/AppRouter';
import { GlobalProvider } from './GlobalState';
import Footer from './components/Footer';

function App() {
  return (
	  <GlobalProvider>
			<BrowserRouter >
				<div className="wrapper">
					<Header />
					<div className="page py-5">
						<AppRouter />
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</GlobalProvider>
  );
}

export default App;
