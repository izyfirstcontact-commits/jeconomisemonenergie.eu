import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { computeSavings, formatEUR, getScoreLabel } from "@/lib/savings"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const bill = Number(searchParams.get("bill")) || 150
  const estimate = computeSavings(bill)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0c2818",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "64px",
          justifyContent: "space-between",
        }}
      >
        {/* Marque */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 28, color: "#86efac" }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#16a34a",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            J
          </div>
          <span style={{ display: "flex" }}>Jeconomisemonenergie.eu</span>
        </div>

        {/* Score */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ display: "flex", fontSize: 34, color: "#86efac" }}>{getScoreLabel(estimate.score)}</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span style={{ display: "flex", fontSize: 180, fontWeight: 700, lineHeight: 1, color: "#22c55e" }}>
              {estimate.score}
            </span>
            <span style={{ display: "flex", fontSize: 64, color: "#64748b", fontWeight: 700 }}>/100</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: 40, marginTop: "8px" }}>
            <span style={{ display: "flex" }}>J&apos;économise</span>
            <span style={{ display: "flex", color: "#22c55e", fontWeight: 700 }}>
              {formatEUR(estimate.yearlySavings)}/an
            </span>
            <span style={{ display: "flex" }}>sur mon énergie</span>
          </div>
        </div>

        {/* Pied */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 26, color: "#94a3b8" }}>
            <span style={{ display: "flex" }}>Facture {formatEUR(estimate.monthlyBill)}/mois</span>
            <span style={{ display: "flex", color: "#22c55e", fontWeight: 700 }}>
              Optimisée {formatEUR(estimate.newMonthlyBill)}/mois
            </span>
          </div>
          <span style={{ display: "flex", fontSize: 26, color: "#86efac" }}>Calculez le vôtre</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
