export const config = {
  runtime: "edge", // Edge Functions로 설정
};

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  const url = `https://stdict.korean.go.kr/api/search.do?key=9685DE18F33A035667C656E856E9C401&type_search=search&req_type=json&q=${query}`;

  try {
    const apiResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer 9685DE18F33A035667C656E856E9C401`,
      },
    });

    if (!apiResponse.ok) {
      return new Response(
        JSON.stringify({ error: `API error: ${apiResponse.status}` }),
        {
          headers: { "Content-Type": "application/json" },
          status: apiResponse.status,
        }
      );
    }

    const data = await apiResponse.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
