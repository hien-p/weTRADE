const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/request", (req, res) => {
  const { input } = req.body;
  let resp = {};
  switch (input) {
    case "Get wecoin token info":
      resp = {
        action: "call",
        type: "query",
        args: {
          token_info: {},
        },
        message: "Here is the token info",
      };
      break;
    case "Increase counter":
      resp = {
        action: "call",
        type: "execute",
        args: {
          increment: {},
        },
        message: "Counter incremented",
      };
      break;
    default:
      break;
  }
  res.json(resp);
});

const port = process.env.PORT | 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
