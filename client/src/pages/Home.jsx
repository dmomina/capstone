const Home = ({ auth, authAction, logout, businesses, users, reviews }) => {
  return (
    <div>
      <h1>Welcome to the greates site to find out about businesses</h1>
      <p>
        Congrat to Top Rated Business {}!
        <br/>
        Display some interesting information about our {businesses.length}{" "}
        Businesses
        <br />
        Display some interesting information about our {users.length} Users
        <br />
        Display some interesting information about our {reviews.length} Reviews
      </p>
    </div>
  );
};

export default Home;
