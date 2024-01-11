import './App.css';
import { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import FishPage from './pages/FishPage';
import InvertebratesPage from './pages/InvertebratesPage';
import SuppliesPage from './pages/SuppliesPage';
import QuizPage from './pages/QuizPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import RegisterPage from './pages/RegisterPage';
import TanksPage from './pages/TanksPage';
import SearchProvider from './components/SearchProvider';
import { SearchContext } from './components/SearchProvider';
import CartPage from './pages/CartPage';


function App() {
  return (

    <BrowserRouter>
      <SearchProvider>
        <Inner/>
   
      </SearchProvider>
    </BrowserRouter>
  );
}
function Inner(){
  const location = useLocation();
  const { clearSearch } = useContext(SearchContext);

  // Listen for route changes and clear search query
  useEffect(() => {
    // Call clearSearch when the route changes

    clearSearch();
  }, [location]);
  

  return(
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="user" element={<UserPage/>} />
        <Route path="admin" element={<AdminPage/>} />
        <Route path="tanks" element={<TanksPage/>} />
        <Route path="fish" element={<FishPage/>} />
        <Route path="invertebrates" element={<InvertebratesPage/>} />
        <Route path="supplies" element={<SuppliesPage/>} />
        <Route path="quiz" element={<QuizPage/>} />
        <Route path="register" element={<RegisterPage/>} />
        <Route path="cart" element={<CartPage/>} />
        <Route path="/" element={<HomePage />}>
        </Route>
        <Route path="*" element={<ErrorPage />}/>
      </Route></Routes>
  )
  
}

export default App;