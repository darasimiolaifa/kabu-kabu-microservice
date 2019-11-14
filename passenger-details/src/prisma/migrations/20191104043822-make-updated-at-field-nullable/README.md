# Migration `20191104043822-make-updated-at-field-nullable`

This migration has been generated by Olaifa Oluwadarasimi Ibikunle at 11/4/2019, 4:38:23 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Passenger" DROP COLUMN "updatedAt",
ADD COLUMN "updatedAt" timestamp(3)   ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191104032148-add-updated-at-field-to-passenger-model..20191104043822-make-updated-at-field-nullable
--- datamodel.dml
+++ datamodel.dml
@@ -14,7 +14,7 @@
   lastName  String
   status  String
   phone_number  String
   createdAt DateTime
-  updatedAt DateTime  
+  updatedAt DateTime?
   trips Int @default(0)
 }
```

## Photon Usage

You can use a specific Photon built for this migration (20191104043822-make-updated-at-field-nullable)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191104043822-make-updated-at-field-nullable'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```