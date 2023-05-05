import { Button, Col, DatePicker, Form, Input, Row } from "antd";

import { Items } from "../App";
import { Title } from "../title/Title";

interface CheckOutProps {
  display: boolean;
  data: Items[];
  subtotal: number;
  discount: number;
  grandTotal: number;
  onCheckOut: (a: number) => void;
}
const CheckOut: React.FunctionComponent<CheckOutProps> = (props) => {
  const { data, subtotal, discount, grandTotal } = props;

  const [form] = Form.useForm();
  return (
    <div
      className={props.display ? "show" : "hide"}
      style={{ padding: "144px 44px 38px 44px" }}
    >
      <Title text={"Check out"} />
      <div
        style={{
          position: "relative",
          top: -33,
          background: "#fff",
          padding: "50px 25px 0 32px",
        }}
      >
        <Row gutter={52}>
          <Col span={16} style={{ borderRight: "solid 1px #eaedf8" }}>
            <Form form={form} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
              <div className="title-checkout">Billing Detail</div>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="FirstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Input your first name..."
                      bordered={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="LastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Input your last name..."
                      bordered={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                      {
                        validator: (_rule, value, callback) => {
                          try {
                            if (
                              value &&
                              (value.indexOf("@") < 1 ||
                                value.indexOf("@") === value.length - 1)
                            ) {
                              callback(
                                "Please input format email (include '@')"
                              );
                            } else {
                              callback();
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Input your email..." bordered={false} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone"
                    name="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Input your phone..."
                      bordered={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col span={24}>
                  <Form.Item
                    label={
                      <>
                        Address
                        <span style={{ color: "#828282" }}>(Optional)</span>
                      </>
                    }
                    name="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your address!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Input your address..."
                      bordered={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div
                className="title-checkout"
                style={{ borderTop: "solid 1px #EAEDF8" }}
              >
                Payment
              </div>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Card Number"
                    name="CardNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your card number!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="XXXX XXXX XXXX XXXX"
                      bordered={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Name on Card"
                    name="NameonCard"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name on card!",
                      },
                    ]}
                  >
                    <Input placeholder="e.g. DAVID NGUYEN" bordered={false} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Expire Date"
                    name="ExpireDate"
                    rules={[
                      {
                        required: true,
                        message: "Please input expire date!",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{
                        width: "100%",
                      }}
                      placeholder="Input expire date"
                      bordered={false}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Secure Code"
                    name="SecureCode"
                    rules={[
                      {
                        required: true,
                        message: "Please input Secure Code!",
                      },
                    ]}
                  >
                    <Input placeholder="CCV" bordered={false} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={8} style={{ paddingLeft: 60, paddingRight: 28 }}>
            <div
              style={{
                borderBottom: "solid 1px #EAEDF8",
                paddingBottom: 14,
                display: "flex",
                marginBottom: 12,
              }}
            >
              <div className="title-checkout">Order Details</div>
              <span
                className="S20W500"
                style={{
                  margin: "auto 0 auto auto",
                }}
              >{`${data.length} items`}</span>
            </div>
            {data.map((a) => (
              <div style={{ display: "flex", padding: "10px 0" }}>
                <div className="S20W500">{a.title}</div>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    margin: "auto 0 auto auto",
                  }}
                >{`$${a.price}`}</span>
              </div>
            ))}
            <div
              className="S20W500"
              style={{
                borderTop: "solid 1px #EAEDF8",
                padding: "17px 0",
                display: "flex",
                marginTop: 12,
              }}
            >
              Apply Promotion code
            </div>
            <div>
              <Input
                placeholder="Promotion code"
                bordered={false}
                style={{ width: "calc(100% - 133px)", height: 45 }}
              />
              <Button
                type="primary"
                style={{
                  paddingTop: 1,
                  width: 133,
                  height: 45,
                  fontSize: 18,
                  fontWeight: 700,
                  borderRadius: 5,
                }}
              >
                Apply
              </Button>
            </div>
            <div style={{ display: "flex", padding: "28px 0 6px 0" }}>
              <div className="S20W500" style={{ color: "#828282" }}>
                Subtotal
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  margin: "auto 0 auto auto",
                }}
              >{`$${subtotal}`}</span>
            </div>
            <div
              style={{
                display: "flex",
                padding: "6px 0 13px 0",
                borderBottom: "solid 1px #EAEDF8",
              }}
            >
              <div className="S20W500" style={{ color: "#828282" }}>
                Discount
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  margin: "auto 0 auto auto",
                }}
              >{`-$${discount}`}</span>
            </div>
            <div
              style={{
                display: "flex",
                padding: "23px 0",
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                TOTAL
              </div>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  margin: "auto 0 auto auto",
                }}
              >{`$${grandTotal}`}</span>
            </div>
            <Button
              type="primary"
              style={{
                width: "100%",
                height: 60,
                fontSize: 18,
                fontWeight: 700,
              }}
              onClick={() => {
                form
                  .validateFields()
                  .then(() => {
                    props.onCheckOut(3);
                  })
                  .catch((e) => console.log(e));
              }}
            >
              Place Order
            </Button>
            <div
              style={{
                marginTop: 19,
                display: "flex",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              <span>I’ve read and accept the&nbsp;</span>
              <a style={{ textDecoration: "underline" }}>Terms</a>
            </div>
          </Col>
        </Row>
        <div style={{ marginBottom: 32, display: "inline-block" }}></div>
      </div>
    </div>
  );
};
export default CheckOut;
