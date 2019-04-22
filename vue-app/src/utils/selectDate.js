export default function getSelectDate(sYear) {
  const startYear = Number(sYear || 1960);
  const yearArr = [];
  const monthArr = [];
  const dateArr = [];
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDate = now.getDate();
  for (let i = startYear; i < nowYear; i += 1) {
    yearArr.push({
      id: i,
      value: i,
    });
  }
  for (let i = startYear; i < nowYear; i += 1) {
    for (let j = 1; j <= 12; j += 1) {
      monthArr.push({
        id: `${i}-${j}`,
        value: j,
        parentId: i,
      });
    }
  }
  monthArr.forEach((item) => {
    if (/(1|3|5|7|8|10|12)$/.test(item.value)) {
      for (let i = 1; i <= 31; i += 1) {
        dateArr.push({
          id: `${item.id}-${i}`,
          value: i,
          parentId: item.id,
        });
      }
    } else if (/(4|6|9|11)$/.test(item.value)) {
      for (let i = 1; i <= 30; i += 1) {
        dateArr.push({
          id: `${item.id}-${i}`,
          value: i,
          parentId: item.id,
        });
      }
    } else if (/2/.test(item.value)) {
      const year = item.id.substr(0, 4);
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        for (let i = 1; i <= 29; i += 1) {
          dateArr.push({
            id: `${item.id}-${i}`,
            value: i,
            parentId: item.id,
          });
        }
      } else {
        for (let i = 1; i <= 28; i += 1) {
          dateArr.push({
            id: `${item.id}-${i}`,
            value: i,
            parentId: item.id,
          });
        }
      }
    }
  });
  yearArr.push({
    id: nowYear,
    value: nowYear,
  });
  for (let i = 1; i < nowMonth; i += 1) {
    monthArr.push({
      id: `${nowYear}-${i}`,
      value: i,
      parentId: nowYear,
    });
    if (/(1|3|5|7|8|10|12)$/.test(i)) {
      for (let j = 1; j <= 31; j += 1) {
        dateArr.push({
          id: `${nowYear}-${i}-${j}`,
          value: j,
          parentId: `${nowYear}-${i}`,
        });
      }
    } else if (/(4|6|9|11)$/.test(i)) {
      for (let j = 1; j <= 30; j += 1) {
        dateArr.push({
          id: `${nowYear}-${i}-${j}`,
          value: j,
          parentId: `${nowYear}-${i}`,
        });
      }
    } else if (/2/.test(i)) {
      const year = nowYear;
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        for (let j = 1; j <= 29; j += 1) {
          dateArr.push({
            id: `${nowYear}-${i}-${j}`,
            value: j,
            parentId: `${nowYear}-${i}`,
          });
        }
      } else {
        for (let j = 1; j <= 28; j += 1) {
          dateArr.push({
            id: `${nowYear}-${i}-${j}`,
            value: j,
            parentId: `${nowYear}-${i}`,
          });
        }
      }
    }
  }
  monthArr.push({
    id: `${nowYear}-${nowMonth}`,
    value: nowMonth,
    parentId: nowYear,
  });
  for (let i = 1; i <= nowDate; i += 1) {
    dateArr.push({
      id: `${nowYear}-${nowMonth}-${i}`,
      value: i,
      parentId: `${nowYear}-${nowMonth}`,
    });
  }
  return {
    yearArr,
    monthArr,
    dateArr,
    nowYear,
    nowMonth,
    nowDate };
}
