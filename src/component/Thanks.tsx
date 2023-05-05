import { Button } from "antd";

interface ThanksProps {
  display: boolean;
  onCheckOut: (a: number) => void;
}
const Thanks: React.FunctionComponent<ThanksProps> = (props) => {
  return (
    <div
      className={props.display ? "show" : "hide"}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "inline-block", marginTop: 134 }}>
        <img
          style={{ width: "441px", height: "322px" }}
          src={"/Frame.png"}
        ></img>
      </div>
      <div
        style={{
          display: "inline-block",
          fontWeight: 700,
          fontSize: 40,
          marginBottom: 28,
          marginTop: 37,
        }}
      >
        Thank you for your purchase!
      </div>
      <div style={{ display: "inline-block", fontWeight: 400, fontSize: 25 }}>
        Your order number is #STE1587975295
      </div>
      <div style={{ display: "inline-block", fontWeight: 400, fontSize: 25 }}>
        We will email you an order confirmation with details.
      </div>
      <div style={{ display: "inline-block" }}>
        <Button
          type="primary"
          style={{
            fontWeight: 700,
            fontSize: 30,
            marginBottom: 156,
            width: 410,
            height: 78,
            marginTop: 28,
          }}
          onClick={() => {
            props.onCheckOut(1);
          }}
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  );
};
export default Thanks;
