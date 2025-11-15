import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';

const Language = {
  JavaScript: "JavaScript",
  TypeScript: "TypeScript",
  Python: "Python",
  CSharp: "C#",
  C: "C",
  Java: "Java",
  YAML: "YAML",
  HTML: "HTML",
  CSS: "CSS",
  SQL: "SQL",
} as const;

const Framework = {
  ReactJS: "ReactJS",
  VueJS: "VueJS",
  NestJS: "NestJS",
  DotNet: ".NET",
  NextJS: "NextJS",
  LangChain: "LangChain",
  Electron: "Electron",
} as const;

const DB = {
  MySQL: "MySQL",
  PostgreSQL: "PostgreSQL",
  MongoDB: "MongoDB",
  Snowflake: "Snowflake",
  Oracle: "OracleDB",
} as const;

const Tool = {
  ROS2: "ROS2",
  Docker: "Docker",
  NodeJS: "NodeJS",
  Terraform: "Terraform",
  Nix: "Nix",
} as const;

const OS = {
  Linux: "Linux",
  Ubuntu: "Ubuntu",
  NixOS: "NixOS",
  RedHat: "Red Hat",
  Windows: "Windows",
} as const;

const Platform = {
  AWS: "AWS",
  Azure: "Azure",
  GCP: "GCP",
  OnPrem: "On-Premise Server",
  Desktop: "Desktop",
  Web: "Web",
  Mobile: "Mobile",
} as const;

const VersionControl = {
  GitHub: "GitHub",
  GitLab: "GitLab",
  AzureDevOps: "Azure DevOps",
} as const;

type Language = typeof Language[keyof typeof Language];
type Framework = typeof Framework[keyof typeof Framework];
type DB = typeof DB[keyof typeof DB];
type Tool = typeof Tool[keyof typeof Tool];
type OS = typeof OS[keyof typeof OS];
type Platform = typeof Platform[keyof typeof Platform];
type VersionControl = typeof VersionControl[keyof typeof VersionControl];

interface Project {
  title: string
  description: string
  link: string
  repoLink: string
  images: string[]
  skills: string[]
  versionControl: VersionControl[]
  languages: Language[]
  dbs: DB[]
  frameworks: Framework[]
  tools: Tool[]
  operatingSystems: OS[]
  platforms: Platform[]
}

class ProjectClass implements Project {
  title: string;
  description: string;
  link: string;
  repoLink: string;
  images: string[];
  skills: string[];
  versionControl: VersionControl[];
  languages: Language[];
  dbs: DB[];
  frameworks: Framework[];
  tools: Tool[];
  operatingSystems: OS[];
  platforms: Platform[];

  constructor(
    title: string,
    description: string,
    link: string,
    repoLink: string,
    images: string[] = [],
    skills: string[] = [],
    versionControl: VersionControl[] = [],
    languages: Language[] = [],
    dbs: DB[] = [],
    frameworks: Framework[] = [],
    tools: Tool[] = [],
    operatingSystems: OS[] = [],
    platforms: Platform[] = []
  ) {
    this.title = title;
    this.description = description;
    this.link = link;
    this.repoLink = repoLink;
    this.images = images;
    this.skills = skills;
    this.versionControl = versionControl;
    this.languages = languages;
    this.dbs = dbs;
    this.frameworks = frameworks;
    this.tools = tools;
    this.operatingSystems = operatingSystems;
    this.platforms = platforms;
  }

  // Helper method to get all technologies used in the project
  getAllTechnologies(): string[] {
    return [
      ...this.languages,
      ...this.frameworks,
      ...this.dbs,
      ...this.tools,
      ...this.operatingSystems,
      ...this.platforms,
      ...this.versionControl
    ];
  }

  // Helper method to check if project uses a specific technology
  usesTechnology(tech: string): boolean {
    return this.getAllTechnologies().includes(tech);
  }

  // Helper method to get a summary string of key technologies
  getTechSummary(): string {
    const keyTechs = [
      ...this.languages.slice(0, 2),
      ...this.frameworks.slice(0, 2),
      ...this.platforms.slice(0, 1)
    ];
    return keyTechs.join(', ');
  }
}




const projects = [
  new ProjectClass(
    "MLVET - Machine Learning Video Editing Tool",
    "A cutting-edge video editing application leveraging machine learning to automate and enhance the editing process.",
    "/mlvet",
    "https://github.com/example/project",
    [
      "/src/assets/mlvet/mlvet-01.png",
      "/src/assets/mlvet/mlvet-02.gif", 
      "/src/assets/mlvet/mlvet-03.gif",
      "/src/assets/mlvet/mlvet-04.png"
    ],
    ["Frontend Development", "UI/UX Design"],
    [VersionControl.GitHub],
    [Language.TypeScript, Language.HTML, Language.CSS],
    [],
    [Framework.ReactJS, Framework.Electron],
    [Tool.NodeJS],
    [OS.Windows, OS.Linux],
    [Platform.Desktop]
  ),
  // Add more projects here as needed
];

function Home() {
  return (
    <div className="text-center space-y-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Projects</h1>
      
      <ItemGroup className="gap-4">
        {projects.map((project, index) => (
          <Item key={index} variant="outline">
            <ItemContent className="flex flex-col items-center">
              <ItemTitle>{project.title}</ItemTitle>
              <ItemDescription>{project.description}</ItemDescription>
              <Carousel 
                className="w-full max-w-lg"
              >
                <CarouselContent>
                  {project.images.map((imageSrc, imgIndex) => (
                    <CarouselItem key={imgIndex}>
                      <img src={imageSrc} alt={`${project.title} screenshot ${imgIndex + 1}`} className="w-full h-auto rounded-md" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
        
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}

export default Home;
