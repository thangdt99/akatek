import "./App.css";
import "./title/title.scss";
import "antd/dist/antd.css";

import { Button } from "antd";
import React from "react";

import CheckOut from "./component/CheckOut";
import ShoppingCart from "./component/ShoppingCart";
import Thanks from "./component/Thanks";

export interface Items {
  id: number;
  price: number;
  title: string;
  type: string;
  imageUrl?: string;
  description?: string;
  series?: string;
  subject?: string;
  author?: string;
  typeGroup?: string;
}
const dataFake: Items[] = [
  {
    id: 1,
    price: 150,
    title: "Grade 1: Video 1",
    series: "A",
    subject: "Math",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    imageUrl: "https://www.image1",
    type: "Professional Development Videos",
  },
  {
    id: 2,
    price: 150,
    title: "Grade 2: Video 2",
    series: "B",
    subject: "May",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    imageUrl: "https://www.image2",
    type: "Professional Development Videos",
  },
  {
    id: 3,
    price: 150,
    title: "Text Book 1",
    author: "David Khalifa",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    imageUrl: "https://www.image3",
    type: "Textbooks",
  },
  {
    id: 4,
    price: 150,
    title: "Text Book 2",
    author: "David Khalifa",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy...Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    imageUrl: "https://www.image4",
    type: "Textbooks",
  },
];
function subtotalCalculate(arr: Items[]) {
  return arr.reduce((total, value) => {
    total = total + value.price;
    return total;
  }, 0);
}
const App: React.FunctionComponent<{}> = (props) => {
  const [data, setData] = React.useState<Items[]>(dataFake);
  const [checkOut, setCheckOut] = React.useState<number>(1);
  const [subtotal, setSuntotal] = React.useState<number>(
    subtotalCalculate(data)
  );
  const [discount, setDiscount] = React.useState<number>(40);
  const [grandTotal, setGrandTotal] = React.useState<number>(
    subtotal - discount > 0 ? subtotal - discount : 0
  );

  const groupByItem = data.reduce((dataConvert, value) => {
    dataConvert[value.type]
      ? dataConvert[value.type].push(value)
      : (dataConvert[value.type] = [value]);
    return dataConvert;
  }, {} as { [key: string]: Items[] });
  const ItemAndGroup: any[] = [];
  for (let key in groupByItem) {
    ItemAndGroup.push({ typeGroup: key }, ...groupByItem[key]);
  }
  return (
    <div className="App">
      <header className="App-header"></header>
      <div className={`container ${checkOut === 3 ? "thank" : ""}`}>
        <Thanks onCheckOut={(a) => setCheckOut(a)} display={checkOut === 3} />
        <CheckOut
          data={data}
          subtotal={subtotal}
          discount={discount}
          grandTotal={grandTotal}
          onCheckOut={(a) => setCheckOut(a)}
          display={checkOut === 2}
        />
        <ShoppingCart
          data={data}
          subtotal={subtotal}
          discount={discount}
          grandTotal={grandTotal}
          onCheckOut={(a) => setCheckOut(a)}
          display={checkOut === 1}
          onRemove={(data) => {
            setData(data);
            const subtotal = subtotalCalculate(data);
            setSuntotal(subtotal);
            setGrandTotal(subtotal - discount > 0 ? subtotal - discount : 0);
          }}
        />
      </div>
      <div className={`footer ${checkOut === 3 ? "thank" : ""}`}></div>
    </div>
  );
};

export default App;
