import { Suspense, createContext, lazy, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import data from "./data";
import Card from "./components/Card";

//성능개선 lazy 문법
const Detail = lazy(() => import("./routes/Detail"));
const Cart = lazy(() => import("./routes/Cart"));

export const Context1 = createContext();

function App() {
  const [shoes, setShoes] = useState(data); //신발 상품 데이터 3개
  const [재고] = useState([10, 11, 12]);
  const navigate = useNavigate(); // 페이지 이동을 도와주는 함수

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  //react-query 사용
  let result = useQuery("작명", () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      return a.data;
    })
  );

  const fileData = (number) => {
    axios
      .get(`https://codingapple1.github.io/shop/data${number}.json`)
      .then((result) => {
        const copy = [...shoes, ...result.data];
        setShoes(copy);
      });
  };

  const onClickAddItems = () => {
    if (shoes.length === 3) {
      fileData(2);
    } else if (shoes.length === 6) {
      fileData(3);
    } else if (shoes.length === 9) {
      alert("상품이 없습니다");
    }
  };

  return (
    <div className="App">
      {/* Navbar 시작 */}
      <Navbar bg="dark" variant="dark">
        <Container style={{ cursor: "pointer" }}>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            ShoeShop {/** 메인로고 버튼*/}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home {/** 메인페이지 Home버튼*/}
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart {/** 서브페이지 Cart버튼*/}
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto" style={{ color: "#fff" }}>
            {result.isLoading && "로딩중"}
            {result.error && "Error"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      {/* Navbar 종료 */}

      {/* 메인페이지 상품 시작*/}
      <Suspense fallback={<div>로딩 중 입니다 ...</div>} variant="dark">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>
                <Container style={{ cursor: "pointer" }}>
                  <div className="container">
                    <div className="row">
                      {shoes.map((a) => {
                        return <Card shoes={a} i={a.id} key={a.id} />;
                      })}
                    </div>
                  </div>

                  <Button variant="secondary" onClick={() => onClickAddItems()}>
                    더보기
                  </Button>
                </Container>
              </>
            }
          />
          {/* 메인페이지 상품 종료 */}

          {/*상품정보 페이지*/}
          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          {/*장바구니페이지*/}
          <Route path="cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
