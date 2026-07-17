export const profile = {
  name: "M. Shehroz Khan",
  title: "Software Systems & DevOps Engineer",
  location: "Lahore, Pakistan",
  email: "khanshehroz951@gmail.com",
  phone: "+92 320 1202512",
  linkedin: "https://www.linkedin.com/in/m-shehroz-khan-4209ba201/",
  github: "https://github.com",
  terminalHandle: "shehroz@prod:~",
  tagline: "Building resilient, self-healing cloud infrastructure.",
  summary:
    "Results-driven DevOps and Site Reliability Engineer with 3+ years of experience designing, deploying, and managing secure, scalable infrastructure on AWS using Terraform. Skilled in CI/CD automation, container orchestration, and observability tooling. Proven track record of zero-downtime production migrations, incident response, and cross-team collaboration to improve system reliability and performance.",
};

export const metrics = [
  { label: "Years of experience", value: "3+" },
  { label: "Zero-downtime migrations", value: "100%" },
  { label: "AWS certifications", value: "3" },
  { label: "Production incidents resolved", value: "50+" },
];

export type SkillCategory = {
  name: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    name: "Cloud",
    items: ["AWS EC2", "AWS Lambda", "AWS S3", "IAM", "CodePipeline", "Backup & Recovery"],
  },
  {
    name: "Container Orchestration",
    items: ["Kubernetes", "Docker"],
  },
  {
    name: "Infrastructure as Code",
    items: ["Terraform", "Ansible"],
  },
  {
    name: "CI/CD",
    items: ["GitHub Actions", "Jenkins"],
  },
  {
    name: "Observability",
    items: ["Datadog", "Sumo Logic", "CloudWatch", "PagerDuty"],
  },
  {
    name: "Databases",
    items: ["PostgreSQL", "MySQL", "Aurora", "Cassandra"],
  },
  {
    name: "Languages",
    items: ["Python", "Java", "YAML"],
  },
  {
    name: "Security",
    items: ["Okta", "Authorization (Groups/ACLs)", "Encryption"],
  },
  {
    name: "Operating System",
    items: ["Linux", "Windows"],
  },
  {
    name: "Tools",
    items: ["GitHub", "Postman", "Nginx"],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

export const certifications: Certification[] = [
  { name: "AWS Developer – Associate", issuer: "AWS", date: "Nov 2025" },
  { name: "AWS Solutions Architect – Associate", issuer: "AWS", date: "Apr 2023" },
  { name: "AWS Cloud Practitioner", issuer: "AWS", date: "Jan 2023" },
  { name: "Microsoft Certified Associate, Python Programming", issuer: "Microsoft", date: "May 2021" },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Systems & DevOps Engineer",
    company: "Xgrid",
    location: "Lahore",
    period: "Jan 2024 – Present",
    description:
      "Xgrid delivers world-class end-to-end solutions across web/mobile development, secure cloud infrastructure, and intelligent cloud solutions.",
    achievements: [
      "Deployed a production WordPress application (frontend + backend) on AWS using Terraform",
      "Deployed a serverless application on AWS using Terraform",
      "Migrated a production application cross-region with zero downtime",
      "Built DriftLens, a self-hosted AWS drift-detection dashboard (FastAPI + React + Terraform) with real-time detection of unmanaged and config-drifted resources",
      "Automated IaC remediation by auto-generating Terraform HCL and streaming plan/apply output to the browser via SSE",
      "Implemented multi-region Terraform provider aliases with a shared S3 state backend for single-workspace, multi-region management",
      "Integrated GitHub PR automation to commit generated Terraform files and open PRs for full GitOps traceability",
      "Run on-call SRE shifts: incident response and root-cause analysis across AWS, Kafka, and Cassandra",
    ],
    tech: ["AWS", "Terraform", "FastAPI", "React", "Datadog", "Sumo Logic", "PagerDuty", "Okta", "Kafka", "Cassandra"],
  },
  {
    role: "Associate DevOps Engineer",
    company: "Hybytes",
    location: "Lahore",
    period: "Jan 2023 – Jan 2024",
    description:
      "Hybytes is an AWS Partner providing cloud infrastructure solutions for small-to-enterprise products.",
    achievements: [
      "Migrated a production application (frontend + backend) from legacy to new servers",
      "Automated PostgreSQL backups with off-site storage",
      "Migrated AWS CodeCommit repositories to GitHub",
      "Worked across core AWS services: EC2, Lambda, EBS, IAM policies, CodePipeline",
      "Built CI/CD pipelines with GitHub Actions and containerized workloads with Docker",
    ],
    tech: ["AWS", "Docker", "Terraform", "Nginx", "GitHub Actions", "PostgreSQL"],
  },
];

export type Project = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  links?: { label: string; href: string }[];
  githubUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "driftlens",
    name: "DriftLens",
    description:
      "Self-hosted AWS drift-detection dashboard that finds unmanaged and config-drifted resources in real time.",
    longDescription:
      "DriftLens continuously compares live AWS resource state against Terraform-managed state to surface drift as it happens. It auto-generates remediation Terraform HCL, streams plan/apply output straight to the browser over Server-Sent Events, and supports multi-region provider aliases against a single shared S3 state backend. A GitHub PR automation step commits the generated Terraform and opens a pull request automatically, keeping every change auditable through normal GitOps review.",
    tags: ["Terraform", "AWS", "FastAPI", "React", "GitOps"],
    year: "2024",
    githubUrl: "https://github.com/Shehroz-Khan-DevOps/Infrastructure-Drift-Detection",
    featured: true,
  },
  {
    slug: "cross-region-migration",
    name: "Zero-Downtime Cross-Region Migration",
    description: "Migrated a production application across AWS regions with zero downtime.",
    longDescription:
      "Designed and executed a cross-region migration strategy for a live production workload — replicating data, cutting over DNS and traffic incrementally, and validating health at each stage so end users never saw an interruption.",
    tags: ["AWS", "Terraform", "CI/CD"],
    year: "2024",
  },
  {
    slug: "serverless-aws",
    name: "Serverless Application on AWS",
    description: "Fully Terraform-provisioned serverless deployment pipeline.",
    longDescription:
      "Built and deployed a serverless application on AWS entirely through Terraform, covering Lambda, API Gateway, IAM, and supporting infrastructure as versioned, reviewable code.",
    tags: ["AWS", "Terraform", "Serverless"],
    year: "2024",
    githubUrl: "https://github.com/Shehroz-Khan-DevOps/Serverless-Application",
  },
  {
    slug: "wordpress-on-aws",
    name: "WordPress on AWS via Terraform",
    description: "Infrastructure-as-code deployment of a production WordPress stack.",
    longDescription:
      "Deployed a full WordPress application — frontend and backend — on AWS using Terraform, replacing manual server setup with a reproducible, version-controlled infrastructure definition.",
    tags: ["AWS", "Terraform", "WordPress", "Nginx"],
    year: "2024",
    githubUrl: "https://github.com/Shehroz-Khan-DevOps/Wordpress-Application",
  },
];

export const allProjectTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
).sort();

export const socials = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "LinkedIn", href: profile.linkedin },
];
