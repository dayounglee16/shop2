import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, minus, removeItem } from "../store";
import styled from "styled-components";

// const Child = memo(() => { //사용 시 memo import 하기
//   console.log("리렌더링");
//   return <div>자식요소</div>;
// });

const Cart = () => {
  const state = useSelector((state) => state); //매개변수로 넘겨주는 state는 전체 state를 불러옴
  const dispatch = useDispatch(); //store.jsx 요청을 보내주는 함수

  return (
    <>
      <Margin>
        {state.user.name} {state.user.age}의 장바구니
      </Margin>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => {
                    dispatch(addCount(state.cart[i].id)); //dispatch(state변경함수())
                  }}
                >
                  +1
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    dispatch(minus(state.cart[i].id)); //dispatch(state변경함수())
                  }}
                >
                  -1
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        variant="secondary"
        onClick={() => dispatch(removeItem(state.cart.id))}
      >
        삭제
      </Button>
    </>
  );
};

const Margin = styled.h4`
  margin: 50px 30px;
`;

export default Cart;
