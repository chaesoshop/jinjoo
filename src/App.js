import React, { useState } from "react";
import Home from "./routes/Home";
import Trust from "./routes/Trust";
import HotArticles from "./routes/HotArticles";
import Login from "./routes/Login";
import Join from "./routes/Join";
import ProductPost from "./components/ProductPost";
import ProductWrite from "./components/ProductWrite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authenticatedState } from "./recoil/auth";
import MyPage from "./routes/MyPage";
import axios from "axios";
import Security from "./routes/Security";
import ArticleControl from "./routes/ArticleControl";
import AllProduct from "./components/AllProduct";
import ChangePassword from "./routes/ChangePassword";
import ProductEdit from "./components/ProductEdit";
import Chat from "./routes/Chat";
import Alert from "./components/Alert";
import ChatList from "./routes/ChatList";
import Search from "./routes/Search";
import SearchEmpty from "./routes/SearchEmpty";
import { BACKEND_URL } from "./config/config";

function App() {
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [liked, setLiked] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);

  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };

  const [replyToggle, setReplyToggle] = useState(false);
  const onReplyMenuToggle = () => {
    setReplyToggle(!replyToggle);
  };

  const [replyDelete, setReplyDelete] = useState(false);
  const onReplyDeleteT = () => {
    setReplyDelete(!replyDelete);
  };

  const [deleteToggle, setDeleteTogge] = useState(false);
  const onDeleteToggle = () => {
    setDeleteTogge(!deleteToggle);
  };

  const [editToggle, setEditToggle] = useState(false);
  const onEditToggle = () => {
    setEditToggle(!editToggle);
  };

  useEffect(() => {
    if (sessionStorage.getItem("userid") == null) {
      setLogined(false);
    }
  }, []);

  const onLike = async (articleid, userid) => {
    try {
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/likeProduct/${articleid}`,
        method: "GET",
        params: {
          productId: articleid,
          userid,
        },
      });
      setLiked(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onRemove = async (id) => {
    try {
      await axios({
        url: `http://${BACKEND_URL}:8083/productDelete/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onRemoveReply = async (replyId) => {
    try {
      await axios({
        url: `http://${BACKEND_URL}:8083/replyDelete/${replyId}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/trust"
          element={<Trust logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/hot_articles"
          element={<HotArticles logined={logined} setLogined={setLogined} />}
        />

        <Route path="/join" element={<Join />} />

        <Route path="/login" element={<Login logined={logined} />} />
        <Route
          path="/mypage"
          element={<MyPage logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/security"
          element={<Security logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/articleControl"
          element={<ArticleControl logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/chatList"
          element={<ChatList logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/allProduct"
          element={<AllProduct logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/productPost/:num"
          element={
            <ProductPost
              logined={logined}
              setLogined={setLogined}
              onLike={onLike}
              liked={liked}
              setLiked={setLiked}
              menuToggle={menuToggle}
              onMenuToggle={onMenuToggle}
              setMenuToggle={setMenuToggle}
              deleteToggle={deleteToggle}
              onDeleteToggle={onDeleteToggle}
              onRemove={onRemove}
              editToggle={editToggle}
              onEditToggle={onEditToggle}
            />
          }
        />
        <Route
          path="/productWrite"
          element={<ProductWrite logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/productedit/:num"
          element={<ProductEdit logined={logined} setLogined={setLogined} />}
        />

        <Route
          path="/changepassword"
          element={<ChangePassword logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/chat/:roomId"
          element={<Chat logined={logined} setLogined={setLogined} />}
        />

        <Route
          path="/search/:search"
          element={<Search logined={logined} setLogined={setLogined} />}
        />
        <Route
          path="/search"
          element={<SearchEmpty logined={logined} setLogined={setLogined} />}
        />
      </Routes>
      <Alert />
    </Router>
  );
}

export default App;
