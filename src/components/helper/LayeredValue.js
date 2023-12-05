export const splitBaseUlr = ({ fileUrl }) => {
  let fileName = fileUrl.split(process.env.IMAGE_URL);
  if (fileName.length > 1) {
    fileName = fileName[1];
  } else {
    fileName = fileName[0];
  }
  const file = fileName;
  return file;
};
export const layeredValue = ({ item }) => {
  return item.value instanceof Array && item.singleUpload
    ? item.value.length > 0
      ? splitBaseUlr({ fileUrl: item.value[0] })
      : ""
    : item.value instanceof Array &&
      (item.type === "optionsRepeater" || item.isMulti)
    ? item.value.map((val) => splitBaseUlr({ fileUrl: val.value }))
    : item.value instanceof Array && item.type === "uploader"
    ? item.value.map((val) => val.value)
    : item.value instanceof Array
    ? item.value
    : item.value instanceof Object && item.type === "googleLocation"
    ? item.value
    : item.value instanceof Object
    ? item.value.value
    : item.value === null || item.value === undefined
    ? ""
    : item.value;
};
