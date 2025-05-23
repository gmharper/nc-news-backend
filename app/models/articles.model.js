const db = require("../../db/connection");

const queryAllArticles = (sort = "created_at", order = "DESC", topic) => {
  const Sorts = [
    "article_id",
    "title",
    "topic",
    "author",
    "votes",
    "comment_count",
    "created_at",
  ];
  const Orders = ["ASC", "DESC"];
  const Topics = ["mitch", "coding", "football", "cooking"];

  if (sort && !Sorts.includes(sort)) {
    return Promise.reject({ status: 400, msg: "Invalid Sort" });
  }
  if (order && !Orders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid Order" });
  }
  if (topic && !Topics.includes(topic)) {
    return Promise.reject({ status: 400, msg: "Invalid Topic" });
  }

  let queryStr = `SELECT * FROM articles`;

  if (topic && Topics.includes(topic)) {
    queryStr += ` WHERE topic='${topic}'`;
  }
  if (Sorts.includes(sort) && Orders.includes(order.toUpperCase())) {
    queryStr += ` ORDER BY ${sort} ${order}`;
  }
  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

const queryArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      return result.rows[0];
    });
};

const updateArticleVotes = (article_id, votes) => {
  return db
    .query(
      "UPDATE articles SET votes=votes+$2 WHERE article_id = $1 RETURNING *",
      [article_id, votes]
    )
    .then((result) => {
      return result.rows[0];
    });
};

const deleteFromArticles = (article_id) => {
  return db.query("DELETE FROM articles WHERE article_id = $1 RETURNING *", [
    article_id,
  ]);
};

module.exports = {
  queryAllArticles,
  queryArticleById,
  updateArticleVotes,
  deleteFromArticles,
};
