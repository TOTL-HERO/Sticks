import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";

const spectator = new Hono();

// GET /leaderboard/:tournamentId — public spectator leaderboard (no auth)
spectator.get("/:tournamentId", async (c) => {
  const tournamentId = c.req.param("tournamentId");

  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: {
      organization: { select: { name: true, logoUrl: true, colorScheme: true } },
      entries: {
        include: { user: { select: { firstName: true, lastName: true } } },
        orderBy: { scoreRelToPar: "asc" },
      },
    },
  });

  if (!tournament || tournament.status === "DRAFT") {
    return c.html(renderNotAvailablePage());
  }

  const orgConfig = (tournament.organization.colorScheme ?? {}) as Record<string, string>;
  const primary = orgConfig.primary || "#84d7af";
  const secondary = orgConfig.secondary || "#006747";
  const accent = orgConfig.accent || "#e9c349";
  const orgName = tournament.organization.name;
  const logoUrl = tournament.organization.logoUrl || "";
  const frozen = tournament.leaderboardFrozen;

  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";

  const rows = tournament.entries.map((e, i) => {
    const name = `${e.user.firstName} ${e.user.lastName}`;
    const score = e.scoreRelToPar === 0 ? "E" : (e.scoreRelToPar > 0 ? `+${e.scoreRelToPar}` : `${e.scoreRelToPar}`);
    return `<tr>
      <td>${i + 1}</td>
      <td>${escapeHtml(name)}</td>
      <td>${score}</td>
      <td>${e.thru}</td>
      <td>${e.flight || "-"}</td>
    </tr>`;
  }).join("\n");

  const startDate = tournament.startDate ? tournament.startDate.toLocaleDateString() : "";
  const endDate = tournament.endDate ? tournament.endDate.toLocaleDateString() : "";
  const dateRange = startDate && endDate ? `${startDate} – ${endDate}` : startDate || endDate || "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(tournament.name)} — ${escapeHtml(orgName)} Leaderboard</title>
  <style>
    :root { --primary: ${primary}; --secondary: ${secondary}; --accent: ${accent}; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #fff; min-height: 100vh; }
    header { background: var(--secondary); padding: 1rem; text-align: center; }
    header img { max-height: 48px; margin-bottom: 0.5rem; }
    header h1 { font-size: 1.25rem; color: var(--primary); }
    header p { font-size: 0.875rem; opacity: 0.8; }
    .frozen-banner { background: var(--accent); color: #000; text-align: center; padding: 0.5rem; font-weight: 600; }
    table { width: 100%; border-collapse: collapse; margin-top: 0.5rem; }
    th { background: var(--secondary); color: var(--primary); padding: 0.5rem; text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; position: sticky; top: 0; }
    td { padding: 0.5rem; border-bottom: 1px solid #222; font-size: 0.875rem; }
    tr:nth-child(1) td:first-child { color: #e9c349; font-weight: 700; }
    tr:nth-child(2) td:first-child { color: #c0c0c0; font-weight: 700; }
    tr:nth-child(3) td:first-child { color: #cd7f32; font-weight: 700; }
    footer { text-align: center; padding: 1rem; font-size: 0.75rem; opacity: 0.5; }
    @media (max-width: 480px) { td, th { padding: 0.375rem 0.25rem; font-size: 0.8rem; } }
  </style>
</head>
<body>
  <header>
    ${logoUrl ? `<img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(orgName)}" />` : ""}
    <h1>${escapeHtml(tournament.name)}</h1>
    <p>${escapeHtml(orgName)} · Round ${tournament.currentRound}${dateRange ? ` · ${dateRange}` : ""}</p>
  </header>
  ${frozen ? '<div class="frozen-banner">Leaderboard paused</div>' : ""}
  <div id="leaderboard">
    <table>
      <thead><tr><th>#</th><th>Player</th><th>Score</th><th>Thru</th><th>Flight</th></tr></thead>
      <tbody id="lb-body">${rows}</tbody>
    </table>
  </div>
  <footer>Powered by Sticks</footer>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
  <script>
    (function() {
      var url = "${supabaseUrl}";
      var key = "${supabaseAnonKey}";
      if (!url || !key) return;
      var sb = window.supabase.createClient(url, key);
      sb.channel('tournament:${tournamentId}')
        .on('broadcast', { event: 'leaderboard_update' }, function(msg) {
          var entries = msg.payload && msg.payload.entries;
          if (!entries) return;
          var tbody = document.getElementById('lb-body');
          if (!tbody) return;
          tbody.innerHTML = entries.map(function(e, i) {
            var score = e.scoreRelToPar === 0 ? 'E' : (e.scoreRelToPar > 0 ? '+' + e.scoreRelToPar : '' + e.scoreRelToPar);
            return '<tr><td>' + (i+1) + '</td><td>' + (e.name||'') + '</td><td>' + score + '</td><td>' + (e.thru||0) + '</td><td>' + (e.flight||'-') + '</td></tr>';
          }).join('');
        })
        .subscribe();
    })();
  </script>
</body>
</html>`;

  return c.html(html);
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderNotAvailablePage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Leaderboard Not Available</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .msg { text-align: center; }
    h1 { color: #84d7af; margin-bottom: 0.5rem; }
  </style>
</head>
<body>
  <div class="msg">
    <h1>Leaderboard Not Available</h1>
    <p>This tournament leaderboard is not currently available.</p>
  </div>
</body>
</html>`;
}

export default spectator;
