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


module.exports = { createReview, fetchReview };