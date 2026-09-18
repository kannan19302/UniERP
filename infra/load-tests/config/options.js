const DEFAULT_THRESHOLDS = {
  http_req_duration: [
    { threshold: 'p(95)<2000', abortOnFail: true },
    { threshold: 'p(99)<5000', abortOnFail: false },
  ],
  http_req_failed: [
    { threshold: 'rate<0.01', abortOnFail: true },
  ],
};

const DEFAULT_SUMMARY_TRENDS = ['avg', 'min', 'med', 'max', 'p(50)', 'p(90)', 'p(95)', 'p(99)'];

export function baseOptions(customOpts = {}) {
  return Object.assign({}, {
    thresholds: DEFAULT_THRESHOLDS,
    summaryTrendStats: DEFAULT_SUMMARY_TRENDS,
    noConnectionReuse: false,
    userAgent: 'UniERP-k6-load-test/1.0',
    tags: { project: 'unerp', test_suite: 'load-test' },
  }, customOpts);
}
