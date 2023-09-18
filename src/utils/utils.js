export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export const getUniqueGists = (arr) => {
  let array = [];

  arr?.forEach((item) => {
    let exist = array.findIndex((gist) => gist?.id === item?.id);
    if (exist === -1) {
      array.push(item);
    }
  });

  return array;
};
