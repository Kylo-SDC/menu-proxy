
import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";


export let errRate = new Rate("errors");

export let options = {
  vus: 100,
  duration: "30s"
};

export default function () {
  const url = 'http://localhost:3043/api/menu/9000000/';
  const data = JSON.stringify({ menuName: "space food", menuDescription: "star dust, apple pie, and candy canes" });
  const headers =  { headers: { "Content-Type": "application/json" } };

  check(http.post(url, data, headers), {
    'status is 200': (r) => r.status === 200,
    'transaction time under 2000ms': (r) => r.timings.duration < 2000
  }) || errRate.add(1);
};
