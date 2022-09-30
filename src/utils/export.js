import Blob from "blob";
import XLSX from "xlsx";

function getDownload(data, titles = [], filename = "data", suffix = "csv") {
  let blod = null;
  if (suffix == "csv") {
    let dataType = Object.keys(data[0]) + "\n";
    for (let item of data) {
      let row = "";
      for (let element in item) {
        row += item[element] ? item[element] + "," : "" + ",";
      }

      dataType += row + "\r\n";
    }

    blod = new Blob([dataType], {
      type: "application/csv"
    });
  } else if (suffix == "xlsx") {
    const defaultStyle = {};

    let ws = XLSX.utils.json_to_sheet(data);
    // const wb = { SheetNames: ["Sheet1"], Sheets: {}, Props: {} };
    // wb.Sheets['Sheet1']=ws

    var wbo = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbo, ws, "第一页");
    blod = XLSX.writeFile(wbo, "sheet.xlsx");
    // 这里时纯原生下载excel;

    /* blod = new Blob(s, {
      type: "application/xlsx",
    });
    console.log(blod,"444")*/
  }

  let a = document.createElement("a");
  let url = window.URL.createObjectURL(blod);
  a.href = url;
  a.download = `${filename}.${suffix}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export { getDownload };
