let array = [];
let currVal = document.getElementById("count_per_page").value;
let sort = document.getElementById("sort").value;
let filter = document.getElementById("fname").value;

initPag();

function initPag() {
  let data = {
    list: 1,
    count:currVal,
    sort:sort,
    filter:filter
  };
  sendToServer(data);
}

document.getElementById("count_per_page").onchange = function (event) {
  currVal = document.getElementById("count_per_page").value;
  initPag();
};

document.getElementById("sort").onchange = function (event) {
  sort = document.getElementById("sort").value;
  initPag();
};


document.getElementById("fname").onchange = function (event) {
  filter = document.getElementById("fname").value;
  initPag();
};

function sendToServer(json) {
  $.post("http://localhost:3000/", json).done(function (data) {
    console.log(data);

        drawPagin(data);

  });
}

function drawPagin(data) {
  console.log(data);

  let count = data.count;
  let outHtml = ""

  for (let i = 1; i <= count; i++) {
    if(data.currVal == i){
      outHtml += `<li class="page-item active"><a class="page-link">${i}</a></li>`;
    }else{
      outHtml += `<li class="page-item"><a class="page-link">${i}</a></li>`;
    }

  }

  document.getElementById("pagination").innerHTML = outHtml;
  printData(data.array)
  $(".page-item").click(function (event) {
    event.preventDefault();
    let data = {
      list: event.target.innerHTML,
      count:currVal,
      sort:sort,
      filter:filter
    };
    sendToServer(data);
  });
}

function printData(array) {
  let outHtml = "<table id = 'customers'  >   <tr><th>ID</th><th>Name</th><th>Cost</th><th>Power</th></tr>";
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    outHtml += "<tr>";
    outHtml += `<td>${array[i].id}</td>`;
    outHtml += `<td>${array[i].name}</td>`;
    outHtml += `<td>${array[i].cost}</td>`;
    outHtml += `<td>${array[i].power}</td>`;
    outHtml += "</tr>";
  }
  outHtml += "</table>";
  document.getElementById("result").innerHTML = outHtml;
}
