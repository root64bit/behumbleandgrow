# Upload & Replacement Behaviour

## Immutable Versioning Model
1. **Replacement Request**: When a Candidate replaces a document, a new immutable object is uploaded to private storage with a unique timestamped path.
2. **Superseded Status**: The previous document metadata record has its `verification_status` updated to `'superseded'`.
3. **Pending Review**: The new document version is inserted into `candidate_documents` with `verification_status` set to `'pending'`.
4. **Audit History**: Historical versions and review decisions remain auditable in PostgreSQL.

## Storage & Metadata Consistency (Compensating Cleanup)
If the Storage upload succeeds but database metadata insertion fails, the system executes an immediate compensating deletion:
```ts
await deleteStorageObject(bucketName, path);
```
This prevents orphaned objects in private buckets without associated metadata records.
