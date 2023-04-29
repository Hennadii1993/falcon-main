function formatDay(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = dd + '/' + mm + '/' + yyyy;
    return formattedDate;
  }

  function formatTime(time) {
    let mm = (time.getMinutes()<10?'0':'') + time.getMinutes();
    let hh = (time.getHours()<10?'0':'') + time.getHours();

    return `${hh}:${mm}`;
  }

  export {formatDay, formatTime}