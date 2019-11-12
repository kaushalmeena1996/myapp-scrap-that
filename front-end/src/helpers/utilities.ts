import IResult from "../types/result";
import IInput from "../types/input";
import IRule from "../types/rule";
import { VALIDATION_TYPES } from "../constants/types";
import get from "lodash/get";

export const generateUniqueKey = () =>
  Math.random()
    .toString(36)
    .substr(2);

export const getData = (data: object, path: string, value: any = undefined) =>
  get(data, path, value) || value;

export const validateInput = (value: string = "", rules: IRule[] = []) => {
  let message = "";
  let regex;
  let i;

  for (i = 0; i < rules.length; i++) {
    switch (rules[i].type) {
      case VALIDATION_TYPES.REQUIRED:
        regex = new RegExp(".+");
        break;
      case VALIDATION_TYPES.URL:
        regex = new RegExp("^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$");
        break;
      default:
        break;
    }
    if (regex && regex.test(value) === false) {
      message = rules[i].message;
      break;
    }
  }

  return message;
};

export const formatHeading = (
  format: string,
  inputs: IInput[]
): string => {
  if (inputs) {
    return format.replace(/{[\w-]+}/g, function (match: string) {
      return inputs[Number.parseInt(match.slice(1, -1))].value || "undefined";
    });
  } else {
    return "undefined";
  }
};

export const downloadAsJSON = (results: IResult[]) => {
  let mergedResult;
  let JSONResult;
  let finalResult;

  mergedResult = mergeResults(results);
  JSONResult = convertToJSON(mergedResult);
  finalResult = JSON.stringify(JSONResult);

  download("scraped_results.json", finalResult);
};

export const downloadAsCSV = (results: IResult[]) => {
  let mergedResult;
  let JSONResult;
  let finalResult;

  mergedResult = mergeResults(results);
  JSONResult = convertToJSON(mergedResult);
  finalResult = convertToCSV(JSONResult);

  download("scraped_results.csv", finalResult);
};

function convertToJSON(result: IResult) {
  let JSONResult: any[] = [];
  let tempObject: any;
  let i;
  let j;

  for (i = 0; i < result.data.length; i++) {
    tempObject = {};
    for (j = 0; j < result.data[i].length; j++) {
      tempObject[result.fields[j]] = result.data[i][j];
    }
    JSONResult.push(tempObject);
  }

  return JSONResult;
}

function convertToCSV(result: any[]) {
  let header: string[] = [];
  let CSVResult;

  header = Object.keys(result[0]);

  CSVResult = result.map(row =>
    header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(",")
  );
  CSVResult.unshift(header.join(","));
  CSVResult = CSVResult.join("\r\n");

  return CSVResult;
}

function mergeResults(results: IResult[]) {
  const mergedResult: any = { fields: [], data: [] };
  let i;
  let j;

  for (i = 0; i < results.length; i++) {
    for (j = 0; j < results[i].fields.length; j++) {
      mergedResult.fields.push(results[i].fields[j]);
    }
    for (j = 0; j < results[i].data.length; j++) {
      if (mergedResult.data[j] === undefined) {
        mergedResult.data.push(results[i].data[j]);
        while (mergedResult.data[j].length !== mergedResult.fields.length) {
          mergedResult.data[j].unshift(null);
        }
      } else {
        mergedResult.data[j] = mergedResult.data[j].concat(results[i].data[j]);
      }
    }
  }

  return mergedResult;
}

function download(filename: string, text: string) {
  const element = document.createElement("a");

  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
}

const replacer = (key: string, value: string) =>
  value === null ? "" : value;

