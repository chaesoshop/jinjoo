import { useState } from "react";
import Header from "../layouts/Header";
import LoginedHeader from "../layouts/LoginedHeader";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import "../styles/Home.css";
import Footer from "../layouts/Footer";
import { AiFillHome, AiFillFileText, AiFillMessage } from "react-icons/ai";
import { useEffect } from "react";
import { FaCarrot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

const Home = ({ logined, setLogined }) => {
  const [hotSearch, setHotSearch] = useState([]);
  const [hotProduct, setHotProduct] = useState([]);
  const [post, setPost] = useState([]);

  const navigate = useNavigate();
  const onProduct = (data) => {
    const datas = data.reverse();
    setPost((prev) => datas);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://${BACKEND_URL}:8083/hotProduct`,
          method: "GET",
        });
        onProduct(data.data);
        setHotProduct(data.data.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
    };
    getData();

    const getHotSearch = async () => {
      try {
        const data1 = await axios({
          url: `http://${BACKEND_URL}:8083/getHotSearch`,
          method: "GET",
        });

        setHotSearch(data1.data.reverse().slice(0, 10));
      } catch (e) {
        console.log(e);
      }
    };
    getHotSearch();
  }, []);

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
  if (logined == "true") {
    return (
      <div>
        <LoginedHeader setLogined={setLogined} />
        <div className="background1">
          <div className=" flex items-center">
            <div
              className="flex gap-2"
              style={{
                width: "1000px",
                margin: "0 auto",
              }}
            >
              <div className="flex justify-center flex-col">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "300px",
                    }}
                  >
                    당신 근처의
                  </div>
                  <div>당근마켓</div>
                </div>
                <div
                  className="mt-8"
                  style={{
                    width: "330px",
                  }}
                >
                  <div>중고 거래부터 동네 정보까지, 이웃과 함께해</div>
                  <div>가깝고 따듯한 당신의 근처를 만들어요.</div>
                </div>
              </div>
              <div>
                <div className="firstimg flex items-center">
                  <img
                    src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-d6869a79bc4cb58ea59aa5a408decfdf4a4ba60ac639837081da12861083cdbb.webp"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="flex items-center">
          <div
            className="flex gap-6"
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div className="secondimg mt-2 flex items-center">
              <img
                src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-cc678e9a217b96f5cb459f7f0684f5ba67706f9889801618b8cf879fbc2c0ea7.webp"
                alt=""
              />
            </div>
            <div className="flex justify-center flex-col">
              <div
                className="font-bold"
                style={{
                  width: "400px",
                  fontSize: "2.5rem",
                }}
              >
                <div>우리 동네</div>
                <div>중고 직거래 마켓</div>
              </div>
              <div
                className="my-9"
                style={{
                  width: "420px",
                }}
              >
                동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
              </div>
              <div className="font-bold flex justify-center">
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`/hot_articles`}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    인기매물 보기
                  </a>
                </div>
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`/trust`}
                    style={{
                      padding: "10px 20px",

                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    믿을 수 있는 중고거래
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="background2 flex">
          <div
            className="flex "
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              className="flex justify-center flex-col pr-10"
              style={{
                width: "450px",
              }}
            >
              <div
                className="font-bold"
                style={{
                  fontSize: "2.3rem",
                }}
              >
                <div>이웃과 함께하는</div>
                <div>동네생활</div>
              </div>

              <ul
                className="flex mt-11 gap-8"
                style={{
                  fontSize: "0.75rem",
                  width: "480px",
                }}
              >
                
              </ul>
            </div>
            <div className="thirdimg relative">
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "5%",
                  left: "10%",
                }}
              >
                <img
                  src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-2-91a2286453bdf82dea16a7f0ee4ceb9dd325eae0e5a2a9967ba72c344bf8f2fc.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <div className="section-Box flex flex-row">
          <div className="imgBox-1">
            <img
              src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-3-5fd6fb61d603ab919a45566b2ea6b505c83a93ec218f34ddcd5cb482543e2317.webp"
              alt=""
            />
          </div>
          <div className="flex-grow empty-Box"></div>
          <div className="flex flex-col justify-center">
          </div>
        </div>
        <div style={{ backgroundColor: "#efefef", minWidth: "1090px" }}>
          <div className="section-Box1 ">
            <div>
              <ul className="grid grid-cols-4">
                {hotProduct.map((product, index) => (
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
                                transform: "translate(-5%, -5%)",
                                border: "0.1px #fc9d39 solid",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </div>
                        <div
                          className="ellipsis_1"
                          style={{
                            width: "200px",
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
                          className="flex mt-1"
                          style={{
                            fontSize: "0.8rem",
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
            </div>
            <div
              style={{
                textDecoration: "underline",
                fontSize: "1.1rem",
                fontWeight: "bold",
                textAlign: "center",
                margin: "0 auto",
                marginTop: "20px",
              }}
            >
              <a href={`${BACKEND_URL}:3000/hot_articles`}>인기매물 더 보기</a>
            </div>
          </div>
        </div>
        <div className="searchWordBox">
          <div
            className="mt-8"
            style={{
              fontWeight: "bolder",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            <a href="#">중고거래 인기검색어</a>
          </div>
          <ul className="flex flex-raw gap-10 align-center justify-center mt-8 hotissueBox">
            {hotSearch.map((search, index) => (
              <li key={index}>
                <a href={`search/${search.searchWord}`}>{search.searchWord}</a>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="background1">
          <div className=" flex items-center">
            <div
              className="flex gap-2"
              style={{
                width: "1000px",
                margin: "0 auto",
              }}
            >
              <div className="flex justify-center flex-col">
                <div
                  className="font-bold"
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "400px",
                    }}
                  >
                    안전하고 편리한 거래,
                  </div>
                  <div>채소마켓</div>
                </div>
                <div
                  className="mt-8"
                  style={{
                    width: "330px",
                  }}
                >
                  <div>블록체인으로</div>
                  <div>놀라운 거래를 경험해 보세요</div>
                </div>
              </div>
              <div>
                <div className="firstimg flex items-center"
                  style={{
                    marginLeft: "100px",
                  }}
                >
                  <img
                    src="img/intro.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="flex items-center">
          <div
            className="flex gap-6"
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div className="secondimg mt-2 flex items-center">
              <img
                src="img/tr.png"
                alt=""
              />
            </div>
            <div className="flex justify-center flex-col">
              <div
                className="font-bold"
                style={{
                  width: "400px",
                  fontSize: "2.5rem",
                }}
              >
                <div>멀리 살아도</div>
                <div>편하게 중고거래</div>
              </div>
              <div
                className="my-9"
                style={{
                  width: "420px",
                }}
              >
                온라인 거래도 걱정 없이 진행할 수 있어요
              </div>
              <div className="font-bold flex justify-center">
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`/hot_articles`}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    인기매물 보기
                  </a>
                </div>
                <div
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href={`/trust`}
                    style={{
                      padding: "10px 20px",

                      borderRadius: "10px",
                    }}
                    className="mr-8 bg-gray-200"
                  >
                    믿을 수 있는 중고거래
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="background2 flex">
          <div
            className="flex "
            style={{
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              className="flex justify-center flex-col pr-10"
              style={{
                width: "450px",
              }}
            >
              <div
                className="font-bold"
                style={{
                  fontSize: "2.3rem",
                }}
              >
                <div>궁금한 건</div>
                <div>채소톡으로</div>
              </div>

              <h1 className="py-5">
                물건에 대해 궁금한 게 있다면 채소톡으로 물어봐요
              </h1>
              <ul
                className="flex mt-11 gap-8"
                style={{
                  fontSize: "0.75rem",
                  width: "480px",
                }}
              >
                <li>
                  <div
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    <AiFillMessage />
                  </div>
                  <div className="font-bold mb-2 mt-3">구매자</div>
                  <span>물건의 상태는 어떤가요?</span>
                </li>
              </ul>
            </div>
            <div className="thirdimg relative">
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "20%",
                  left: "10%",
                }}
              >
                <img
                  src="img/chat.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <div style={{ backgroundColor: "#efefef", minWidth: "1090px" }}>
          <div className="section-Box1 ">
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "2.5rem",
                display: "flex",
                justifyContent: "center",
                padding: "4rem 0",
              }}
            >
              <h1>중고거래 인기매물</h1>
            </div>
            <div>
              <ul className="grid grid-cols-4">
                {hotProduct.map((product, index) => (
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
                                transform: "translate(-5%, -5%)",
                                border: "0.1px #fc9d39 solid",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </div>
                        <div
                          className="ellipsis_1"
                          style={{
                            width: "200px",
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
                          className="flex mt-1"
                          style={{
                            fontSize: "0.8rem",
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
            </div>
            <div
              style={{
                textDecoration: "underline",
                fontSize: "1.1rem",
                fontWeight: "bold",
                textAlign: "center",
                margin: "0 auto",
                marginTop: "20px",
              }}
            >
              <a href={`${BACKEND_URL}:3000/hot_articles`}>인기매물 더 보기</a>
            </div>
          </div>
        </div>
        <div className="searchWordBox">
          <div
            className="mt-8"
            style={{
              fontWeight: "bolder",
              textAlign: "center",
              textDecoration: "underline",
            }}
          >
            <a href="#">중고거래 인기검색어</a>
          </div>
          <ul className="flex flex-raw gap-10 align-center justify-center mt-8 hotissueBox">
            {hotSearch.map((search, index) => (
              <li key={index}>
                <a href={`search/${search.searchWord}`}>{search.searchWord}</a>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
};

export default Home;
