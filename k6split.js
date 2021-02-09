import { Rate } from  'k6/metrics';
import http from 'k6/http';

let errorRate = new Rate('errorRate');

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 500,
      stages: [
        { target: 10, duration: '30s' },
        { target: 100, duration: '30s' },
        { target: 500, duration: '30s' },
        { target: 750, duration: '30s' },
        { target: 1000, duration: '30s' },
      ]
    }
  }
};

export default function () {
  let random = Math.floor(Math.random() * 10000000) + 1;
  let res = http.get(`http://localhost:3000/photos?property=${random}`, {
    tags: { name: 'Photo Query Split' }
  });

  errorRate.add(res.status >= 400);
}

/*
     data_received..............: 61 MB  406 kB/s
     data_sent..................: 5.7 MB 38 kB/s
     dropped_iterations.........: 343    2.286282/s
     errorRate..................: 0.00%  ✓ 0     ✗ 55470
     http_req_blocked...........: avg=4.97µs  min=1µs      med=2µs    max=1.58ms   p(90)=3µs    p(95)=6µs
     http_req_connecting........: avg=1.89µs  min=0s       med=0s     max=491µs    p(90)=0s     p(95)=0s
     http_req_duration..........: avg=3.95ms  min=638µs    med=1.58ms max=442.4ms  p(90)=4.06ms p(95)=5.56m
     http_req_receiving.........: avg=22.1µs  min=10µs     med=18µs   max=898µs    p(90)=36µs   p(95)=46µs
     http_req_sending...........: avg=12.34µs min=4µs      med=10µs   max=462µs    p(90)=19µs   p(95)=28µs
     http_req_tls_handshaking...: avg=0s      min=0s       med=0s     max=0s       p(90)=0s     p(95)=0s
     http_req_waiting...........: avg=3.91ms  min=614µs    med=1.55ms max=442.35ms p(90)=3.99ms p(95)=5.49m
     http_reqs..................: 55470  369.737716/s
     iteration_duration.........: avg=4.04ms  min=691.54µs med=1.65ms max=442.49ms p(90)=4.24ms p(95)=5.75m
     iterations.................: 55470  369.737716/s
     vus........................: 153    min=100 max=153
     vus_max....................: 153    min=100 max=153
*/