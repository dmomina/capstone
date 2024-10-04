const { client } = require("./client");

const createReview = async (
    userid,
    {
        businessid,
        text,
        rating,
    }
) => {
    try {
        const SQL = `INSERT INTO reviews(userid, businessid, text, rating) VALUES($1, $2, $3, $4) RETURNING *`;
        const response = await client.query(SQL, [
            userid,
            businessid,
            text,
            rating,
        ]);
        return response.rows[0];
    } catch (err) {
        console.log(err);
    };
};

const fetchReview= async () => {
    const SQL = `SELECT userid, businessid, text, rating FROM reviews;`;
    const response = await client.query(SQL);
    return response.rows;
  };

const fetchBusinessReview = async (businessid) => {
    const SQL = `
        SELECT reviews.id, reviews.text, reviews.rating, reviews.userid, reviews.businessid 
        FROM reviews 
        JOIN business ON reviews.businessid = business.id 
        WHERE business.id = $1
    `;
    const response = await client.query(SQL, [businessid]);
    return response.rows;
}

const fetchUserReviews = async (userid) => {
    const SQL = `
        SELECT reviews.id, reviews.text, reviews.rating, reviews.userid, reviews.businessid 
        FROM reviews
        JOIN users ON reviews.userid = users.id
        WHERE users.id = $1
    `;
    const response = await client.query(SQL, [userid]);
    return response.rows;
}

module.exports = { createReview, fetchReview, fetchBusinessReview, fetchUserReviews };