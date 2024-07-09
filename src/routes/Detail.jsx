import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { addItem } from "../store";

const Detail = ({ shoes }) => {
  const { id } = useParams(); // URL 파라미터(/:id)를 가져오는 함수
  const products = shoes.find((product) => product.id === parseInt(id));
  const [alert, setAlert] = useState(true); // 2초후에 사라지는 alertBox
  const [tab, setTab] = useState(0); //tab 기능
  const dispatch = useDispatch();

  useEffect(() => {
    let 꺼낸거 = localStorage.getItem("watched");
    꺼낸거 = JSON.parse(꺼낸거);
    꺼낸거.push(products.id);

    꺼낸거 = new Set(꺼낸거);
    꺼낸거 = Array.from(꺼낸거);
    localStorage.setItem("watched", JSON.stringify(꺼낸거));
  });

  useEffect(() => {
    const a = setTimeout(() => {
      setAlert(false);

      return () => {
        // 소멸되기 전에 사라짐
        clearTimeout(a);
      };
    }, 2000);
  }, []);

  return (
    <div className="container">
      {alert === true ? (
        <div style={{ background: "lightYellow", padding: "15px" }}>
          2초이내 사라지는 팝업창 입니다.
        </div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (products.id + 1) +
              ".jpg"
            }
            alt="White and Black"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-5">
          <h4 className="pt-5">{products.title}</h4>
          <p>{products.content}</p>
          <p>{products.price}원</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({
                  id: products.title,
                  name: products.content,
                  count: products.price,
                })
              );
              console.log(addItem);
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
};

const TabContent = ({ tab }) => {
  const [fade, setFade] = useState(""); //초기값 빈 문자열
  useEffect(() => {
    setTimeout(() => {
      //0.1초 후에 class end를 fade안에 넣기
      setFade("end");
    }, 100);
    return () => {
      setFade(""); // useEffect코드 실행 전에 end의 값이 ''로 된다
    };
  }, [tab]);

  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
};
export default Detail;
