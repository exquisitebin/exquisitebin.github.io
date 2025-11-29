# Project Configuration Schema

This document describes the structure of project JSON files for portfolio display and CV generation.

## File Structure

Each project should be stored as a separate JSON file in `src/config/projects/`.

## Schema

```json
{
  "id": "string (required, unique, kebab-case)",
  "title": "string (required)",
  "shortDescription": "string (required, 1-2 sentences for cards)",
  "fullDescription": "string (optional, detailed overview for project page)",
  
  "links": {
    "live": "string (URL to live project)",
    "repository": "string (URL to source code)",
    "demo": "string (URL to demo video/site)",
    "documentation": "string (URL to docs)"
  },
  
  "images": [
    "string (relative path to image/gif)"
  ],
  
  "metadata": {
    "status": "string (active|completed|archived|in-progress)",
    "startDate": "string (YYYY-MM format)",
    "endDate": "string|null (YYYY-MM format or null for ongoing)",
    "featured": "boolean (show prominently)",
    "displayOrder": "number (sort order)"
  },
  
  "technologies": {
    "languages": ["string"],
    "frameworks": ["string"],
    "databases": ["string"],
    "tools": ["string"],
    "operatingSystems": ["string"],
    "platforms": ["string"],
    "versionControl": ["string"]
  },
  
  "skills": [
    "string (transferable skills demonstrated)"
  ],
  
  "highlights": [
    "string (key achievements or features, bullet points)"
  ],
  
  "detailedContent": {
    "overview": "string (detailed project context)",
    "features": [
      {
        "title": "string",
        "description": "string"
      }
    ],
    "challenges": ["string (technical challenges overcome)"],
    "outcomes": ["string (results, metrics, impact)"],
    "technicalDetails": {
      "architecture": "string",
      "mlModels": "string (if applicable)",
      "performance": "string (metrics, benchmarks)"
    }
  },
  
  "team": {
    "size": "number (team size)",
    "role": "string (your role)",
    "responsibilities": ["string (your specific contributions)"]
  }
}
```

## Usage for Different Applications

### Portfolio Website
- Use `shortDescription` for project cards
- Use `images` for carousels
- Use `links.live` and `links.repository` for navigation
- Use `technologies` for skill tags
- Use `detailedContent` for individual project pages

### CV/Resume Generation
- Use `title` and `fullDescription` for project entries
- Use `metadata.startDate` and `endDate` for timeline
- Use `highlights` for bullet points
- Use `skills` for skills section mapping
- Use `team.role` and `team.responsibilities` for role description
- Use `detailedContent.outcomes` for achievements

### Project Filtering
- Filter by `metadata.status` (show only active projects)
- Sort by `metadata.displayOrder` or `metadata.startDate`
- Filter by `metadata.featured` for homepage display
- Filter by `technologies.*` for skill-based filtering

## Example Queries (Jinja/Python)

```python
# Get featured projects
featured = [p for p in projects if p['metadata']['featured']]

# Get projects by technology
react_projects = [p for p in projects if 'ReactJS' in p['technologies']['frameworks']]

# Format for CV
cv_entry = f"{project['title']} ({project['metadata']['startDate']} - {project['metadata']['endDate'] or 'Present'})"
```
