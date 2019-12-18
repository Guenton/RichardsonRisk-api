// Rest API error handler and responds with 500 error
const errhandler = (err, res) => {
  console.error(err);
  res.status(500).send("A Server error has occured");
};

module.exports = errhandler;
