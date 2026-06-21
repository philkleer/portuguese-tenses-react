import { PROJECT_LINKS } from '../projectLinks.js';
import { FaGithub, FaBug, FaCoffee } from 'react-icons/fa';


function GitHubIcon() {
  return (
    <FaGithub />
  );
}

function IssueIcon() {
  return (
    <FaBug />
  );
}

function CoffeeIcon() {
  return (
    <FaCoffee />
  );
}

const ITEMS = [
  { href: PROJECT_LINKS.github, label: 'GitHub', icon: <GitHubIcon /> },
  { href: PROJECT_LINKS.issues, label: 'Issues', icon: <IssueIcon /> },
  { href: PROJECT_LINKS.coffee, label: 'Buy Me a Coffee', icon: <CoffeeIcon /> },
];

export default function IconLinks({ compact = false }) {
  return (
    <nav className={compact ? 'resource-links resource-links-compact' : 'resource-links'} aria-label="Links do projeto">
      {ITEMS.map((item) => (
        <a key={item.href} className="resource-link" href={item.href} target="_blank" rel="noreferrer">
          {item.icon}
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
