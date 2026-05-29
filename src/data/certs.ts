import type { Bilingual } from '../lib/i18n';

export interface Cert {
  name: string;
  date: string;
  issuer: string;
  desc: Bilingual<string>;
}

export const certs: Cert[] = [
  {
    name: 'Network Support and Security',
    date: '11/2025',
    issuer: 'Cisco Networking Academy',
    desc: {
      de: 'Netzwerk-Fehlerbehebung und Helpdesk-Support — systematische Diagnose und Behebung von Netzwerkproblemen im Betrieb.',
      en: 'Network troubleshooting and helpdesk support — systematic diagnosis and resolution of operational network issues.',
    },
  },
  {
    name: 'Network Addressing and Basic Troubleshooting',
    date: '11/2025',
    issuer: 'Cisco Networking Academy',
    desc: {
      de: 'IPv6-Adressierung und Glasfaser-Verkabelung — moderne Netzwerk-Infrastruktur und protokollbasierte Fehlerdiagnose.',
      en: 'IPv6 addressing and fibre-optic cabling — modern network infrastructure and protocol-based fault diagnosis.',
    },
  },
  {
    name: 'Networking Devices and Initial Configuration',
    date: '11/2025',
    issuer: 'Cisco Networking Academy',
    desc: {
      de: 'Zentrale Netzwerkprotokolle (ARP, DHCP) und initiale Einrichtung von Cisco-Routern und -Switches.',
      en: 'Core networking protocols (ARP, DHCP) and initial configuration of Cisco routers and switches.',
    },
  },
  {
    name: 'Networking Basics',
    date: '10/2025',
    issuer: 'Cisco Networking Academy',
    desc: {
      de: 'Grundlagen von Netzwerkprotokollen (Ethernet, IP, TCP/UDP), Topologien und Verkabelung.',
      en: 'Fundamentals of network protocols (Ethernet, IP, TCP/UDP), topologies and cabling.',
    },
  },
];
