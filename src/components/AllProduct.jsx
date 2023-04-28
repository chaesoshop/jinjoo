import React from "react";
import Header from "../layouts/Header";
import LoginedHeader from "../layouts/LoginedHeader";
import Footer from "../layouts/Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCarrot } from "react-icons/fa";
import ProductPaging from "./ProductPaging";
import "../styles/Pagination.css";
import { BACKEND_URL } from "../config/config";

const AllProduct = ({ logined, setLogined }) => {
  //useState의 괄호 안은 초기 상태 값을 인수로 전달받음, 지금은 없는 상태
  //최신상태를 유지하는 값(posts)와 그 값을 업데이트 해주는 함수(setPosts)를 반환
  //이렇게 useState를 통해 반환된 첫 번째 값인 posts 변수에는 항상
  //최신의 값이 저장되게 됨
  const [posts, setPosts] = useState([]); //게시물들
  const [page, setPage] = useState(1); //페이지
  const [currentPosts, setCurrentPosts] = useState([]); //현재의 포스팅 된 게시물
  //여기까지 각각 독립된 여러개의 state 변수로 나누어 관리하는 방법 사용
  
  //아래는 페이지 변경 시, setPage로 값을 받아 Page를
  //업데이트 해주고 다음 페이지로 넘어갈 수 있게해줌
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [postPerPage] = useState(8);
  const indexOfLastPost = page * postPerPage; //마지막 글 = 생성된 페이지 * 페이지 당 게시글 수
  const indexOfFirstPost = indexOfLastPost - postPerPage; //첫번째 글 = 마지막 글 순서 - 페이지 당 게시글 수

  const onProduct = (data) => {
    const datas = data.reverse();
    setPosts((prev) => datas);
    //위의 prev는 임시저장공간임
    //datas의 값을 prev라는 임시저장공간에 담음
    //임시저장공간에 단긴 prev에 +1 후 다시 임시저장공간에 담음
    //같은 방식으로 물건이 올라가면 prev에 담기고 setPosts에 저장된 뒤,
    //렌더링되어서 posts에 물건이 등록되고 저장됨
  };
  //   npm i react-js-pagination
  //useEffect는 받은 인수를 통해 컴포넌트가 렌더링된 이후에 호출되는데
  //이때 받은 함수는 외부 시스템과 연결할 수 있고, 해당 시스템과
  //연결을 종료할 수 있음(정리함수를 반환)
  useEffect(() => {
    const onSubmit = async () => {
      try {
        const data = await axios({ 
          //data 프로퍼티를 사용하는 axio를 사용하여 HTTP 비동기 통신 라이브러리
          url: `http://${BACKEND_URL}:8083/`,
          method: "GET",
        });
        onProduct(data.data);

        setCurrentPosts(data.data.slice(0, 8));
      } catch (e) {
        console.log(e);
      }
    };
    onSubmit();
  }, []);

  //다른 물품으로 이동 시, 각 게시물의 id를 확인하고 그 게시물을 자세히
  //볼 수 있는 화면으로 이동함
  //useNavigation을 사용하여 이벤트 발생 시, url을 조작하여
  //게시된 게시물들 중 찾는 id로 이동할 수 있도록 해주었음
  useEffect(() => {
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost, page]);
  const navigate = useNavigate();
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

  if (logined) {
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
            className="mt-1"
            style={{
              width: "100%",

              height: "120px",
            }}
          >
            <div
              style={{
                transform: "translate(10%,10%)",
                display: "inline-block",
                width: "90px",
                textAlign: "center",
                marginLeft: "2.5rem",
                backgroundColor: "#fc9d39",
                borderRadius: "10px",
                height: "55px",
              }}
            >
              <a
                href="/productWrite"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    paddingTop: "5px",
                  }}
                >
                  중고매물
                  <br />
                  거래하기
                </div>
              </a>
            </div>
            <h1
              style={{
                fontSize: "1.7rem",
                fontWeight: "bolder",
                textAlign: "center",
                margin: "0 auto",
                display: "inline",
                paddingLeft: "14rem",
                position: "relative",
              }}
            >
              중고거래 모든 매물보기
            </h1>

            <h2
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "1.3rem",
                transform: "translateX(%)",
              }}
            >
              <a href="/hot_articles">＞ 인기매물 보러가기</a>
            </h2>
          </div>
          <div
            className="container"
            style={{
              width: "800px",

              margin: "0 auto",
            }}
          >
            <ul className="grid grid-cols-4">
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
                          fontSize: "0.8rem",
                          color: "gray",
                        }}
                      >
                        <span>관심 {product.productLike}</span>
                        &nbsp; ·&nbsp;
                        <span>채팅 {product.productChatting}</span>
                      </div>
                      {product.productDeal == "거래 완료" ? (
                        <div
                          style={{
                            border: "1px gray solid",
                            margin: "10px 0px",
                          }}
                        >
                          <span>거래 완료</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ProductPaging
            totalCount={posts.length}
            page={page}
            postPerPage={postPerPage}
            pageRangeDisplayed={5}
            handlePageChange={handlePageChange}
          />
        </div>
        <div
          style={{
            height: "300px",
            backgroundColor: "#f3f6f4",
            marginTop: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "1.4rem",
              fontWeight: "bolder",
              padding: "4rem",
              textAlign: "center",
            }}
          >
            더 구경하고 싶나요?
          </h1>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <span>당근마켓 앱에서 따뜻한 거래를 직접 경험해보세요!</span>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <a
              href="#"
              style={{
                backgroundColor: "#faa64f",
                marginTop: "10px",
                padding: "10px 30px",
                fontSize: "1.5rem",
                borderRadius: "10px",
                fontWeight: "bolder",
                color: "white",
              }}
            >
              App Store
            </a>
            <a
              href="#"
              style={{
                backgroundColor: "#faa64f",
                marginTop: "10px",
                padding: "10px 20px",
                fontSize: "1.5rem",
                borderRadius: "10px",
                marginLeft: "20px",
                fontWeight: "bolder",
                color: "white",
              }}
            >
              Google Play
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <div
          style={{
            width: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            className="mt-1"
            style={{
              width: "100%",

              height: "120px",
            }}
          >
            <div
              style={{
                transform: "translate(10%,10%)",
                display: "inline-block",
                width: "90px",
                textAlign: "center",
                marginLeft: "2.5rem",
                backgroundColor: "#fc9d39",
                borderRadius: "10px",
                height: "55px",
              }}
            >
              <a
                href="/productWrite"
                style={{
                  color: "white",
                  fontWeight: "bolder",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    paddingTop: "5px",
                  }}
                >
                  중고매물
                  <br />
                  거래하기
                </div>
              </a>
            </div>
            <h1
              style={{
                fontSize: "1.7rem",
                fontWeight: "bolder",
                textAlign: "center",
                margin: "0 auto",
                display: "inline",
                paddingLeft: "14rem",
                position: "relative",
              }}
            >
              중고거래 모든 매물보기
            </h1>

            <h2
              style={{
                textAlign: "center",
                fontWeight: "bolder",
                fontSize: "1.3rem",
                transform: "translateX(%)",
              }}
            >
              <a href="/hot_articles">＞ 인기매물 보러가기</a>
            </h2>
          </div>
          <div
            className="container"
            style={{
              width: "800px",

              margin: "0 auto",
            }}
          >
            <ul className="grid grid-cols-4">
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
                          fontSize: "0.8rem",
                          color: "gray",
                        }}
                      >
                        <span>관심 {product.productLike}</span>
                        &nbsp; ·&nbsp;
                        <span>채팅 {product.productChatting}</span>
                      </div>
                      {product.productDeal == "거래 완료" ? (
                        <div
                          style={{
                            border: "1px gray solid",
                            margin: "10px 0px",
                          }}
                        >
                          <span>거래 완료</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <ProductPaging
            totalCount={posts.length}
            page={page}
            postPerPage={postPerPage}
            pageRangeDisplayed={5}
            handlePageChange={handlePageChange}
          />
        </div>
        <div
          style={{
            height: "300px",
            backgroundColor: "#f3f6f4",
            marginTop: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "1.4rem",
              fontWeight: "bolder",
              padding: "4rem",
              textAlign: "center",
            }}
          >
            더 구경하고 싶나요?
          </h1>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <span>당근마켓 앱에서 따뜻한 거래를 직접 경험해보세요!</span>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <a
              href="#"
              style={{
                backgroundColor: "#faa64f",
                marginTop: "10px",
                padding: "10px 30px",
                fontSize: "1.5rem",
                borderRadius: "10px",
                fontWeight: "bolder",
                color: "white",
              }}
            >
              App Store
            </a>
            <a
              href="#"
              style={{
                backgroundColor: "#faa64f",
                marginTop: "10px",
                padding: "10px 20px",
                fontSize: "1.5rem",
                borderRadius: "10px",
                marginLeft: "20px",
                fontWeight: "bolder",
                color: "white",
              }}
            >
              Google Play
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default AllProduct;
