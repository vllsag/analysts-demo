import { sleep } from"k6";
import http from "k6/http";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  duration: "1m",
  vus: 100,
  thresholds: {
	http_req_failed: ['rate<0.01'],
    http_req_duration: ["p(95)<500"] // 95 percent of response times must be below 500ms
  }
};

export default function() {
  http.get(`https://analystsdemo.apigw-aw-eu.webmethods.io/gateway/Governed%20Petstore/1.0.6/pet/1`)	
  sleep(3);
};

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
