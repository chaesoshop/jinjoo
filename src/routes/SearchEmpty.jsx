import { useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../styles/Search.css";
const SearchEmpty = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [type, setType] = useState(sessionStorage.getItem("type") || "product");
  const onSearch = (e) => {
    if (e.target.value.length > 10) {
      return;
    }
    setSearch(e.target.value);
  };
  const onMove = () => {
    navigate(`/search/${search}`);
  };
};

export default SearchEmpty;
