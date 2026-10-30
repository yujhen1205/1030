-- Adminer 6.1.0 PostgreSQL 18.6 dump

DROP TABLE IF EXISTS "public"."activities";

CREATE TABLE "public"."activities" (
    "activity_id" serial NOT NULL,
    "activity_name" character varying(100) NOT NULL,
    "activity_date" date NOT NULL,
    "description" text,
    CONSTRAINT "activities_pkey" PRIMARY KEY ("activity_id")
);


-- 2026-10-30 06:58:13 UTC
