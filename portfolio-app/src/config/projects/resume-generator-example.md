# Resume Generator Example (Python + Jinja2)

This example shows how to use the project JSON files with Python and Jinja2 for CV/resume generation.

## Installation

```bash
pip install jinja2
```

## Python Script Example

```python
import json
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from datetime import datetime

def load_projects(projects_dir: Path):
    """Load all project JSON files from directory."""
    projects = []
    for json_file in projects_dir.glob('*.json'):
        if json_file.name != 'project-schema.md':
            with open(json_file, 'r', encoding='utf-8') as f:
                projects.append(json.load(f))
    return projects

def filter_featured_projects(projects):
    """Get only featured projects."""
    return [p for p in projects if p['metadata']['featured']]

def format_date_range(start_date, end_date):
    """Format date range for display."""
    start = datetime.strptime(start_date, '%Y-%m')
    end_str = 'Present' if end_date is None else datetime.strptime(end_date, '%Y-%m').strftime('%b %Y')
    return f"{start.strftime('%b %Y')} - {end_str}"

def generate_resume(projects, template_name='resume.html'):
    """Generate resume HTML from projects data."""
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template(template_name)
    
    # Sort projects by display order
    sorted_projects = sorted(projects, key=lambda p: p['metadata']['displayOrder'])
    
    # Render template
    html_output = template.render(
        projects=sorted_projects,
        format_date_range=format_date_range
    )
    
    return html_output

# Usage
if __name__ == '__main__':
    projects_dir = Path('../src/config/projects')
    projects = load_projects(projects_dir)
    featured = filter_featured_projects(projects)
    
    # Generate resume with featured projects only
    resume_html = generate_resume(featured)
    
    with open('resume.html', 'w', encoding='utf-8') as f:
        f.write(resume_html)
```

## Jinja2 Template Example (resume.html)

```jinja2
<!DOCTYPE html>
<html>
<head>
    <title>Professional Resume</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; }
        .project { margin-bottom: 2em; page-break-inside: avoid; }
        .project-title { font-size: 1.2em; font-weight: bold; }
        .project-meta { color: #666; font-size: 0.9em; margin: 0.5em 0; }
        .tech-stack { display: flex; flex-wrap: wrap; gap: 0.5em; margin: 0.5em 0; }
        .tech-tag { background: #e0e0e0; padding: 0.2em 0.5em; border-radius: 3px; font-size: 0.85em; }
        .highlights { list-style-type: none; padding-left: 1em; }
        .highlights li:before { content: "▸ "; font-weight: bold; }
    </style>
</head>
<body>
    <h1>Projects</h1>
    
    {% for project in projects %}
    <div class="project">
        <div class="project-title">{{ project.title }}</div>
        
        <div class="project-meta">
            {{ format_date_range(project.metadata.startDate, project.metadata.endDate) }}
            {% if project.team %}
            | {{ project.team.role }}
            {% endif %}
        </div>
        
        <p>{{ project.fullDescription or project.shortDescription }}</p>
        
        <div class="tech-stack">
            {% for lang in project.technologies.languages %}
            <span class="tech-tag">{{ lang }}</span>
            {% endfor %}
            {% for framework in project.technologies.frameworks %}
            <span class="tech-tag">{{ framework }}</span>
            {% endfor %}
        </div>
        
        {% if project.highlights %}
        <ul class="highlights">
            {% for highlight in project.highlights %}
            <li>{{ highlight }}</li>
            {% endfor %}
        </ul>
        {% endif %}
        
        {% if project.detailedContent and project.detailedContent.outcomes %}
        <div class="outcomes">
            <strong>Key Outcomes:</strong>
            <ul>
                {% for outcome in project.detailedContent.outcomes %}
                <li>{{ outcome }}</li>
                {% endfor %}
            </ul>
        </div>
        {% endif %}
    </div>
    {% endfor %}
</body>
</html>
```

## LaTeX Resume Example

For PDF generation, you can use a similar approach with LaTeX templates:

```jinja2
\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{hyperref}

\\begin{document}

\\section*{Projects}

{% for project in projects %}
\\subsection*{ {{- project.title -}} }
\\textit{ {{- format_date_range(project.metadata.startDate, project.metadata.endDate) -}} }

{{ project.fullDescription or project.shortDescription }}

\\textbf{Technologies:} 
{% for lang in project.technologies.languages %}{{ lang }}{% if not loop.last %}, {% endif %}{% endfor %}

{% if project.highlights %}
\\begin{itemize}
{% for highlight in project.highlights %}
    \\item {{ highlight }}
{% endfor %}
\\end{itemize}
{% endif %}

{% endfor %}

\\end{document}
```

## Filtering Examples

```python
# Get projects by technology
react_projects = [p for p in projects 
                  if 'ReactJS' in p['technologies']['frameworks']]

# Get projects by date range
recent_projects = [p for p in projects 
                   if p['metadata']['startDate'] >= '2023-01']

# Get active projects only
active_projects = [p for p in projects 
                   if p['metadata']['status'] == 'active']

# Get all unique technologies for skills section
all_techs = set()
for project in projects:
    for tech_category in project['technologies'].values():
        all_techs.update(tech_category)
```

## Markdown Export

```python
def export_to_markdown(project):
    """Export single project to markdown format."""
    md = f"# {project['title']}\n\n"
    md += f"{project['fullDescription'] or project['shortDescription']}\n\n"
    
    md += "## Technologies\n\n"
    for category, techs in project['technologies'].items():
        if techs:
            md += f"**{category.title()}:** {', '.join(techs)}\n\n"
    
    if project.get('highlights'):
        md += "## Highlights\n\n"
        for highlight in project['highlights']:
            md += f"- {highlight}\n"
    
    return md
```
