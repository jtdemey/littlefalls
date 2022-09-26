const scheduleGrid = document.getElementById("schedule-grid");

fetch("/api/schedule").then(res => res.json()).then(res => {
  if (!res || !res.schedule) {
    console.error(`API /api/schedule failed`);
    return;
  };
  scheduleGrid.innerHTML = "";

  const makeEditableDiv = text => {
    const elem = document.createElement("div");
    elem.contentEditable = true;
    elem.innerHTML = text;
    return elem;
  };
  res.schedule.forEach(scheduleRow => {
    const dateElem = makeEditableDiv(scheduleRow.date);
    const agendaElem = makeEditableDiv(scheduleRow.agenda);
    scheduleGrid.append(dateElem, agendaElem);
  });
});
