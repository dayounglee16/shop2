import { useNavigate } from "react-router-dom";

// 신발 상품 3개 메인페이지에 보여질 내용
const Card = ({ shoes, i }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + (i + 1) + ".jpg"}
        width="80%"
        alt=""
        onClick={() => {
          navigate(`/detail/${shoes.id}`);
        }}
      />
      <h4>{shoes.title}</h4>
      <h6>{shoes.content}</h6>
      <p>{shoes.price}원</p>
    </div>
  );
};

export default Card;
