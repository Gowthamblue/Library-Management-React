import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminPage from "./pages/AdminPage";
import MemberPage from "./pages/MemberPage";
import AddBook from "./components/AddBook";
import ViewBooks from "./components/ViewBooks";
import SearchBooks from "./components/SearchBooks";
import MemberDetails from "./components/MemberDetails";
import BookStatus from "./components/BookStatus";
import FineDetails from "./membercomponents/FineDetails";
import MyCheckedoutBooks from "./membercomponents/MyCheckedoutBooks";
import MyReservedBooks from "./membercomponents/MyReservedBooks";
import ViewBooksMem from "./membercomponents/ViewBooksMem";
import WelcomePage from "./pages/WelcomePage";
import MemberDetailsAll from "./membercomponents/MemberDetailsAll";
import AdminWelcome from "./pages/AdminWelcome";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminPage />
          </ProtectedRoute>
        } >

          <Route index element={<AdminWelcome />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="display-books" element={<ViewBooks />} />
          <Route path="search-books" element={<SearchBooks />} />
          <Route path="member-details" element={<MemberDetails />} />
          <Route path="book-status" element={<BookStatus />} />
        </Route>

        <Route
          path="/member"
          element={
            <ProtectedRoute allowedRole="MEMBER">
              <MemberPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<MemberDetailsAll />} />
          <Route path="view-books" element={<ViewBooksMem />} />
          <Route path="checkout-book" element={<MemberDetailsAll/>} />
          <Route path="return-book" element={<MyCheckedoutBooks />} />
          <Route path="fine-details" element={<FineDetails />} />
          <Route path="my-reserved-books" element={<MyReservedBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
