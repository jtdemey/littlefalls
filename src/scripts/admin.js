const addScheduleBtn = document.getElementById("add-schedule-btn");
const scheduleGrid = document.getElementById("schedule-grid");

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
  //PostCSS ignore?
  btnContainer.classList.add("del-btn-container");
  const delBtn = document.createElement("a");
  delBtn.href = `/api/schedule/remove/${scheduleRow.id}`;
  delBtn.innerHTML = `<span class="del-btn">Delete</span>`;
  btnContainer.append(delBtn);
  scheduleGrid.append(dateElem, agendaElem, btnContainer);
};

const apiErr = endpoint => console.error(`API /api/${endpoint} failed`);

const createSchedule = () => {
  fetch("/api/schedule/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: "[Date]",
      agenda: "[Agenda]"
    })
  })
    .then(res => res.json())
    .then(res => {
      if (!res || !res.status || res.status !== 201) {
        apiErr("schedule/create");
        return;
      }
      //addScheduleRow({})
    })
    .catch(reason => console.error(reason));
};

addScheduleBtn.addEventListener("click", () => createSchedule());

const refreshSchedule = () => {
  fetch("/api/schedule")
    .then(res => res.json())
    .then(res => {
      if (!res || !res.schedule) {
        apiErr("schedule");
        return;
      }
      scheduleGrid.innerHTML = "";
      res.schedule.forEach(scheduleRow => addScheduleRow(scheduleRow));
    })
    .catch(reason => console.error(reason));
};

refreshSchedule();
