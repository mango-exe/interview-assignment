import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AuthLayout from './components/AuthLayout';
import MainLayout from './components/MainLayout';

import Protected from './components/Protected';

import Login from './components/AuthLayout/Login';
import Register from './components/AuthLayout/Register';

import Invoices from './components/MainLayout/Invoices';
import Home from './components/MainLayout/Home';
import Bills from './components/MainLayout/Bills';
import Expenses from './components/MainLayout/Expenses';
import Reports from './components/MainLayout/Reports';

import ErrorDisplay from './components/ErrorDisplay';

export default function App() {
  return (
    <>
      <ErrorDisplay />
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            element={
              <Protected>
                <MainLayout />
              </Protected>
            }
          >
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/home" element={<Home />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}
