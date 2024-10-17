import TopRatedBusiness from "../../components/TopRatedBusiness/TopRatedBusiness";
import "./home.css"
const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {

  return (
    <div className="home-container">
      <h1>Welcome to the greatest site to find out about businesses</h1>
      <TopRatedBusiness businesses={businesses}/>
      <p>
        Our platform currently features {businesses.length} active businesses.
        <br />
        We are proud to serve a community of {users.length} active users.
        <br />
      </p>
    </div>
  );
};

export default Home;
