import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:id" element={
          // <PrivateRoute>
          //   <QuizPage />
          // </PrivateRoute>
          <QuizPage />

        } />
        <Route path="/result/:id" element={
          // <PrivateRoute>
          //   <ResultPage />
          // </PrivateRoute>
          <ResultPage />

        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;