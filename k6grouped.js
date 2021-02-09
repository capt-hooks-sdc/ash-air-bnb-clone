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
  let res = http.get(`http://localhost:3000/photos2?property=${random}`, {
    tags: { name: 'Photo Query Split' }
  });

  errorRate.add(res.status >= 400);
}

/*
     data_received..............: 61 MB  406 kB/s
     data_sent..................: 5.8 MB 38 kB/s
     dropped_iterations.........: 324    2.159725/s
     errorRate..................: 0.00%  ✓ 0     ✗ 55489
     http_req_blocked...........: avg=5.03µs  min=1µs      med=2µs    max=674µs    p(90)=3µs    p(95)=6µs
     http_req_connecting........: avg=1.9µs   min=0s       med=0s     max=426µs    p(90)=0s     p(95)=0s
     http_req_duration..........: avg=3.93ms  min=827µs    med=2.04ms max=362.8ms  p(90)=4.16ms p(95)=5.99m
     http_req_receiving.........: avg=22.26µs min=8µs      med=18µs   max=1.14ms   p(90)=37µs   p(95)=48µs
     http_req_sending...........: avg=12.28µs min=5µs      med=10µs   max=452µs    p(90)=19µs   p(95)=27µs
     http_req_tls_handshaking...: avg=0s      min=0s       med=0s     max=0s       p(90)=0s     p(95)=0s
     http_req_waiting...........: avg=3.9ms   min=803µs    med=2.01ms max=362.76ms p(90)=4.11ms p(95)=5.91m
     http_reqs..................: 55489  369.879559/s
     iteration_duration.........: avg=4.03ms  min=873.73µs med=2.12ms max=362.88ms p(90)=4.33ms p(95)=6.19m
     iterations.................: 55489  369.879559/s
     vus........................: 138    min=100 max=138
     vus_max....................: 138    min=100 max=138
*/