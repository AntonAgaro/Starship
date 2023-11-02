import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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
import CheckAuthorized from '../Containers/CheckAuthorized/CheckAuthorized'

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

export const redirect_uri = 'http://localhost:3000'

const Router = () => {
  const navigateToSignIn = <Navigate to={RouteUrls.signIn} replace />

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={RouteUrls.landing}
          element={
            <CheckAuthorized unauthView={navigateToSignIn}>
              <Landing />
            </CheckAuthorized>
          }
        />
        <Route
          path={RouteUrls.game}
          element={
            <CheckAuthorized unauthView={navigateToSignIn}>
              <GamePage />
            </CheckAuthorized>
          }
        />
        <Route
          path={RouteUrls.leaderBoard}
          element={
            <CheckAuthorized unauthView={navigateToSignIn}>
              <LeaderBoard />
            </CheckAuthorized>
          }
        />
        <Route
          path={RouteUrls.signIn}
          element={
            <CheckAuthorized unauthView={<SignIn />}>
              <Navigate to={RouteUrls.landing} replace />
            </CheckAuthorized>
          }
        />
        <Route
          path={RouteUrls.signUp}
          element={
            <CheckAuthorized unauthView={<SignUp />}>
              <Navigate to={RouteUrls.landing} replace />
            </CheckAuthorized>
          }
        />
        <Route
          path={RouteUrls.profile}
          element={
            <CheckAuthorized unauthView={navigateToSignIn}>
              <Profile />
            </CheckAuthorized>
          }
        />

        <Route
          path={RouteUrls.forum}
          element={
            <CheckAuthorized unauthView={navigateToSignIn}>
              <Forum />
            </CheckAuthorized>
          }
        />
        <Route
          path={RouteUrls.createTopic}
          element={
            <CheckAuthorized unauthView={navigateToSignIn}>
              <CreateTopic />
            </CheckAuthorized>
          }
        />
        <Route
          path={RouteUrls.topic}
          element={
            <CheckAuthorized unauthView={navigateToSignIn}>
              <Topic />
            </CheckAuthorized>
          }
        />

        <Route path={RouteUrls.error404} element={<Error code={404} />} />
        <Route path={RouteUrls.error500} element={<Error code={500} />} />
      </Route>
    </Routes>
  )
}

export default Router
