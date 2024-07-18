import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePages';
import FormPages from './pages/FormPages';
import DatatablePage from './pages/DatatablePage';
import { BookContextProvider } from './context/BookContext';
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster />
      <Navbar />
      <BookContextProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/new/:id?' element={<FormPages />} />
          <Route path='/data-table' element={<DatatablePage />} />
        </Routes>
      </BookContextProvider>
    </>
  )
}

export default App
