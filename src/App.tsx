import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Header} from './components/Header';
import {AppPage} from './components/AppPage';
import {NotFoundPage} from './components/NotFoundPage';
import StatisticsPage from "./components/StatisticsPage/StatisticsPage";

function App() {

  return (
    <div className="App">
      <Layout>
        <Header/>
        <main className='container'>
          <Routes>
            <Route path="/" element={<AppPage/>}/>
            <Route path="/stat" element={<StatisticsPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Routes>
        </main>
      </Layout>
    </div>
  );
}

export default App;
