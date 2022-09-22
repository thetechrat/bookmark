let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input_btn");
const deleteBtn = document.getElementById("delete_btn");
const saveTab = document.getElementById("save_btn");
const ulEl = document.getElementById("ul-el");

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  renderLeads();
});

saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  ulEl.innerHTML = "";
});

let leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromStorage) {
  myLeads = leadsFromStorage;
  renderLeads();
}

function renderLeads() {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `<li>
      <a target='_blank' href='${myLeads[i]}'>
        ${myLeads[i]}
      </a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

function reply_click(clicked_id) {
  alert(clicked_id);
  let taskId = `${clicked_id}`;
  console.log(taskId);
  let index = tasksDb
    .map(function (x) {
      return x.id;
    })
    .indexOf(taskId);
  console.log(index);
  //document.getElementById(clicked_id).parentElement.style.textDecoration =
  //  "line-through";
}
