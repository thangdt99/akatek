import { Button, Input, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

import { Items } from "../App";
import { Title } from "../title/Title";

interface ShoppingCartProps {
  display: boolean;
  data: Items[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  onRemove: (data: Items[]) => void;
  onCheckOut: (a: number) => void;
}
const ShoppingCart: React.FunctionComponent<ShoppingCartProps> = (props) => {
  const { data, subtotal, discount, grandTotal } = props;
  const column: ColumnsType<Items> = [
    {
      title: <span style={{ fontSize: 30, fontWeight: 700 }}>Items</span>,
      dataIndex: "title",
      key: "title",
      render: (value, record, index) => {
        return record.typeGroup ? (
          <div
            style={
              index !== 0
                ? {
                    borderTop: "solid 1px #F2F2F2",
                    marginTop: 21,
                    paddingTop: 22,
                  }
                : {}
            }
          >
            <span
              style={{
                fontSize: 30,
              }}
            >
              {record.typeGroup}
            </span>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                width: "278px",
                height: "190px",
                backgroundColor: "gray",
                marginRight: 32,
              }}
            >
              {record.imageUrl && (
                <img
                  style={{ width: "278px", height: "190px" }}
                  src={process.env.PUBLIC_URL + "/image.png"}
                ></img>
              )}
            </div>
            <div>
              <div
                style={{
                  margin: "15px 0",
                  color: "#133788",
                  fontSize: 25,
                }}
              >
                {record.title}
              </div>
              {record.series && (
                <p
                  style={{
                    marginBottom: 0,
                    fontSize: 18,
                    lineHeight: 1.4,
                  }}
                >{`Series: ${record.series}`}</p>
              )}
              {record.subject && (
                <p
                  style={{
                    marginBottom: 0,
                    fontSize: 18,
                    lineHeight: 1.4,
                  }}
                >{`Subject: ${record.subject}`}</p>
              )}
              {record.author && (
                <p
                  style={{
                    marginBottom: 0,
                    fontSize: 18,
                    lineHeight: 1.4,
                  }}
                >{`${record.author}`}</p>
              )}
              {record.description && (
                <p
                  style={{
                    marginTop: "10px",
                    marginBottom: 0,
                    color: "#828282",
                    fontSize: 16,
                    lineHeight: "18px",
                  }}
                >{`${record.description}`}</p>
              )}
            </div>
            {/* {Object.keys(record).map((a) => (
                  <p>{`${a}: ${record[a as keyof Items]}`}</p>
                ))} */}
          </div>
        );
      },
      onCell: (record) => {
        return record.typeGroup ? { colSpan: 3 } : {};
      },
    },
    {
      title: <></>,
      dataIndex: "price",
      key: "price",
      width: 250,
      render: (value, record, index) => <></>,
      onCell: (record) => {
        return record.typeGroup ? { colSpan: 0 } : {};
      },
    },
    {
      title: <span style={{ fontSize: 30, fontWeight: 700 }}>Price</span>,
      dataIndex: "price",
      key: "price",
      width: 200,
      render: (value, record, index) =>
        !record.typeGroup && (
          <div style={{ fontSize: 25 }}>
            <span>{`$${record.price}`}</span>
            <span
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => {
                const dataFilter = data.filter((a) => a.id !== record.id);
                props.onRemove(dataFilter);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="#828282"
                />
              </svg>
            </span>
          </div>
        ),
      onCell: (record) => {
        return record.typeGroup ? { colSpan: 0 } : {};
      },
    },
  ];
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
    <div
      className={props.display ? "show" : "hide"}
      style={{ padding: "144px 44px 38px 44px" }}
    >
      <Title text={"Shopping Cart"} />
      <div
        style={{
          position: "relative",
          top: -33,
          background: "#fff",
          padding: "50px 25px 0 32px",
        }}
      >
        <Table
          className="table"
          style={{
            padding: "0 41px 0 67px",
          }}
          dataSource={ItemAndGroup}
          columns={column}
          pagination={false}
        />
        <table
          style={{
            tableLayout: "auto",
            width: "100%",
            textAlign: "left",
            margin: "38px 0",
          }}
        >
          <colgroup>
            <col></col>
            <col style={{ width: "250px" }}></col>
            <col style={{ width: "226px" }}></col>
          </colgroup>
          <tbody>
            <tr
              className="heightTr"
              style={{
                backgroundColor: "#F2F2F2",
              }}
            >
              <td></td>
              <td>
                <div
                  style={{
                    fontSize: 20,
                  }}
                >
                  Subtotal
                </div>
              </td>
              <td
                style={{ fontWeight: 700, fontSize: "25px" }}
              >{`$${subtotal}`}</td>
            </tr>
            <tr className="heightTr">
              <td>
                <div
                  style={{
                    display: "flex",
                    margin: "30px 98px 30px 83px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 20,
                      whiteSpace: "nowrap",
                      marginRight: 32,
                    }}
                  >
                    Apply Promotion code
                  </span>
                  <Input
                    placeholder="Promotion code"
                    bordered={false}
                    style={{ width: "calc(100% - 458px)" }}
                  />
                  <Button
                    type="primary"
                    style={{
                      marginLeft: 29,
                      width: 174,
                      height: 44,
                      fontSize: 18,
                      fontWeight: 700,
                      borderRadius: 5,
                    }}
                  >
                    Apply Code
                  </Button>
                </div>
              </td>
              <td>
                <div style={{ fontSize: 20 }}>Discount</div>
              </td>
              <td
                style={{ fontWeight: 700, fontSize: "25px" }}
              >{`-$${discount}`}</td>
            </tr>
            <tr
              className="heightTr"
              style={{
                backgroundColor: "#F2F2F2",
              }}
            >
              <td></td>
              <td>
                <div
                  style={{
                    fontSize: 20,
                  }}
                >
                  GRAND TOTAL
                </div>
              </td>
              <td
                style={{ fontWeight: 700, fontSize: "25px" }}
              >{`$${grandTotal}`}</td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            marginBottom: 21,
            width: "100%",
            display: "inline-block",
          }}
        >
          <Button
            type="primary"
            style={{
              margin: "0 35px 0 auto",
              display: "block",
              width: 215,
              height: 60,
              fontSize: 20,
              fontWeight: 700,
              borderRadius: 5,
            }}
            onClick={() => {
              props.onCheckOut(2);
            }}
          >
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
