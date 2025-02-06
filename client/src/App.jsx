// import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css'
import './sass/main.css'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import Dashboard from './pages/Dashboard/Dashboard'

import DashboardLayout from "./ui/layouts/DashboardLayout";
import Guidelines from "./pages/Dashboard/Guidelines";
import ProjectReview from "./pages/project-review/ProjectReview";
import ProjectReviewDetails from "./pages/project-review/ProjectReviewDetails";
import Projects from "./pages/projects/Projects";
import MuiTest from "./pages/Test/MuiTest";
import Forecast from "./pages/forecast/Forecast";
import MyProfile from "./pages/profile/MyProfile";
import FullPageLayout from "./ui/layouts/FullPageLayout";





const queryClinet = new QueryClient();


function App() {
  return (
    <>
    <QueryClientProvider client={queryClinet}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage />}/>  
          <Route element={<FullPageLayout/>}>
            <Route path="/my-profile" element={<MyProfile />}/>          
          </Route>

          {/* <Route path="/dashboard" element={<Dashboard />}/> */}

          <Route element={<DashboardLayout/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/guidelines" element={<Guidelines/>}/>
            <Route path="/forecast" element={<Forecast/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/project-review" element={<ProjectReview/>}/>
            <Route path="/project-review/:id" element={<ProjectReviewDetails/>}/>
            <Route path="/mui-test" element={<MuiTest/>}/>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

    </>
  )
}

export default App
