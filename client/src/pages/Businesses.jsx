import "./businesses.css";

const Businesses = ({ businesses })=> {
  return (
    <div>
      {businesses.map(
        (business) => (<div>{business.name}</div>)
    )}
    </div>
  );
}


export default Businesses;
