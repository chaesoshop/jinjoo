import React, { useState } from "react";
import LoginedHeader from "../layouts/LoginedHeader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaCarrot } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { BACKEND_URL } from "../config/config";
import ProductPaging from "../components/ProductPaging";
import {
  ImSad,
  ImSad2,
  ImSmile,
  ImSmile2,
  ImHappy,
  ImHappy2,
} from "react-icons/im";
import { AiOutlineCheck } from "react-icons/ai";

const ArticleControl = ({ logined, setLogined }) => {
  const navigate = useNavigate();
  const moveBack = () => {
    alert("로그인 후 사용할 수 있는 기능입니다.");
    navigate("/");
  };
  if (!logined) {
    moveBack();
  }

  const [spreadProduct, setSpreadProduct] = useState(
    sessionStorage.getItem("productToggle") || false
  );
  const [spreadJobs, setSpreadJobs] = useState(false);
  const [spreadRealty, setSpreadRealty] = useState(
    sessionStorage.getItem("realtyToggle") || false
  );

  if (sessionStorage.getItem("myRealty")) {
    setRealtyDealToggle(true);
  }
  const onSpreadProduct = () => {
    setSpreadProduct(!spreadProduct);
  };
  const onSpreadJobs = () => {
    setSpreadJobs(!spreadJobs);
  };
  const onSpreadRealty = () => {
    setSpreadRealty(!spreadRealty);
  };
  //여기부터 Realty
  const [Rpage, setRPage] = useState(1);
  const [currentRealtys, setCurrentRealtys] = useState([]);
  const [realty, setRealty] = useState([]);
  const RhandlePageChange = (page) => {
    setRPage(page);
  };
  const [RpostPerPage] = useState(4);
  const RindexOfLastPost = Rpage * RpostPerPage;
  const RindexOfFirstPost = RindexOfLastPost - RpostPerPage;
  const [choiceRBuyer, setChoiceRBuyer] = useState(false);
  const [rChatList, setRChatList] = useState([]);
  const [isRChecked, setIsRChecked] = useState(false);
  const [rChatNum, setRChatNum] = useState("");
  const [realtyBuyUserId, setRealtyBuyUserId] = useState(
    sessionStorage.getItem("realtyBuyer") || ""
  );

  const onRChatNum = (index) => {
    setRChatNum(index);
  };
  const onRCheck = () => {
    setIsRChecked(true);
  };
  const onChoiceRBuyer = async () => {
    setChoiceRBuyer(!choiceRBuyer);
    const data = await axios({
      url: `http://${BACKEND_URL}:8083/getRoomByRealtyId/${rnum}`,
      method: "get",
    });
    setRChatList(data.data);
  };
  useEffect(() => {
    setCurrentRealtys(realty.slice(RindexOfFirstPost, RindexOfLastPost));
  }, [RindexOfFirstPost, RindexOfLastPost, Rpage]);

  const moveRealty = async (id) => {
    try {
      await axios({
        url: `http://${BACKEND_URL}:8083/realtyCheck/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/realtypost/${id}`);
  };

  const onRealty = (data) => {
    const datas = data.reverse();
    setRealty((prev) => datas);
  };

  const [rnum, setRnum] = useState(sessionStorage.getItem("realtyId") || "");
  const [realtyDealToggle, setRealtyDealToggle] = useState(
    sessionStorage.getItem("realtyToggle") || false
  );

  const onRealtyDealToggle = () => {
    setRSadToggle(false);
    setRSmileToggle(false);
    setRHappyToggle(false);
    setRealtyDealToggle(!realtyDealToggle);
  };

  const [realtyReviewCheck, seRealtyReviewCheck] = useState("");

  const onRealtyReview = async (articleid) => {
    try {
      if (realtyReviewCheck == "") {
        alert("후기를 선택해주세요");
        return;
      }
      if (
        sessionStorage.getItem("realtyBuyer") == undefined ||
        sessionStorage.getItem("realtyBuyer") == null
      ) {
        alert("구매자를 선택해 주세요");
        return;
      }
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/realtyReview`,
        method: "POST",
        data: {
          realtyId: articleid,
          realtyReview: realtyReviewCheck,
          realtyBuyUserId,
          realtySellUserId: sessionStorage.getItem("userid"),
        },
      });
      console.log(data.data);
      sessionStorage.removeItem("realtyBuyer");
      sessionStorage.removeItem("realtyId");
      sessionStorage.removeItem("realtyToggle");
      setRealtyBuyUserId("");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const [rsadToggle, setRSadToggle] = useState(false);
  const [rsmileToggle, setRSmileToggle] = useState(false);
  const [rhappyToggle, setRHappyToggle] = useState(false);

  const onRealtySad = () => {
    setRSadToggle(true);
    setRSmileToggle(false);
    setRHappyToggle(false);
    seRealtyReviewCheck("별로예요");
  };
  const onRealtySmile = () => {
    setRSadToggle(false);
    setRSmileToggle(true);
    setRHappyToggle(false);
    seRealtyReviewCheck("좋아요");
  };
  const onRealtyHappy = () => {
    setRSadToggle(false);
    setRSmileToggle(false);
    setRHappyToggle(true);
    seRealtyReviewCheck("최고예요");
  };

  //여기부터 Product
  const [pnum, setPnum] = useState(sessionStorage.getItem("productId") || "");
  const [Ppage, setPPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const PhandlePageChange = (page) => {
    setPPage(page);
  };
  const [PpostPerPage] = useState(8);
  const PindexOfLastPost = Ppage * PpostPerPage;
  const PindexOfFirstPost = PindexOfLastPost - PpostPerPage;
  const [choicePBuyer, setChoicePBuyer] = useState(false);
  const [pChatList, setPChatList] = useState([]);
  const [isPChecked, setIsPChecked] = useState(false);
  const [pChatNum, setPChatNum] = useState("");
  const [buyUserId, setBuyUserId] = useState(
    sessionStorage.getItem("buyer") || ""
  );
  const [pUrl, setPUrl] = useState(`${sessionStorage.getItem("pUrl")}` || "");
  const onPChatNum = (index) => {
    setPChatNum(index);
  };

  const onPCheck = () => {
    setIsPChecked(true);
  };
  const onChoicePBuyer = async () => {
    setChoicePBuyer(!choicePBuyer);
    const data = await axios({
      url: `http://${BACKEND_URL}:8083/getRoomByProductId/${pnum}`,
      method: "get",
    });
    setPChatList(data.data);
  };
  useEffect(() => {
    setCurrentProducts(product.slice(PindexOfFirstPost, PindexOfLastPost));
  }, [PindexOfFirstPost, PindexOfLastPost, Ppage]);
  const onProduct = (data) => {
    const datas = data.reverse();
    setProduct((prev) => datas);
  };

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

  const [dealToggle, setDealToggle] = useState(
    sessionStorage.getItem("productToggle") || false
  );

  const onDealToggle = () => {
    setPSadToggle(false);
    setSmileToggle(false);
    setHappyToggel(false);
    setDealToggle(!dealToggle);
    setChoicePBuyer(false);
  };

  const onDealToggleOff = () => {
    setDealToggle(false);
  };
  //productReview
  const onProductNotification = () => {
    try {
      if (pUrl == "") {
        alert("에러가 발생했습니다. 다시 시도해주세요.");
        return;
      }
      const notificationRequestDto = {
        content: "후기 작성",
        url: `chat/${pUrl}`,
        notificationType: "REVIEW",
        userid: buyUserId,
        sender: sessionStorage.getItem("userid"),
      };

      axios({
        url: `http://${BACKEND_URL}:8083/addReviewNotification`,
        method: "POST",
        data: notificationRequestDto,
      });

      window.location.reload();
      onDealToggleOff();
    } catch (e) {
      console.log(e);
    }
  };

  const onProductReview = async (articleid) => {
    try {
      if (reviewCheck == "") {
        alert("후기를 선택해주세요");
        return;
      }
      if (
        sessionStorage.getItem("buyer") == undefined ||
        sessionStorage.getItem("buyer") == null
      ) {
        alert("구매자를 선택해 주세요");
        return;
      }
      const data = await axios({
        url: `http://${BACKEND_URL}:8083/productReview`,
        method: "POST",
        data: {
          productId: articleid,
          productReview: reviewCheck,
          buyUserId,
          sellUserId: sessionStorage.getItem("userid"),
        },
      });
      sessionStorage.removeItem("buyer");
      sessionStorage.removeItem("productId");

      // sessionStorage.setItem("productToggle", false);
      setBuyUserId("");
    } catch (e) {
      console.log(e);
    }
  };

  const [reviewCheck, setReviewCheck] = useState("");

  const [psadToggle, setPSadToggle] = useState(false);
  const [psmileToggle, setSmileToggle] = useState(false);
  const [phappyToggle, setHappyToggel] = useState(false);

  const onSad = () => {
    setPSadToggle(true);
    setSmileToggle(false);
    setHappyToggel(false);
    setReviewCheck("별로예요");
  };
  const onSmile = () => {
    setPSadToggle(false);
    setSmileToggle(true);
    setHappyToggel(false);
    setReviewCheck("좋아요");
  };
  const onHappy = () => {
    setPSadToggle(false);
    setSmileToggle(false);
    setHappyToggel(true);
    setReviewCheck("최고예요");
  };

  //여기부터 Jobs
  const [Jpage, setJPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const JhandlePageChange = (page) => {
    setJPage(page);
  };
  const [JpostPerPage] = useState(4);
  const JindexOfLastPost = Jpage * JpostPerPage;
  const JindexOfFirstPost = JindexOfLastPost - JpostPerPage;

  useEffect(() => {
    setCurrentJobs(jobs.slice(JindexOfFirstPost, JindexOfLastPost));
  }, [JindexOfFirstPost, JindexOfLastPost, Jpage]);

  const moveJobs = async (id) => {
    try {
      await axios({
        url: `http://${BACKEND_URL}:8083/jobsCheck/${id}`,
        method: "POST",
      });
    } catch (e) {
      console.log(e);
    }
    navigate(`/jobspost/${id}`);
  };

  const onJobs = (data) => {
    const datas = data.reverse();
    setJobs((prev) => datas);
  };

  // 데이터 불러오기
  useEffect(() => {
    const getData = async () => {
      const userid = sessionStorage.getItem("userid");
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getRealtys/${userid}`,
          method: "post",
        });
        onRealty(data.data);
        setCurrentRealtys(data.data.slice(0, 4));
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getProducts/${userid}`,
          method: "post",
        });

        onProduct(data.data);
        // console.log(data.data);
        setCurrentProducts(data.data.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/getJobs/${userid}`,
          method: "post",
        });
        onJobs(data.data);
        setCurrentJobs(data.data.slice(0, 4));
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <LoginedHeader setLogined={setLogined} />
      <div
        style={{
          width: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            height: "40px",
            borderBottom: "1px #bcbcbc solid",
            borderTop: "1px #bcbcbc solid",
            display: "flex",
          }}
        >
          <ul
            className="flex flex-row items-center gap-5 ml-4"
            style={{
              fontWeight: "bolder",
            }}
          >
            <li>
              <a href="/mypage">내 프로필</a>
            </li>
            <li>
              <a href="/security">보안설정</a>
            </li>
            <li
              style={{
                color: "#ffa445",
              }}
            >
              <a href="/articleControl">게시글 관리</a>
            </li>
            <li>
              <a href="/ChatList">채팅방 목록</a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <button
                onClick={() => {
                  onSpreadProduct();
                }}
                style={{
                  marginBottom: "10px",
                  marginTop: "20px",
                  fontSize: "1.1rem",
                  fontWeight: "bolder",
                }}
              >
                {spreadProduct == false
                  ? "중고거래 마이게시글 펼쳐보기"
                  : "중고거래 마이게시글 접기"}
              </button>
            </li>
            <div>
              {spreadProduct && (
                <ul className="grid grid-cols-4">
                  {currentProducts.map((product, index) => (
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
                              width: "160px",
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
                              paddingBottom: "1rem",
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
                      <div
                        className="font-bold p-1"
                        style={{
                          width: "140px",
                          border: "1px #cccccc solid",
                          textAlign: "center",
                          marginLeft: "10px",
                          position: "relative",
                        }}
                      >
                        {product.productDeal == "판매중" ? (
                          <div>
                            <button
                              style={{}}
                              onClick={() => {
                                onDealToggle();
                                setPnum(product.productId);
                                sessionStorage.removeItem("buyer");
                                setBuyUserId("");
                              }}
                            >
                              거래완료로 변경
                            </button>
                          </div>
                        ) : (
                          <div
                            style={{
                              color: "gray",
                            }}
                          >
                            {product.productDeal}
                          </div>
                        )}
                      </div>
                      {dealToggle && product.productId == pnum ? (
                        <div
                          style={{
                            border: "1px #cccccc solid",
                            backgroundColor: "white",
                            position: "absolute",
                            zIndex: "9",
                          }}
                        >
                          <div className="font-bold flex gap-2 m-2">
                            <span className="flex items-center">
                              {" "}
                              <FiArrowRight />
                            </span>
                            거래 후기 남기기
                          </div>
                          <div
                            className="flex gap-2 p-2"
                            style={{
                              backgroundColor: "#eeeeee",
                            }}
                          >
                            {product.profileImage != null ? (
                              <img
                                src={product.profileImage}
                                alt=""
                                style={{
                                  borderRadius: "15px",
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "fill",
                                  display: "block",
                                }}
                              />
                            ) : (
                              <FaCarrot
                                style={{
                                  color: "#fc9d39",
                                  fontSize: "10rem",
                                  width: "70px",
                                  height: "70px",
                                  transform: "translate(-5% ,-5%)",
                                  border: "0.1px #fc9d39 solid",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                            <div className="flex flex-col justify-center">
                              <span
                                style={{
                                  color: "gray",
                                }}
                              >
                                거래한 상품
                              </span>
                              <div>{product.productSubject}</div>
                            </div>
                          </div>
                          {sessionStorage.getItem("buyer") == undefined ||
                          sessionStorage.getItem("buyer") == null ? (
                            // 구매자 선택창
                            <div className="flex justify-center font-bold p-3">
                              <button
                                onClick={() => {
                                  onChoicePBuyer();
                                  sessionStorage.removeItem("buyer");
                                  setBuyUserId("");
                                }}
                                style={{
                                  border: "1px #cccccc solid",
                                  padding: "5px 10px",
                                  marginTop: "10px",
                                  marginBottom: "-5px",
                                }}
                              >
                                구매자를 선택해주세요!
                              </button>
                            </div>
                          ) : (
                            // 구매자 바로 불러오기
                            <div
                              className=""
                              style={{
                                fontWeight: "bolder",
                                textAlign: "center",
                              }}
                            >
                              "{sessionStorage.getItem("buyer")}"님과
                              <br />
                              거래가 어떠셨나요?
                            </div>
                          )}
                          {choicePBuyer && (
                            <div>
                              {/* 해당 id와 관련된 채팅리스트유저  */}
                              <ul
                                style={{
                                  border: "1px #eeeeee solid",
                                  position: "absolute",
                                  top: "-.3%",
                                  left: "100%",
                                  width: "250px",
                                  height: "333px",
                                  backgroundColor: "white",
                                  overflow: "auto",
                                }}
                              >
                                {pChatList.length == 0 ? (
                                  <div style={{}}>"채팅 내역이 없습니다."</div>
                                ) : (
                                  ""
                                )}
                                {pChatList.map((chat, index) => (
                                  <li
                                    key={index}
                                    style={{
                                      border: "1px #eeeeee solid",
                                    }}
                                  >
                                    {chat.myName ==
                                    sessionStorage.getItem("userid") ? (
                                      <div
                                        style={{
                                          display: "flex",
                                        }}
                                      >
                                        {chat.yourURL == null ? (
                                          <FaCarrot
                                            style={{
                                              color: "#fc9d39",
                                              fontSize: "2.5rem",
                                              transform: "translate(5% ,15%)",
                                              border: "0.1px #fc9d39 solid",
                                              borderRadius: "50%",
                                            }}
                                          />
                                        ) : (
                                          <div
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                              borderRadius: "50%",
                                            }}
                                          >
                                            <img
                                              src={chat.yourURL}
                                              alt=""
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                objectFit: "fill",
                                                borderRadius: "50%",
                                              }}
                                            />
                                          </div>
                                        )}

                                        <div
                                          style={{
                                            border: "1px gray solid",
                                            width: "130px",
                                          }}
                                        >
                                          <div>{chat.yourName}</div>
                                          <div>{chat.lastMessage}</div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          marginLeft: "3px",
                                          display: "flex",
                                        }}
                                      >
                                        {isPChecked && pChatNum == index ? (
                                          //체크상태인 버튼
                                          <button
                                            onClick={() => {
                                              onPCheck();
                                              onPChatNum(index);
                                              setBuyUserId(chat.myName);
                                              sessionStorage.setItem(
                                                "buyer",
                                                chat.myName
                                              );
                                            }}
                                            style={{
                                              width: "30px",
                                              height: "30px",
                                              border: "1px gray solid",
                                              borderRadius: "50%",
                                              marginTop: "10px",
                                            }}
                                          >
                                            <AiOutlineCheck
                                              style={{
                                                marginLeft: "6px",
                                              }}
                                            />
                                          </button>
                                        ) : (
                                          //체크상태가 아닌 버튼들
                                          <button
                                            onClick={() => {
                                              onPCheck();
                                              onPChatNum(index);
                                              setBuyUserId(chat.myName);
                                              sessionStorage.setItem(
                                                "buyer",
                                                chat.myName
                                              );
                                            }}
                                            style={{
                                              width: "30px",
                                              height: "30px",
                                              border: "1px gray solid",
                                              borderRadius: "50%",
                                              marginTop: "10px",
                                            }}
                                          ></button>
                                        )}
                                        {chat.myURL == null ? (
                                          <FaCarrot
                                            style={{
                                              color: "#fc9d39",
                                              fontSize: "2.5rem",
                                              transform: "translate(5% ,15%)",
                                              border: "0.1px #fc9d39 solid",
                                              borderRadius: "50%",
                                            }}
                                          />
                                        ) : (
                                          <div
                                            style={{
                                              width: "50px",
                                              height: "50px",
                                              borderRadius: "50%",
                                            }}
                                          >
                                            <img
                                              src={chat.myURL}
                                              alt=""
                                              style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "block",
                                                objectFit: "fill",
                                                borderRadius: "50%",
                                              }}
                                            />
                                          </div>
                                        )}
                                        <div
                                          className=""
                                          style={{
                                            marginLeft: "3px",
                                          }}
                                        >
                                          <div>{chat.myName}</div>
                                          <div
                                            className="ellipsis_1"
                                            style={{
                                              maxWidth: "140px",
                                              height: "30px",
                                            }}
                                          >
                                            {chat.lastMessage}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div
                            className="flex gap-5 justify-between p-3"
                            style={{
                              fontSize: "2rem",
                            }}
                          >
                            <button
                              onClick={() => {
                                onSad();
                              }}
                            >
                              {psadToggle == true ? (
                                <div
                                  className="flex flex-col items-center "
                                  style={{
                                    color: "#fc9d39",
                                  }}
                                >
                                  <ImSad2
                                    style={{
                                      fontSize: "3.2rem",
                                    }}
                                  />
                                  <span className="text-base">별로예요</span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center ">
                                  <ImSad
                                    style={{
                                      fontSize: "3.2rem",
                                    }}
                                  />
                                  <span className="text-base">별로예요</span>
                                </div>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                onSmile();
                              }}
                            >
                              {psmileToggle == true ? (
                                <div
                                  className="flex flex-col items-center "
                                  style={{
                                    color: "#fc9d39",
                                  }}
                                >
                                  <ImSmile2
                                    style={{
                                      fontSize: "3.2rem",
                                    }}
                                  />
                                  <span className="text-base">좋아요!</span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center ">
                                  <ImSmile
                                    style={{
                                      fontSize: "3.2rem",
                                    }}
                                  />
                                  <span className="text-base">좋아요!</span>
                                </div>
                              )}
                            </button>
                            <button
                              className="flex flex-col items-center gap-1"
                              onClick={() => {
                                onHappy();
                              }}
                            >
                              {phappyToggle == true ? (
                                <div
                                  className="flex flex-col items-center gap-1"
                                  style={{
                                    color: "#fc9d39",
                                  }}
                                >
                                  <ImHappy2
                                    style={{
                                      fontSize: "3.2rem",
                                    }}
                                  />
                                  <span className="text-base">최고예요!</span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center gap-1">
                                  <ImHappy
                                    style={{
                                      fontSize: "3.2rem",
                                    }}
                                  />
                                  <span className="text-base">최고예요!</span>
                                </div>
                              )}
                            </button>
                          </div>

                          <div
                            className=" flex justify-center m-2"
                            style={{
                              backgroundColor: "#fc9d39",
                              color: "white",
                              borderRadius: "5px",
                            }}
                          >
                            <button
                              className="font-bold p-2"
                              style={{
                                width: "100%",
                              }}
                              onClick={() => {
                                onDealToggleOff();
                                sessionStorage.removeItem("productToggle");
                                onProductReview(pnum);
                                onProductNotification();
                              }}
                            >
                              거래 후기 작성 완료
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {spreadProduct && (
              <ProductPaging
                totalCount={product.length}
                page={Ppage}
                postPerPage={PpostPerPage}
                pageRangeDisplayed={5}
                handlePageChange={PhandlePageChange}
              />
            )}
                </ul>
            </div>        
        </div>
      </div>
  );
};

export default ArticleControl;
