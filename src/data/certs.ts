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
      de: 'Diagnose-Methodik, Helpdesk-Support und Cybersicherheit — Zugriffskontrolle, Firewalls, Antimalware sowie Abwehr von Cyber- und Wireless-Angriffen.',
      en: 'Diagnostic methodologies, helpdesk support and cybersecurity — access control, firewalls, antimalware, and defence against cyber and wireless attacks.',
    },
  },
  {
    name: 'Network Addressing and Basic Troubleshooting',
    date: '11/2025',
    issuer: 'Cisco Networking Academy',
    desc: {
      de: 'Physikalische Schicht (Kupfer, Glasfaser), IPv6-Adressierung, Cisco-Router und -Switches sowie systematische Fehlerdiagnose bei Wireless- und Internet-Verbindungen.',
      en: 'Physical layer (copper, fibre-optic), IPv6 addressing, Cisco routers and switches, and systematic fault diagnosis for wireless and internet connectivity.',
    },
  },
  {
    name: 'Networking Devices and Initial Configuration',
    date: '11/2025',
    issuer: 'Cisco Networking Academy',
    desc: {
      de: 'Ethernet-Switching, IPv4/IPv6, ARP, DHCP, DNS, TCP/UDP, Cloud und Erstkonfiguration von Cisco-Routern und -Switches über die IOS CLI.',
      en: 'Ethernet switching, IPv4/IPv6, ARP, DHCP, DNS, TCP/UDP, cloud and initial configuration of Cisco routers and switches via IOS CLI.',
    },
  },
  {
    name: 'Networking Basics',
    date: '10/2025',
    issuer: 'Cisco Networking Academy',
    desc: {
      de: 'Netzwerkgrundlagen: OSI-Modell, Ethernet, IPv4/IPv6, Subnetting, NAT, Routing, TCP/UDP, DNS, HTTP und Troubleshooting-Utilities (Ping, Traceroute).',
      en: 'Networking fundamentals: OSI model, Ethernet, IPv4/IPv6, subnetting, NAT, routing, TCP/UDP, DNS, HTTP and troubleshooting utilities (ping, traceroute).',
    },
  },
];
