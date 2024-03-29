import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import FreePostDetail from "./pages/FreePostDetail/FreePostDetail";
import MatchPostDetail from "./pages/MatchPostDetail/MatchPostDetail";
import MyPageContents from "./pages/MyPage/MyPageContents";
import FreePostWrite from "./pages/FreePostWrite/FreePostWrite";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyComment from "./pages/MyComment/MyComment";
import FreePostList from "./pages/FreePostList/FreePostList";
import Admin from "./pages/Admin/Admin";
import ReceivedEnroll from "./pages/ReceivedEnroll/ReceivedEnroll";
import MatchPostList from "./pages/MatchPostList/MatchPostList";
import MatchPostWrite from "./pages/MatchPostWrite/MatchPostWrite";
import MyEnroll from "./pages/MyEnroll/MyEnroll";
import FestivalList from "./components/FestivalList/FestivalList";
import Search from "./pages/Search/Search";
import NoticeList from "./pages/NoticeList/NoticeList";
import NoticeDetail from "./pages/NoticeDetail/NoticeDetail";
import NoticeWrite from "./pages/NoticeWrite/NoticeWrite";
import UpdateUserInfo from "./pages/MyPage/UpdateUserInfo";
import WishListPage from "./pages/WishList/WishList";
import FindPassword from "./pages/FindPassword/FindPassword";
import NotFound from "./components/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="free" element={<FreePostList />} />
          <Route path="match" element={<MatchPostList />} />
          <Route path="free/:id" element={<FreePostDetail />} />
          <Route path="match/:id" element={<MatchPostDetail />} />
          <Route path="mypage/mycontents" element={<MyPageContents />} />
          <Route path="mypage/userinfo" element={<UpdateUserInfo />} />
          <Route path="mypage/mycomment" element={<MyComment />} />
          <Route path="mypage/receivedenroll" element={<ReceivedEnroll />} />
          <Route path="mypage/myenroll" element={<MyEnroll />} />
          <Route path="free/write" element={<FreePostWrite />} />
          <Route path="free/write/:id" element={<FreePostWrite />} />
          <Route path="match/write" element={<MatchPostWrite />} />
          <Route path="match/write/:id" element={<MatchPostWrite />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="auth/findpassword" element={<FindPassword />} />
          <Route path="wishlist" element={<WishListPage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="search/:keyword" element={<Search />} />
          <Route
            path="tripinfo"
            element={<FestivalList location="tripInfo" />}
          />
          <Route path="notice" element={<NoticeList />} />
          <Route path="notice/:id" element={<NoticeDetail />} />
          <Route path="notice/write" element={<NoticeWrite />} />
          <Route path="notice/write/:id" element={<NoticeWrite />} />
          <Route path="*" element={<NotFound message="잘못된 주소입니다" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
