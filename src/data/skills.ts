import type { Bilingual } from '../lib/i18n';

export type SkillIconKey = 'security' | 'coding' | 'admin' | 'ai' | 'tools';
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillItem {
  name: Bilingual<string>;
  level: SkillLevel;
}

export interface SkillCategory {
  iconKey: SkillIconKey;
  items: SkillItem[];
}

const same = (s: string): Bilingual<string> => ({ de: s, en: s });

export const skillsData: Record<SkillIconKey, SkillCategory> = {
  security: {
    iconKey: 'security',
    items: [
      { name: same('TCP/IP'), level: 4 },
      { name: same('ISMS'), level: 4 },
      { name: { de: 'Kryptografie', en: 'Cryptography' }, level: 4 },
      { name: same('ISO 27001 / 9001'), level: 3 },
      { name: same('Firewalls'), level: 3 },
      { name: same('VPN'), level: 3 },
      { name: { de: 'Webanwendungssicherheit', en: 'Web application security' }, level: 3 },
      { name: same('Pentesting'), level: 3 },
      { name: same('PKI'), level: 3 },
      { name: same('Nmap'), level: 3 },
      { name: same('Burp Suite'), level: 2 },
    ],
  },
  coding: {
    iconKey: 'coding',
    items: [
      { name: same('C++'), level: 4 },
      { name: same('TypeScript'), level: 4 },
      { name: same('HTML / CSS'), level: 4 },
      { name: same('Python'), level: 3 },
      { name: same('React'), level: 3 },
      { name: same('JavaScript'), level: 3 },
      { name: same('C'), level: 3 },
      { name: same('SQL'), level: 3 },
      { name: same('Bash / Shell'), level: 3 },
    ],
  },
  admin: {
    iconKey: 'admin',
    items: [
      { name: same('Windows'), level: 5 },
      { name: same('Linux'), level: 4 },
      { name: same('VMware'), level: 4 },
      { name: same('Git'), level: 4 },
      { name: same('macOS'), level: 3 },
      { name: same('VirtualBox'), level: 3 },
      { name: same('Wireshark'), level: 3 },
      { name: same('Docker'), level: 2 },
    ],
  },
  ai: {
    iconKey: 'ai',
    items: [
      { name: same('LLM-Chatbots (ChatGPT, Claude, Gemini, NotebookLM, Perplexity)'), level: 4 },
      { name: { de: 'KI-gestütztes Coding (Claude Code, Antigravity, Codex)', en: 'AI-assisted coding (Claude Code, Antigravity, Codex)' }, level: 4 },
      { name: same('AI Agents / Agentic Systems'), level: 4 },
      { name: same('Microsoft Copilot'), level: 3 },
      { name: same('Prompt Engineering'), level: 3 },
    ],
  },
  tools: {
    iconKey: 'tools',
    items: [
      { name: same('VS Code'), level: 5 },
      { name: same('Excel'), level: 5 },
      { name: { de: 'Microsoft Office (Word, PowerPoint, Outlook)', en: 'Microsoft Office (Word, PowerPoint, Outlook)' }, level: 4 },
      { name: same('Microsoft Teams / SharePoint'), level: 4 },
      { name: same('Jira'), level: 3 },
    ],
  },
};
