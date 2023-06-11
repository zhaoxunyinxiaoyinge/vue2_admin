import XLSX from "xlsx";
function readData(file, callback) {
  let files = new FileReader(file);
  files.onload = (e) => {
    let result = e.target.result;
    let workbook = XLSX.read(result, { type: "binary" });
    callback(workbook);
  };
  files.readAsBinaryString(file);
}

function readBook(workbook) {
  let sheetsName = workbook.SheetNames;
  let sheetFirst = workbook.Sheets[sheetsName[0]];
  let json = XLSX.utils.sheet_to_json(sheetFirst);
  return json;
}

export { readBook, readData };
