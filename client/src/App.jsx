import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserConfirmed from "./pages/auth/UserConfirmed";
import FillDetailedInformationsAfterRegister from "./pages/auth/FillDetailedInformationsAfterRegister";
import ErrorPage from "./pages/ErrorPage";
import SendEmailConfirmLink from "./pages/auth/SendEmailConfirmLink";
import ProtectedRouteAsUser from "./pages/ProtectedRouteAsUser";
import ProtectedRouteAsNewlyRegistered from "./pages/ProtectedRouteAsNewlyRegistered";
import Homepage from "./pages/Homepage";
import AddWatchedFilmsAfterRegister from "./pages/AddWatchedFilmsAfterRegister";
import WatchedFilmsPage from "./pages/WatchedFilmsPage";
import WantedWatchFilmsPage from "./pages/WantedWatchFilmsPage";
import AddWantWatchFilms from "./pages/AddWantWatchFilms";
import ProtectedRouteAsFrequentUser from "./pages/ProtectedRouteAsFrequentUser";
import FilmDetail from "./pages/FilmDetail";
import UserSettings from "./pages/UserSettings";
import AddDiscussion from "./pages/AddDiscussion";
import MyCreatedDiscussions from "./pages/MyCreatedDiscussions";
import DiscussionDetail from "./pages/DiscussionDetail";
import AddReview from "./pages/AddReview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <Homepage />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
        <Route
          path="/addWatchedFilmsAfterRegister"
          element={
            <ProtectedRouteAsFrequentUser>
              <Layout>
                <AddWatchedFilmsAfterRegister />
              </Layout>
            </ProtectedRouteAsFrequentUser>
          }
        />
        <Route
          path="/addWantWatchFilms"
          element={
            <ProtectedRouteAsNewlyRegistered>
              <Layout>
                <AddWantWatchFilms />
              </Layout>
            </ProtectedRouteAsNewlyRegistered>
          }
        />
        <Route
          path="/watchedFilms"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <WatchedFilmsPage />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
        <Route
          path="/films/:filmId"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <FilmDetail />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
        <Route
          path="/wantedWatchFilms"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <WantedWatchFilmsPage />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
        <Route
          path="/userSettings"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <UserSettings />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
        <Route
          path="/addDiscussion"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <AddDiscussion />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
        <Route
          path="/discussion/:discussionId"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <DiscussionDetail />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
                <Route
          path="/addReview/:filmId"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <AddReview />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
        <Route
          path="/myCreatedDiscussions"
          element={
            <ProtectedRouteAsUser>
              <Layout>
                <MyCreatedDiscussions />
              </Layout>
            </ProtectedRouteAsUser>
          }
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/userConfirm" element={<UserConfirmed />} />
        <Route
          path="/auth/sendEmailConfirmLink"
          element={<SendEmailConfirmLink />}
        />
        <Route
          path="/auth/fillDetailedInformationsAfterRegister"
          element={<FillDetailedInformationsAfterRegister />}
        />
        <Route path="/auth/register" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
