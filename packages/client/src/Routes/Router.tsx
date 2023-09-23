import React, { Route, Routes } from 'react-router-dom'
import MainLayout from '../Layouts/mainLayout'
import GamePage from '../Pages/Game/game'
import Landing from '../Pages/Landing/landing'
import LeaderBoard from '../Pages/LeaderBoard/leaderBoard'
import SignIn from '../Pages/SignIn/signIn'
import SignUp from '../Pages/SignUp/signUp'
import Profile from '../Pages/Profile/profile'
import CreateTopic from '../Pages/Forum/CreateTopic/createTopic'
import Topic from '../Pages/Forum/Topic/topic'
import Forum from '../Pages/Forum/forum'
import Error from '../Pages/Error/error'

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
      <Route path={RouteUrls.game} element={<GamePage />} />
      <Route path={RouteUrls.leaderBoard} element={<LeaderBoard />} />

      <Route path={RouteUrls.signIn} element={<SignIn />} />
      <Route path={RouteUrls.signUp} element={<SignUp />} />
      <Route path={RouteUrls.profile} element={<Profile />} />

      <Route path={RouteUrls.forum} element={<Forum />} />
      <Route path={RouteUrls.createTopic} element={<CreateTopic />} />
      <Route path={RouteUrls.topic} element={<Topic />} />

      <Route path={RouteUrls.error404} element={<Error code={404} />} />
      <Route path={RouteUrls.error500} element={<Error code={500} />} />
    </Route>
  </Routes>
)

export default Router
