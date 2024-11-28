import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Home from "../src/components/Home";
import Login from "../src/components/Login";
import AccountState from "./states/AccountState";
import AdminDashboard from "./components/AdminDashboard";
import AddBus from "../src/components/Buses/AddBus";
import BusList from "../src/components/BusList";
import AddRoute from '../src/components/Routes/AddRoute';
import RouteList from '../src/components/Routes/RouteList';
import AddEmployee from '../src/components/Employees/AddEmployee';
import EmployeeList from '../src/components/Employees/EmployeeList';
import UpdateEmployee from "../src/components/Employees/UpdateEmployee";
import UpdateBus from "../src/components/UpdateBus";

function App() {
  return (
    <BrowserRouter>
      <AccountState>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/AddBus" element={<AddBus />} />
            <Route path="/BusList" element={<BusList />} />
            <Route path="/AddRoute" element={<AddRoute />} />
            <Route path="/RouteList" element={<RouteList />} />
            <Route path="/editBus/:id" element={<UpdateBus />} />
            {/* Correcting the routes for Add Employee and Employee List */}
            <Route path="/AddEmployee" element={<AddEmployee />} />
            <Route path="/EmployeeList" element={<EmployeeList />} />
            <Route path="/EditEmployee/:id" element={<UpdateEmployee/>} />
          </Routes>
        </div>
        <Footer />
      </AccountState>
    </BrowserRouter>
  );
}

export default App;
