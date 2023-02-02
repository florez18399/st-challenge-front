import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import MedicinesPage from "../modules/medicines/pages/MedicinesPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import PatientsPage from "../modules/patients/pages/PatientsPage";

const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patients" element={<PatientsPage />} />
      <Route path="/medicines" element={<MedicinesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default MainRouter;
