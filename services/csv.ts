const csvToJson = (csv) => {
  const separator = ",";
  var array = csv.toString().split("\n");
  let result = [];
  let headers = array[0].split(separator);

  for (let i = 1; i < array.length - 1; i++) {
    let obj = {};
    let str = array[i];
    let s = "";
    let flag = 0;

    for (let ch of str) {
      if (ch === '"' && flag === 0) {
        flag = 1;
      } else if (ch === '"' && flag == 1) flag = 0;
      if (ch === separator && flag === 0) ch = "|";
      if (ch !== '"') s += ch;
    }

    let properties = s.split("|");

    for (let j in headers) {
      obj[headers[j]] = properties[j];
    }

    result.push(obj);
  }

  return result;
};

export { csvToJson };
