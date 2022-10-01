const addScheduleBtn = document.getElementById("add-schedule-btn");
const closeModalX = document.querySelector("#x-row > span");
const modalArea = document.getElementById("modal-area");
const modalContent = document.querySelector("#modal-area > section");
const modalSubmitBtn = document.getElementById("modal-submit");
const scheduleGrid = document.getElementById("schedule-grid");
const scheduleStatus = document.getElementById("schedule-status");
const saveScheduleBtn = document.getElementById("save-schedule-btn");

// Util
const apiErr = endpoint => console.error(`API /api/${endpoint} failed`);

// Modal
let modalSubmit = () => {};

const hideModal = () => {
  modalArea.classList.remove("flex");
  modalArea.classList.add("hidden");
};
const showModal = submitFunc => {
  modalSubmit = submitFunc;
  modalArea.classList.remove("hidden");
  modalArea.classList.add("flex");
};

modalArea.addEventListener("click", () => hideModal());
modalContent.addEventListener("click", e => e.stopPropagation());
closeModalX.addEventListener("click", () => hideModal());
modalSubmitBtn.addEventListener("click", () => modalSubmit());

// Schedule
const addScheduleRow = scheduleRow => {
  const makeEditableDiv = text => {
    const elem = document.createElement("div");
    elem.contentEditable = true;
    elem.innerHTML = text;
    return elem;
  };
  const dateElem = makeEditableDiv(scheduleRow.date);
  const agendaElem = makeEditableDiv(scheduleRow.agenda);
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("del-btn-container");
  const delBtn = document.createElement("a");
  delBtn.innerHTML = `<span class="del-btn">Delete</span>`;
  delBtn.addEventListener("click", () => {
    dateElem.remove();
    agendaElem.remove();
    btnContainer.remove();
  });
  btnContainer.append(delBtn);
  scheduleGrid.append(dateElem, agendaElem, btnContainer);
};

const createSchedule = () =>
  addScheduleRow({ date: "[Date]", agenda: "[Agenda]" });

addScheduleBtn.addEventListener("click", () => createSchedule());

const refreshSchedule = () => {
  fetch("/api/schedule")
    .then(res => res.json())
    .then(res => {
      if (!res || res.schedule === undefined) {
        apiErr("schedule");
        return;
      }
      scheduleGrid.innerHTML = "";
      res.schedule.forEach(scheduleRow => addScheduleRow(scheduleRow));
    })
    .catch(reason => console.error(reason));
};

refreshSchedule();

const getScheduleRows = () => {
  let rowIndex = 0;
  const scheduleRows = [];
  const scheduleDivs = [...document.querySelectorAll("#schedule-grid > div")];

  for (let i = 0; i < scheduleDivs.length / 3; i++) {
    scheduleRows.push({ date: scheduleDivs[rowIndex].innerHTML });
    rowIndex += 3;
  }

  rowIndex = 1;
  scheduleRows.forEach(row => {
    row.agenda = scheduleDivs[rowIndex].innerHTML;
    rowIndex += 3;
  });

  return scheduleRows;
};

const setSchedule = () => {
  const rows = getScheduleRows();
  const secret = document.getElementById("modal-input").value;
  fetch("/api/schedule/set", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      schedule: rows,
      secret
    })
  })
    .then(res => res.json())
    .then(res => {
      hideModal();
      if (!res || !res.message || !res.status) {
        apiErr("schedule/create");
        return;
      }
      if (res.status === 401) {
        scheduleStatus.innerHTML = `| [Error] Unauthorized to update schedule`;
        return;
      }
      const ts = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York"
      });
      scheduleStatus.innerHTML = `| ✓ Schedule updated on ${ts}`;
    })
    .catch(reason => console.error(reason));
};

saveScheduleBtn.addEventListener("click", () => showModal(setSchedule));
