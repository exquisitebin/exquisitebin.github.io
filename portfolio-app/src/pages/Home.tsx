import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';
import { getAllProjects } from '@/config/projects';

// Load projects from JSON configuration
const projects = getAllProjects();

function Home() {
  return (
    <div className="text-center space-y-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Projects</h1>
      
      <ItemGroup className="gap-4">
        {projects.map((project) => (
          <Item key={project.id} variant="outline">
            <ItemContent className="flex flex-col items-center">
              <ItemTitle>{project.title}</ItemTitle>
              <ItemDescription>{project.shortDescription}</ItemDescription>
              
              {project.images.length > 0 && (
                <Carousel className="w-full max-w-lg">
                  <CarouselContent>
                    {project.images.map((imageSrc, imgIndex) => (
                      <CarouselItem key={imgIndex}>
                        <img 
                          src={imageSrc} 
                          alt={`${project.title} screenshot ${imgIndex + 1}`} 
                          className="w-full h-auto rounded-md" 
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
              
              {/* Technology tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.languages.slice(0, 3).map((lang) => (
                  <span key={lang} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 rounded">
                    {lang}
                  </span>
                ))}
                {project.technologies.frameworks.slice(0, 2).map((framework) => (
                  <span key={framework} className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 rounded">
                    {framework}
                  </span>
                ))}
              </div>
              
              {/* Links */}
              <div className="flex gap-4 mt-4">
                {project.links.live && (
                  <a 
                    href={project.links.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View Project →
                  </a>
                )}
                {project.links.repository && (
                  <a 
                    href={project.links.repository} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-500 hover:underline text-sm"
                  >
                    View Code →
                  </a>
                )}
              </div>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}

export default Home;
