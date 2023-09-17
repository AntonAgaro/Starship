import React, { Route, Routes } from 'react-router-dom'
import MainLayout from '../Layouts/mainLayout'
import Game from '../Pages/Game/game'
import Landing from '../Pages/Landing/landing'
import LeaderBoard from '../Pages/LeaderBoard/leaderBoard'
import SignIn from '../Pages/SignIn/signIn'
import SignUp from '../Pages/SignUp/signUp'
import Profile from '../Pages/Profile/profile'

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
      <Route path={RouteUrls.leaderBoard} element={<LeaderBoard />} />

      <Route path={RouteUrls.signIn} element={<SignIn />} />
      <Route path={RouteUrls.signUp} element={<SignUp />} />
      <Route path={RouteUrls.profile} element={<Profile />} />
    </Route>
  </Routes>
)

export default Router
