import { useState, useEffect } from "react";
import Footer from "../layouts/Footer";
import LoginedHeader from "../layouts/LoginedHeader";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaCarrot } from "react-icons/fa";
import ProductPaging from "../components/ProductPaging";
import "../styles/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillLike, AiOutlineCaretRight } from "react-icons/ai";
import { FiMessageCircle, FiCheckCircle } from "react-icons/fi";
import Header from "../layouts/Header";
import { BACKEND_URL } from "../config/config";
const Search = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const { search } = useParams(); //초기검색어
  const [searchValue, setSearchValue] = useState(search); //검색어
  const [search2, setSearch2] = useState(search);
  const [type, setType] = useState(sessionStorage.getItem("type") || "product");
  //검색어 수정

  useEffect(() => {
    setSearch2(search);
    setSearchValue(search);
    onSearch(type);
  }, [search]);

  const onSearchValueChange = (e) => {
    if (e.target.value.length > 10) {
      return;
    }

    setSearchValue(e.target.value);
  };
  const move = (e) => {
    navigate(`/search/${e}`);
  };

  //여기부터 Product
  const [searchList, setSearchList] = useState([]);
  const onSearchChange = (e) => {
    setSearchList(e);
  };
  const [page, setPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(8);
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  useEffect(() => {
    setCurrentPosts(searchList.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);

  const moveProduct = async (id) => {
    try {
      await axios({
        url: `http://${BACKEND_URL}:8083/productView/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/productpost/${id}`);
  };

  //여기부터 Jobs
  
  //여기부터 Realty
  
  //여기부터 Board

  //게시판 스크롤
  const [target, setTarget] = useState(null); // 관찰대상 target
  const [isLoaded, setIsLoaded] = useState(false); // Load 중인가를 판별하는 boolean
  // 요청이 여러번 가는 것을 방지하기 위해서
  const [stop, setStop] = useState(false); // 마지막 데이터까지 다 불러온 경우 더이상 요청을 보내지 않기 위해서
  // 마지막 부분까지 가버릴 때 계속 요청을 보내는 것 방지
  const [num, setNum] = useState(1);
  let observer;
  useEffect(() => {
    if (target && !stop) {
      // callback 함수로 onIntersect를 지정
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target, isLoaded]);

  // isLoaded가 변할 때 실행
  useEffect(() => {
    // isLoaded가 true일 때 + 마지막 페이지가 아닌 경우 = 요청보내기
    if (isLoaded && !stop) {
      //api 카페만 몇개 불러오는지에 대한 주소 새로 만들어야함.
      //초기값 7개 , 스크롤 내릴 때마다 그 다음 7개에 대한 인덱스만 가져와야함
      axios.get(`http://${BACKEND_URL}:8083/boards?num=${num}`).then((res) => {
        // 받아온 데이터를 보여줄 전체 리스트에 concat으로 넣어준다
        setNum(num + 1);
        // 다음 요청 전까지 요청 그만 보내도록 false로 변경
        setIsLoaded(false);

        if (res.data.length == 0) {
          // 전체 데이터를 다 불러온 경우(불러온 값이 12개 보다 적다면 -> 매번 12개씩 불러오기로 했으므로 해당 값보다 작으면 마지막 페이지) 아예 로드를 중지
          setStop(true);
        }
      });
    }
  }, [isLoaded]);

  const getMoreItem = () => {
    // 데이터를 받아오도록 true 로 변경
    setIsLoaded(true);
  };

  // callback
  const onIntersect = async ([entry], observer) => {
    // entry 요소가 교차되거나 Load중이 아니면
    if (entry.isIntersecting && !isLoaded) {
      // 관찰은 일단 멈추고
      observer.unobserve(entry.target);
      // 데이터 불러오기
      getMoreItem();
      // 불러온 후 다시 관찰 실행
      observer.observe(entry.target);
    }
  };
  // 게시판 스크롤 끝

  //타입에 따른 검색결과 요청하기
  const onSearch = async (type) => {
    try {
      if (type == "product") {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/searchProduct`,
          method: "POST",
          data: {
            searchWord: search,
          },
        });
        onSearchChange(data.data);
        setCurrentPosts(data.data.slice(0, 8));
      } 
    } catch (e) {
      console.log(e);
    }
  };
  if (type == "product") {
    return (
      <div>
        {logined == "true" ? (
          <LoginedHeader logined={logined} setLogined={setLogined} />
        ) : (
          <Header logined={logined} setLogined={setLogined} />
        )}

        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            border: "1px #ffb412 solid",
            height: "780px",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="" style={{}}>
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  fontSize: "1.5rem",
                }}
              />
              <input
                type="text"
                placeholder="물품이나 동네를 검색해 보세요"
                value={searchValue}
                onChange={onSearchValueChange}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    setType("product");
                    move(searchValue);
                  }
                }}
                autoFocus
              />
              <div>"{search2}" 중고거래 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  padding: "6px 11px",
                  backgroundColor: "#ffa445",
                  color: "white",
                }}
                onClick={() => {
                  setType("product");
                  sessionStorage.setItem("type", "product");
                  onSearch("product");
                }}
              >
                중고거래
              </button>
              <button
                className="jobsButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  setType("jobs");
                  sessionStorage.setItem("type", "jobs");
                  onSearch("jobs");
                }}
              >
                알바
              </button>
              <button
                className="realtyButton"
                style={{
                  border: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  setType("realty");
                  sessionStorage.setItem("type", "realty");
                  onSearch("realty");
                }}
              >
                부동산
              </button>
              <button
                className="boardToggleButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  borderRight: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  setType("board");
                  sessionStorage.setItem("type", "board");
                  onSearch("board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
          {searchList.length == 0 ? (
            "검색 결과가 없습니다."
          ) : (
            <div>
              <ul
                className="grid grid-cols-4"
                style={{
                  height: "680px",
                }}
              >
                {currentPosts.map((product, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        moveProduct(product.productId);
                      }}
                    >
                      <div
                        style={{
                          paddingTop: "3rem",
                          paddingLeft: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "150px",
                            height: "150px",
                            borderRadius: "15px",

                            marginBottom: "10px",
                          }}
                        >
                          {product.profileImage != null ? (
                            <img
                              src={product.profileImage}
                              alt=""
                              style={{
                                borderRadius: "15px",
                                width: "100%",
                                height: "100%",
                                objectFit: "fill",
                                display: "block",
                              }}
                            />
                          ) : (
                            <FaCarrot
                              style={{
                                color: "#fc9d39",
                                fontSize: "10rem",
                                transform: "translate(-5% ,-5%)",
                                border: "0.1px #fc9d39 solid",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </div>
                        <div
                          className="ellipsis_1"
                          style={{
                            width: "150px",
                            height: "25px",
                            textAlign: "start",
                          }}
                        >
                          <span>{product.productSubject}</span>
                        </div>
                        <div className="flex ">
                          <span
                            className="ellipsis_1"
                            style={{
                              fontWeight: "bold",
                              width: "100px",
                              height: "20px",

                              textAlign: "start",
                            }}
                          >
                            {product.productPrice}원
                          </span>
                        </div>
                        <div
                          className="flex"
                          style={{
                            fontSize: "0.9rem",
                          }}
                        >
                          <span>{product.productDealAddress}</span>
                        </div>
                        <div
                          className="flex"
                          style={{
                            paddingBottom: "3rem",
                            fontSize: "0.8rem",
                            color: "gray",
                          }}
                        >
                          <span>관심 {product.productLike}</span>
                          &nbsp; ·&nbsp;
                          <span>채팅 {product.productChatting}</span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>

              <ProductPaging
                totalCount={searchList.length}
                page={page}
                postPerPage={postPerPage}
                pageRangeDisplayed={5}
                handlePageChange={handlePageChange}
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    );        
  } else {
    return (
      <div>
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
            border: "1px #ffb412 solid",

            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="" style={{}}>
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  fontSize: "1.5rem",
                }}
              />
              <input
                type="text"
                placeholder="물품이나 동네를 검색해 보세요"
                value={searchValue}
                onChange={onSearchValueChange}
                style={{
                  width: "300px",
                  backgroundColor: "#f3f6f4",
                  padding: "5px 10px",
                  borderRadius: "10px",
                }}
                onKeyUp={(e) => {
                  if (e.key == "Enter") {
                    move(searchValue);
                  }
                }}
              />
              <div>"{search2}" 게시판 검색 결과입니다.</div>
            </div>
            <div>
              <button
                className="productButton"
                style={{
                  padding: "5px 10px",
                  border: "1px #ffa445 solid",
                }}
                onClick={() => {
                  setType("product");
                  sessionStorage.setItem("type", "product");
                  onSearch("product");
                }}
              >
                중고거래
              </button>
              <button
                className="jobsButton"
                style={{
                  borderTop: "1px #ffa445 solid",
                  borderBottom: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  setType("jobs");
                  sessionStorage.setItem("type", "jobs");
                  onSearch("jobs");
                }}
              >
                알바
              </button>
              <button
                className="realtyButton"
                style={{
                  border: "1px #ffa445 solid",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  setType("realty");
                  sessionStorage.setItem("type", "realty");
                  onSearch("realty");
                }}
              >
                부동산
              </button>
              <button
                className="boardToggleButton"
                style={{
                  padding: "6px 11px",
                  backgroundColor: "#ffa445",
                  color: "white",
                }}
                onClick={() => {
                  setType("board");
                  sessionStorage.setItem("type", "board");
                  onSearch("board");
                }}
              >
                게시판
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Search;
