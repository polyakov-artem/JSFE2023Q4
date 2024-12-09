# RSS Puzzle Mentors Check Criteria (170 points)

### 1. Code Formatting and Linting (20 points)

#### Prettier and ESLint Configuration (10 points)

- **(5 points)** Prettier is correctly set up with two scripts in `package.json`: `format` for auto-formatting and `ci:format` for checking issues.
- **(5 points)** ESLint is configured with the [Airbnb style guide](https://github.com/airbnb/javascript). A `lint` script in `package.json` runs ESLint checks.

#### Husky Configuration (10 points)

- **(5 points)** Husky is set up with a `pre-commit` script running Prettier checks.
- **(5 points)** Husky's `pre-push` script runs ESLint checks and branch name validation (using `validate-branch-name` or similar). Branch names must follow the defined repository

### 2. Code Quality and Structure (70 points)

#### TypeScript Usage and Functions (20 points)

- **(5 points)** No usage of `any` type in TypeScript.
- **(5 points)** TypeScript is configured with strict mode enabled, ensuring a more robust type-checking and enhancing code quality and maintainability.
- **(10 points)** Code is divided into small functions (≤ 40 lines each) with clear names and purposes.

#### Code Duplication and Magic Numbers (20 points)

- **(10 points)** Minimal or no code duplication.
- **(10 points)** No magic numbers or strings in the code.

#### Bundling and Modular Architecture (30 points)

- **(10 points)** Webpack or another bundler is used, resulting in a single HTML, JS, and CSS file.
- **(20 points)** The application is logically divided into modules/layers (e.g., API interaction, UI rendering, state management). Architecture should be discussed with a mentor.

### 3. Linter and TypeScript Rules Compliance (10 points)

- **(10 points)** No ESLint ("noInlineConfig": true) or TypeScript rules are disabled in the code.

### 4. Commit Naming Conventions (5 points)

- **(5 points)** Commits follow the specified naming conventions, reflecting the changes made in a clear and concise manner. Example: feat: RSS-PZ-01 Implement Login Form (#4)

### 5. Squashing Branches on Merge (5 points)

- **(5 points)** Feature branches are squashed when merged into the development branch, maintaining a clean and understandable commit history.

### 6. PR Management and Descriptions (10 points)

- **(10 points)** All features are integrated into the development branch through the merging of pull requests (PRs). Each PR includes a comprehensive description, outlining the purpose and key changes of the feature implemented.

### 7. Overall Code Quality (50 points)

- **(Up to 50 points)** Discretionary points awarded by the mentor based on overall code quality, readability
