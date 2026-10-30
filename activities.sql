-- Adminer 6.1.0 PostgreSQL 18.6 dump

DROP TABLE IF EXISTS "public"."registrations";
DROP TABLE IF EXISTS "public"."activities";

-- 1. 活動資料表 (對應：新增活動、活動清單)
CREATE TABLE "public"."activities" (
    "activity_id" serial NOT NULL,
    "activity_name" character varying(100) NOT NULL,
    "activity_date" date NOT NULL,
    "description" text,
    CONSTRAINT "activities_pkey" PRIMARY KEY ("activity_id")
);

-- 2. 報名資料表 (對應：填寫報名表、查看報名名單)
CREATE TABLE "public"."registrations" (
    "registration_id" serial NOT NULL,
    "activity_id" int NOT NULL,              -- 外鍵：對應 activities.activity_id
    "name" character varying(50) NOT NULL,   -- 報名者姓名
    "phone" character varying(20) NOT NULL,  -- 連絡電話
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP, -- 報名時間
    CONSTRAINT "registrations_pkey" PRIMARY KEY ("registration_id"),
    CONSTRAINT "fk_activity" FOREIGN KEY ("activity_id") 
        REFERENCES "public"."activities"("activity_id") 
        ON DELETE CASCADE                    -- 活動刪除時，其底下報名一併刪除
);

-- 3. 寫入測試活動資料（方便前端與後端測試）
INSERT INTO "public"."activities" ("activity_name", "activity_date", "description") 
VALUES 
('廢墟系程式碼重構工作坊', '2026-11-15', '教你如何在一團亂的扣中求生，歡迎系上同學參加！'),
('期末專題熬夜求生分享會', '2026-11-20', '大家一起來吐苦水與吃宵夜。');