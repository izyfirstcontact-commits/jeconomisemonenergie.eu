import { NextRequest, NextResponse } from "next/server"

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"
const USER_AGENT = "Jeconomisemonenergie.eu address autocomplete"

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? ""

  if (query.length < 2 || query.length > 120) {
    return NextResponse.json({ suggestions: [] })
  }

  try {
    const upstreamUrl = new URL(NOMINATIM_URL)
    upstreamUrl.searchParams.set("format", "jsonv2")
    upstreamUrl.searchParams.set("q", `${query}, Belgium`)
    upstreamUrl.searchParams.set("countrycodes", "be")
    upstreamUrl.searchParams.set("addressdetails", "1")
    upstreamUrl.searchParams.set("limit", "5")

    const response = await fetch(upstreamUrl, {
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      return NextResponse.json({ suggestions: [] }, { status: 502 })
    }

    const results: unknown = await response.json()
    if (!Array.isArray(results)) {
      return NextResponse.json({ suggestions: [] }, { status: 502 })
    }

    const suggestions = results.map((item: Record<string, any>) => ({
      label: typeof item.display_name === "string" ? item.display_name : "",
      value: typeof item.display_name === "string" ? item.display_name : "",
      road: item.address?.road || item.address?.pedestrian || item.address?.footway || "",
      postcode: item.address?.postcode || "",
      city: item.address?.city || item.address?.town || item.address?.village || item.address?.municipality || "",
    })).filter((item) => item.label)

    return NextResponse.json({ suggestions }, { headers: { "Cache-Control": "private, max-age=30, stale-while-revalidate=60" } })
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 502 })
  }
}
