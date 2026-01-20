# Todo Full-Stack Web Application Constitution

## Core Principles

### I. Spec-Driven Development (SDD)
No implementation without approved specifications. All work begins with clear, documented requirements. Architecture must be defined before coding begins. Features are only implemented after specs are reviewed and approved.

### II. Agent-Only Execution
No manual coding by human developers. All implementation via Claude Code agents using skills. Consistent, repeatable outputs from defined prompts. Humans define requirements; agents write code.

### III. Incremental Delivery
Backend, frontend, auth/integration executed separately. Each phase has clear scope and boundaries. Phases are independently reviewable and verifiable. No cross-phase feature additions.

### IV. Deterministic Outputs
Same prompts produce consistent results. Skills ensure uniform implementation patterns. No ad-hoc or improvised feature additions. Each execution phase is repeatable and predictable.

### V. Security-First Design
Authentication and user isolation enforced from the start. JWT verification on every protected endpoint. Secrets managed via environment variables only. Data access scoped to authenticated users.

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16+ (App Router) |
| Backend | FastAPI (Python) |
| ORM | SQLModel |
| Database | Neon Serverless PostgreSQL |
| Authentication | Better Auth + JWT |

## Key Standards

### Agentic Dev Stack Workflow
All development MUST follow this sequence:

```
Write Spec → Generate Plan → Break into Tasks → Implement via Claude Code
```

1. **Write Specification** - Document requirements in `specs/<feature>/spec.md`
2. **Generate Architecture Plan** - Create `specs/<feature>/plan.md` with component interactions
3. **Break into Tasks** - Create `specs/<feature>/tasks.md` with actionable work items
4. **Implement via Claude Code** - Invoke appropriate agents with relevant skills

### Execution Standards
- Each execution phase must have clearly defined boundaries
- Agents must use only their assigned skills
- Skills loaded from `skills/` directory must not be reimplemented
- No cross-phase leakage (e.g., frontend generation during backend phase)
- All API endpoints must conform to defined contracts

## Constraints

### Prohibited Actions
- Manual code writing by humans
- One-shot full application generation
- Cross-phase feature additions
- Hardcoded credentials or secrets
- Implementation without approved specification

### Phase Isolation
- Backend, frontend, and auth/integration must be executed as separate phases
- Each phase must complete before the next begins
- Skills must be loaded from `skills/` directory
- No feature improvisation beyond approved specs

### Security Constraints
- Secrets must be managed via environment variables only
- JWT tokens must be verified on every protected request
- User isolation must be enforced at the database query level
- No credentials in source code or git history

## Success Criteria

### Functional
- Backend APIs function correctly with persistent storage
- Frontend provides a responsive, multi-user interface
- Authentication securely enforces user isolation
- Protected endpoints reject unauthorized access (401/403)
- JWT verification is enforced on every API request

### Quality
- Each phase is independently reviewable and verifiable
- Application is stable, secure, and demo-ready
- Code quality follows best practices for each technology
- Tests provide comprehensive coverage for all features

## Agent and Skill Registry

### Available Agents
| Agent | Purpose |
|-------|---------|
| `todo-requirements-architect` | Spec analysis, architecture generation |
| `todo-frontend-generator` | Next.js frontend with components |
| `todo-backend-agent` | FastAPI CRUD endpoints |
| `todo-database-schema` | SQLModel database design |
| `todo-auth-agent` | JWT authentication & user isolation |
| `todo-integration-agent` | Frontend ↔ backend integration |
| `todo-testing-agent` | Comprehensive test coverage |

### Available Skills
| Skill | Purpose |
|-------|---------|
| `requirements-architecture-skill.md` | Spec analysis, architecture generation |
| `nextjs-frontend-generation-skill.md` | Complete Next.js frontend scaffold |
| `fastapi-backend-crud-skill.md` | FastAPI CRUD endpoints with auth |
| `database-schema-skill.md` | SQLModel schema design |
| `jwt-auth-verification-skill.md` | JWT token handling & protection |
| `fullstack-integration-skill.md` | Frontend ↔ backend integration |
| `testing.qa.todo.md` | Test generation & bug detection |
| `deployment.devops.todo.md` | CI/CD, containers, monitoring |

## Phase Execution Order

1. Requirements & Architecture - Define specs, generate architecture
2. Database Schema - Design and implement data models
3. Backend Implementation - FastAPI CRUD with auth
4. Frontend Generation - Next.js UI with components
5. Auth & Integration - Connect systems, enforce isolation
6. Testing & QA - Comprehensive test coverage
7. Deployment - CI/CD and production readiness

Each phase must complete successfully before the next begins. Each phase is independently reviewable and verifiable.

## Project Structure

```
├── specs/
│   └── <feature>/
│       ├── spec.md          # Feature requirements
│       ├── plan.md          # Architecture decisions
│       └── tasks.md         # Actionable tasks
├── skills/
│   └── *.md                 # Agent skill specifications
├── history/
│   ├── prompts/             # Prompt History Records
│   └── adr/                 # Architecture Decision Records
├── frontend/                # Next.js application
├── backend/                 # FastAPI application
└── .env.example             # Environment template
```

## Governance

This constitution is the source of truth for all project decisions. Deviations require documented approval. All agents must operate within these constraints. Skills define the implementation patterns; deviation from skills is prohibited.

**Version**: 1.0.0 | **Ratified**: 2026-01-10 | **Last Amended**: 2026-01-10
