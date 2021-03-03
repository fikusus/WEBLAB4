const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
let rawdata = fs.readFileSync("data.json");

let array = JSON.parse(rawdata).steamers;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/public", express.static("public"));

app.get("/", async (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/", urlencodedParser, async (req, res) => {
  console.log(req.body);
  let temp = await sorting(await crearArray(array, req.body.filter),req.body.sort)
      let count = Math.ceil(temp.length / req.body.count);
      console.log(await crearArray(array, req.body.filter));

      let out = {
        type: "changeList",
        count: count,
        array: await openList(req.body.list, req.body.count, temp),
        currVal:req.body.list
      };
      res.send(out);

});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function openList(list, currVal, carray) {
  let out = [];
  let end = list * currVal;
  if (end > carray.length) {
    end = carray.length;
  }
  let begin = (list - 1) * currVal;

  console.log(begin + " " + end);
  for (let i = begin; i < end; i++) {
    out.push(carray[i]);
  }

  return out;
}

async function sorting(array, type) {

  arrayCopy = [];

  for (i = 0; i < array.length; i++) {
    arrayCopy[i] = array[i];
  }
  switch (type) {
    case "ID":
      return await arrayCopy.sort(compareId);
      break;
    case "Name":
      return await arrayCopy.sort(compareName);
      break;
    case "Cost":
      return await arrayCopy.sort(compareCost);
      break;
    case "Power":
      return await arrayCopy.sort(comparePower);
      break;
  }
}


async function crearArray(array, filter) {

  arrayCopy = [];
  let reg = `^${filter}`;
  for (i = 0; i < array.length; i++) {
    if(array[i].name.match(reg))
    arrayCopy.push(array[i]);
  } 
  return arrayCopy;
}

function compareId(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}

function compareName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function compareCost(a, b) {
  if (a.cost < b.cost) {
    return 1;
  }
  if (a.cost > b.cost) {
    return -1;
  }
  return 0;
}

function comparePower(a, b) {
  if (a.power < b.power) {
    return 1;
  }
  if (a.power > b.power) {
    return -1;
  }
  return 0;
}
