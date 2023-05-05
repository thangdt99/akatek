import "./title.scss";
export const Title: React.FunctionComponent<{ text: string }> = (props) => {
  return (
    <div className="title">
      <div className="border"></div>
      <span className="text">{props.text}</span>
    </div>
  );
};
