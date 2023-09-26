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
import ProtectedRoute from './PrivateRoure'

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

const Router = (props: { isAuthenticated?: boolean }) => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route
        path={RouteUrls.landing}
        element={
          <ProtectedRoute isAuthenticated={props.isAuthenticated}>
            <Landing />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteUrls.game}
        element={
          <ProtectedRoute isAuthenticated={props.isAuthenticated}>
            <GamePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteUrls.leaderBoard}
        element={
          <ProtectedRoute isAuthenticated={props.isAuthenticated}>
            <LeaderBoard />
          </ProtectedRoute>
        }
      />
      <Route path={RouteUrls.signIn} element={<SignIn />} />
      <Route path={RouteUrls.signUp} element={<SignUp />} />
      <Route
        path={RouteUrls.profile}
        element={
          <ProtectedRoute isAuthenticated={props.isAuthenticated}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path={RouteUrls.forum}
        element={
          <ProtectedRoute isAuthenticated={props.isAuthenticated}>
            <Forum />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteUrls.createTopic}
        element={
          <ProtectedRoute isAuthenticated={props.isAuthenticated}>
            <CreateTopic />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteUrls.topic}
        element={
          <ProtectedRoute isAuthenticated={props.isAuthenticated}>
            <Topic />
          </ProtectedRoute>
        }
      />

      <Route path={RouteUrls.error404} element={<Error code={404} />} />
      <Route path={RouteUrls.error500} element={<Error code={500} />} />
    </Route>
  </Routes>
)

export default Router
