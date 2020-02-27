/* eslint-disable prefer-const */

import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let errRate = new Rate("errors");

export let options = {
  vus: 80,
  duration: "30s"
};

export default function () {
  const url = 'http://localhost:3043/api/restaurant/999999';
  check(http.get(url), {
    'status is 200': (r) => r.status === 200,
    'transaction time under 2000ms': (r) => r.timings.duration < 2000
  }) || errRate.add(1);
};
