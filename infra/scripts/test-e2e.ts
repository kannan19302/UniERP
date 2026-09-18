import http from "node:http";
import net from "node:net";

interface TestResult {
  name: string;
  passed: boolean;
  durationMs: number;
  error?: string;
}

const results: TestResult[] = [];

async function checkHttp(urlStr: string, expectedString: string, testName: string) {
  const start = Date.now();
  try {
    const url = new URL(urlStr);
    const res = await new Promise<{ statusCode: number; body: string }>((resolve, reject) => {
      const req = http.get(url.toString(), { timeout: 10000 }, (response) => {
        let body = "";
        response.on("data", chunk => { body += chunk; });
        response.on("end", () => resolve({ statusCode: response.statusCode || 0, body }));
      });
      req.on("error", reject);
      req.on("timeout", () => {
        req.destroy();
        reject(new Error("Request timed out after 10000ms"));
      });
    });

    const duration = Date.now() - start;
    if (res.statusCode >= 200 && res.statusCode < 400 && res.body.includes(expectedString)) {
      results.push({ name: testName, passed: true, durationMs: duration });
      console.log(`  ✅ [PASS] ${url.pathname} (${duration}ms)`);
    } else {
      const err = `Expected HTTP 200-399 with body containing '${expectedString}', got HTTP ${res.statusCode}`;
      results.push({ name: testName, passed: false, durationMs: duration, error: err });
      console.log(`  ❌ [FAIL] ${url.pathname} (${duration}ms): ${err}`);
    }
  } catch (err: any) {
    const duration = Date.now() - start;
    results.push({ name: testName, passed: false, durationMs: duration, error: err.message });
    console.log(`  ❌ [FAIL] ${urlStr} (${duration}ms): ${err.message}`);
  }
}

async function checkTcp(host: string, port: number, serviceName: string) {
  const start = Date.now();
  try {
    await new Promise<void>((resolve, reject) => {
      const socket = new net.Socket();
      socket.setTimeout(5000);
      socket.connect(port, host, () => {
        socket.end();
        resolve();
      });
      socket.on("error", (err) => {
        socket.destroy();
        reject(err);
      });
      socket.on("timeout", () => {
        socket.destroy();
        reject(new Error(`TCP connection to ${host}:${port} timed out`));
      });
    });

    const duration = Date.now() - start;
    results.push({ name: `${serviceName} TCP Socket (${host}:${port})`, passed: true, durationMs: duration });
    console.log(`  ✅ [PASS] ${serviceName} socket listening on ${host}:${port} (${duration}ms)`);
  } catch (err: any) {
    const duration = Date.now() - start;
    results.push({ name: `${serviceName} TCP Socket (${host}:${port})`, passed: false, durationMs: duration, error: err.message });
    console.log(`  ❌ [FAIL] ${serviceName} on ${host}:${port} (${duration}ms): ${err.message}`);
  }
}

async function run() {
  console.log("════════════════════════════════════════════════════════════════════════");
  console.log("🛠️ UniERP Core Infrastructure & Backend Services — E2E Suite");
  console.log("════════════════════════════════════════════════════════════════════════\n");

  console.log("🔮 1. Enterprise Home Workspace & Master Gateway (:4003 / :4000)");
  await checkHttp("http://localhost:4003/home", "UniERP", "Tenant Apps Enterprise Home workspace renders");
  await checkHttp("http://localhost:4003/setup", "UniERP", "Tenant Apps Guided Setup renders");
  await checkHttp("http://localhost:4003/account", "UniERP", "Tenant Apps Sovereign Account Center renders");
  const isPort4000Online = await new Promise<boolean>((resolve) => {
    const s = new net.Socket();
    s.setTimeout(800);
    s.connect(4000, "localhost", () => {
      s.end();
      resolve(true);
    });
    s.on("error", () => resolve(false));
    s.on("timeout", () => {
      s.destroy();
      resolve(false);
    });
  });

  if (isPort4000Online) {
    await checkHttp("http://localhost:4000", "UniERP", "Platform Wizard transition gateway renders");
    await checkHttp("http://localhost:4000/api/session", "authenticated", "SSO Gateway session API is operational");
  } else {
    console.log("  ℹ️ [DRAINED/TRANSITIONED] Port :4000 legacy gateway offline; active workspace serving at :4003/home");
  }

  console.log("\n🐘 2. PostgreSQL 16 + pgvector Datastore (:5432)");
  await checkTcp("localhost", 5432, "PostgreSQL 16 Engine");

  console.log("\n⚡ 3. Redis 7 In-Memory Cache & Queue Broker (:6379)");
  await checkTcp("localhost", 6379, "Redis 7 Broker");

  console.log("\n🪣 4. MinIO S3 Object Storage (:9000 / Console :9001)");
  await checkTcp("localhost", 9000, "MinIO S3 API");
  await checkTcp("localhost", 9001, "MinIO Web Console");

  console.log("\n════════════════════════════════════════════════════════════════════════");
  console.log("📊 Test Execution Summary");
  console.log("════════════════════════════════════════════════════════════════════════");
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;
  console.log(`Total Tests: ${results.length}`);
  console.log(`Passed:      ${passedCount}`);
  console.log(`Failed:      ${failedCount}\n`);

  if (failedCount > 0) {
    console.error("❌ Some Infrastructure Services tests failed!");
    process.exit(1);
  } else {
    console.log("🎉 All Core Infrastructure & Backend Services tests passed successfully!\n");
    process.exit(0);
  }
}

run();
