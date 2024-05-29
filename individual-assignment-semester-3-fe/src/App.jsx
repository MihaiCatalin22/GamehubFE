import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import Header from './layoutComponents/Header';
import Footer from './layoutComponents/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ForumPage from './components/forum/ForumPage';
import ForumPostDetails from './components/forum/ForumPostDetails';
import GamesPage from './components/game/GamesPage';
import UserList from './components/user/UserList';
import UserDetailPage from './components/user/UserDetailPage';
import GameForm from './components/game/GameForm';
import GameDetailsPage from './components/game/GameDetails';
import GamesList from './components/game/GamesList';
import ReviewSubmissionPage from './components/review/ReviewSubmissionPage';
import EventList from './components/events/EventList';
import EventDetails from './components/events/EventDetails'
import EditProfile from './components/user/EditProfile';
import UserProfile from './components/user/UserProfile';
import LogoutPage from './components/LogoutPage';
import UpdateEventPage from './components/events/UpdateEventPage';
import PastEvents from './components/events/PastEventsPage';
import EditGamePage from './components/game/EditGamePage';
import UserPosts from './components/user/UserPosts';
import UserReviews from './components/user/UserReviews';
import AboutPage from './components/About';
import PurchasesPage from './components/purchases/PurchasesPage';
import LibraryPage from './components/user/LibraryPage';
import Recommendations from './components/game/Recommendations';
import PendingRequestsPage from './components/user/friends/PendingRequestsPage';
import FriendsListPage from './components/user/friends/FriendsListPage';
import ChatComponent from './components/ChatComponent';
import WebSocketInitializer from './components/WebSocketInitializer';
import SalesStatisticsPage from './components/game/SalesStatisticsPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      <WebSocketInitializer />
        <main className="flex-grow">
          <div className="flex justify-center items-center w-full h-full min-h-screen">
          <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/forum/:postId" element={<ForumPostDetails />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/gamelist" element={<GamesList />} />
              <Route path="/games/:gameId" element={<GameDetailsPage />} />
              <Route path="/user/:userId/purchases" element={<PurchasesPage />} />
              <Route path="/user/:userId/library" element={<LibraryPage />} />
              <Route path="/games/:gameId/review" element={<ReviewSubmissionPage />} />
              <Route path="/games/edit/:gameId" element={<EditGamePage />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:userId" element={<UserDetailPage />} />
              <Route path="/user/:userId/posts" element={<UserPosts />} />
              <Route path="/user/:userId/reviews" element={<UserReviews />} />
              <Route path="/profile" element={<UserProfile/>} />
              <Route path="/edit-profile" element={<EditProfile/>} />
              <Route path="/add-game" element={<GameForm />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route path="/past-events" element={<PastEvents/>} />
              <Route path="/events/edit/:eventId" element={<UpdateEventPage />} />
              <Route path="/logout" element={<LogoutPage/>} />
              <Route path="/recommendations/:userId" element={<Recommendations />} />
              <Route path="/" element={<AboutPage/>} />
              <Route path="/friends" element={<FriendsListPage />} />
              <Route path="/pending-requests" element={<PendingRequestsPage/>} />
              <Route path="/friends" element={<FriendsListPage/>} />
              <Route path="/chat/:friendId" element={<ChatComponent />} />
              <Route path="/admin/sales-stats" element={<SalesStatisticsPage />} />
            </Routes>
            <Footer />
          </div>
        </main>
        </AuthProvider>
    </BrowserRouter>
  );
};

export default App;