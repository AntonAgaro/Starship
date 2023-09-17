import React, { Route, Routes } from 'react-router-dom'
import MainLayout from '../Layouts/mainLayout'
import Game from '../Pages/Game/game'
import Landing from '../Pages/Landing/landing'

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
    <Route element={<MainLayout />}>
      <Route path={RouteUrls.landing} element={<Landing />} />
      <Route path={RouteUrls.game} element={<Game />} />
    </Route>
  </Routes>
)

export default Router
