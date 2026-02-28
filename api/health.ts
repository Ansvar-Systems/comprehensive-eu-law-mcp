import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const info = {
    status: 'ok',
    server: 'comprehensive-eu-law-mcp',
    version: '0.1.0',
    git_sha: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'unknown',
    uptime_seconds: Math.floor(process.uptime()),
    build_timestamp: process.env.VERCEL_DEPLOYMENT_CREATED_AT || 'unknown',
    data_freshness: {
      last_ingested: '2026-02-28',
      source_count: 55,
    },
    capabilities: [
      'eu_treaties', 'regulations', 'directives', 'cjeu_case_law',
      'transposition_tracking', 'citation_validation', 'legal_stance',
    ],
    tier: 'free',
  };

  if (req.url?.includes('/version')) {
    return res.status(200).json({
      ...info,
      node_version: process.version,
      transport: ['stdio', 'streamable-http'],
      mcp_sdk_version: '1.12.1',
      repo_url: 'https://github.com/Ansvar-Systems/comprehensive-eu-law-mcp',
      report_issue_url: 'https://github.com/Ansvar-Systems/comprehensive-eu-law-mcp/issues/new',
    });
  }

  return res.status(200).json(info);
}
