import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { AppPage } from './components/AppPage';
import { NotFoundPage } from './components/NotFoundPage';
import { StatisticsPage } from './components/StatisticsPage';
import {CreateStatState} from "./help/CreateStatsState";
import StatisticsPageContainer from "./components/StatisticsPage/StatisticsPageContainer";

function App() {
  // TODO Удалить. Служит для создания статистики
  CreateStatState();

  return (
    <div className="App">
      <Layout>
        <Header />
        <main className='container'>
          <Routes>
            <Route path="/" element={<AppPage />} />
            <Route path="/stat" element={<StatisticsPageContainer />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Layout>
    </div>
  );
}

export default App;
