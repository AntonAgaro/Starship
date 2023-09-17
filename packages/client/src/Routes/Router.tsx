import React, { Route, Routes } from 'react-router-dom'
import MainLayout from '../Layouts/mainLayout'

export enum RouteUrls {
  landing = '/',
  game = '/game',
  leaderBoard = '/leaderboard',

  signIn = '/signin',
  signUp = '/signup',
  profile = '/profile',
  forumUrl = '/forum',
  forum = '/forum/:page?',
  createTopic = '/forum/topic/create',
  topic = '/forum/topic/:id',
  error404 = '/*',
  error500 = '/error',
}

const Router = () => (
  <Routes>
    <Route element={<MainLayout />}></Route>
  </Routes>
)

export default Router
