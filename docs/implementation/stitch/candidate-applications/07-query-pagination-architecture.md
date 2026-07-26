# Query & Pagination Architecture

## Data Fetching Model
- **Ownership Resolution**: `auth.uid()` -> `profiles.id` -> `candidates.id` -> `applications.candidate_id`.
- **Safe Field Selection**: Selects explicit public fields from `applications` and `jobs`, excluding internal Operations notes.
- **Pagination**: Offset-range query (`range(from, to)`) with `count: 'exact'`.
- **Search Filtering**: Client-side & server-side filter evaluation across job titles, reference codes, and locations.
