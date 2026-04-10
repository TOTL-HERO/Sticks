// ─── Scoring Export Service (CSV + PDF mock) ─────────────────────────────────

export interface ExportEntry {
  rank: number;
  playerName: string;
  handicap: number | null;
  flight: string | null;
  grossScore: number | null;
  netScore: number | null;
  holeScores: (number | null)[]; // index 0 = hole 1
}

export interface ExportFieldMapping {
  fields: { key: string; header: string }[];
}

export interface TournamentExportData {
  name: string;
  startDate: string | null;
  endDate: string | null;
  organizationName: string;
  entries: ExportEntry[];
}

const DEFAULT_FIELD_MAPPING: ExportFieldMapping = {
  fields: [
    { key: "rank", header: "Rank" },
    { key: "playerName", header: "Player Name" },
    { key: "handicap", header: "Handicap" },
    { key: "flight", header: "Flight" },
    { key: "grossScore", header: "Gross Score" },
    { key: "netScore", header: "Net Score" },
    ...Array.from({ length: 18 }, (_, i) => ({
      key: `hole${i + 1}`,
      header: `Hole ${i + 1}`,
    })),
  ],
};

function escapeCSV(val: string | number | null | undefined): string {
  if (val == null) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generates a CSV string from tournament export data.
 */
export function generateCSV(
  data: TournamentExportData,
  fieldMapping?: ExportFieldMapping,
): string {
  const mapping = fieldMapping ?? DEFAULT_FIELD_MAPPING;
  const headers = mapping.fields.map((f) => f.header);
  const rows: string[] = [headers.map(escapeCSV).join(",")];

  for (const entry of data.entries) {
    const values = mapping.fields.map((f) => {
      if (f.key === "rank") return entry.rank;
      if (f.key === "playerName") return entry.playerName;
      if (f.key === "handicap") return entry.handicap;
      if (f.key === "flight") return entry.flight;
      if (f.key === "grossScore") return entry.grossScore;
      if (f.key === "netScore") return entry.netScore;
      const holeMatch = f.key.match(/^hole(\d+)$/);
      if (holeMatch) {
        const holeIdx = parseInt(holeMatch[1]!, 10) - 1;
        return entry.holeScores[holeIdx] ?? "";
      }
      return "";
    });
    rows.push(values.map(escapeCSV).join(","));
  }

  return rows.join("\n");
}

/**
 * Mock PDF generation — returns a placeholder buffer.
 * Real implementation would use @react-pdf/renderer.
 */
export async function generatePDF(
  data: TournamentExportData,
  _orgConfig?: { primary?: string; secondary?: string; accent?: string } | null,
): Promise<Buffer> {
  const placeholder = `
[PDF PLACEHOLDER]
Tournament: ${data.name}
Organization: ${data.organizationName}
Date: ${data.startDate ?? "N/A"} - ${data.endDate ?? "N/A"}
Entries: ${data.entries.length}

This is a placeholder. Real PDF generation requires @react-pdf/renderer.
  `.trim();

  return Buffer.from(placeholder, "utf-8");
}
