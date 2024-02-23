import React from 'react'
import { Routes, Route } from "react-router-dom";
import { AppWrapper } from './App.styled';
import { useFetchTripsQuery } from './store';
import { TripsPage, PostPage } from './pages';
import { Loading } from './components';

function App() {

  const { data: trips, isFetching, error } = useFetchTripsQuery();

  if (isFetching || error) return <Loading fade={false} />;

  if (!trips) return null;

  return (
    <AppWrapper>
      <Routes>
        <Route path="/:trip/posts/:slug" element={<PostPage />} />
        <Route path="/:slug/*" element={<TripsPage trips={trips} />} />
        <Route path="*" element={<TripsPage trips={trips} />} />
      </Routes>
    </AppWrapper>
  )
}

export default App
