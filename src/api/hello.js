export default async function handler(req, res) {
  // CORS 설정 (필요할 경우)
  res.setHeader("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS 요청 처리 (CORS 사전 요청)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // 실제 API 로직
  res.status(200).json({ message: "Hello from Vercel Serverless Function!" });
}
