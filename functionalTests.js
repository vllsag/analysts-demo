import { check,sleep,fail } from"k6";
import { Counter} from 'k6/metrics';
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const CounterErrors = new Counter('Errors');

export const options = {
  thresholds: {
    'Errors': ['count<1'],
  },
};


export default function() {
  let res;
  res =  http.get(`${__ENV.API_URL}`)
  const contentNOK = res.status === 200;
  CounterErrors.add(!contentNOK);
};

export function handleSummary(data) {
  return {
    "summary-functional.html": htmlReport(data),
  };
}