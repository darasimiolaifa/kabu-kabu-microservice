# Migration `20191104033228-change-car-model-column-from-model-to-car_model`

This migration has been generated by Olaifa Oluwadarasimi Ibikunle at 11/4/2019, 3:32:28 AM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Taxi" DROP COLUMN "model",
ADD COLUMN "car_model" text NOT NULL DEFAULT '' ;
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191104033010-init..20191104033228-change-car-model-column-from-model-to-car_model
--- datamodel.dml
+++ datamodel.dml
@@ -23,9 +23,9 @@
 model Taxi {
   id  String  @default(cuid())  @id @unique
   driver  Driver
   manufacturer  String
-  model String
+  car_model String
   capacity  Int
   year  String
   vehicle_documents String[]
   ownership_documents String[]
```

## Photon Usage

You can use a specific Photon built for this migration (20191104033228-change-car-model-column-from-model-to-car_model)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191104033228-change-car-model-column-from-model-to-car_model'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```