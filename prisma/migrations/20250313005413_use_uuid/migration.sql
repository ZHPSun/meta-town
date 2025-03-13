-- 1. 确保启用 uuid 生成扩展
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. 添加新 UUID 列
ALTER TABLE "users" ADD COLUMN "new_id" UUID DEFAULT gen_random_uuid();

ALTER TABLE "spaces" ADD COLUMN "new_id" UUID DEFAULT gen_random_uuid();
ALTER TABLE "spaces" ADD COLUMN "new_owner_id" UUID;

ALTER TABLE "user_space_positions" ADD COLUMN "new_id" UUID DEFAULT gen_random_uuid();
ALTER TABLE "user_space_positions" ADD COLUMN "new_user_id" UUID;
ALTER TABLE "user_space_positions" ADD COLUMN "new_space_id" UUID;

ALTER TABLE "_users_joined_spaces" ADD COLUMN "new_A" UUID;
ALTER TABLE "_users_joined_spaces" ADD COLUMN "new_B" UUID;

-- 3. 迁移数据到新列
UPDATE "users" SET "new_id" = gen_random_uuid();

UPDATE "spaces" 
SET "new_id" = gen_random_uuid(),
    "new_owner_id" = users.new_id
FROM "users" WHERE "spaces"."owner_id" = "users"."id";

UPDATE "user_space_positions"
SET "new_id" = gen_random_uuid(),
    "new_user_id" = users.new_id,
    "new_space_id" = spaces.new_id
FROM "users", "spaces"
WHERE "user_space_positions"."user_id" = users.id AND "user_space_positions"."space_id" = spaces.id;

UPDATE "_users_joined_spaces"
SET "new_A" = spaces.new_id
FROM "spaces" WHERE "_users_joined_spaces"."A" = "spaces"."id";

UPDATE "_users_joined_spaces"
SET "new_B" = users.new_id
FROM "users" WHERE "_users_joined_spaces"."B" = "users"."id";

-- 4. 删除旧外键
ALTER TABLE "_users_joined_spaces" DROP CONSTRAINT "_users_joined_spaces_A_fkey";
ALTER TABLE "_users_joined_spaces" DROP CONSTRAINT "_users_joined_spaces_B_fkey";

ALTER TABLE "spaces" DROP CONSTRAINT "spaces_owner_id_fkey";

ALTER TABLE "user_space_positions" DROP CONSTRAINT "user_space_positions_space_id_fkey";
ALTER TABLE "user_space_positions" DROP CONSTRAINT "user_space_positions_user_id_fkey";

-- 5. 删除旧主键
ALTER TABLE "_users_joined_spaces" DROP CONSTRAINT "_users_joined_spaces_AB_pkey";
ALTER TABLE "spaces" DROP CONSTRAINT "spaces_pkey";
ALTER TABLE "users" DROP CONSTRAINT "users_pkey";
ALTER TABLE "user_space_positions" DROP CONSTRAINT "user_space_positions_pkey";

-- 6. 删除旧列并重命名新列
ALTER TABLE "users" DROP COLUMN "id";
ALTER TABLE "users" RENAME COLUMN "new_id" TO "id";

ALTER TABLE "spaces" DROP COLUMN "id";
ALTER TABLE "spaces" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "spaces" DROP COLUMN "owner_id";
ALTER TABLE "spaces" RENAME COLUMN "new_owner_id" TO "owner_id";

ALTER TABLE "user_space_positions" DROP COLUMN "id";
ALTER TABLE "user_space_positions" RENAME COLUMN "new_id" TO "id";
ALTER TABLE "user_space_positions" DROP COLUMN "user_id";
ALTER TABLE "user_space_positions" RENAME COLUMN "new_user_id" TO "user_id";
ALTER TABLE "user_space_positions" DROP COLUMN "space_id";
ALTER TABLE "user_space_positions" RENAME COLUMN "new_space_id" TO "space_id";

ALTER TABLE "_users_joined_spaces" DROP COLUMN "A";
ALTER TABLE "_users_joined_spaces" RENAME COLUMN "new_A" TO "A";

ALTER TABLE "_users_joined_spaces" DROP COLUMN "B";
ALTER TABLE "_users_joined_spaces" RENAME COLUMN "new_B" TO "B";

-- 7. 重新创建主键
ALTER TABLE "users" ADD PRIMARY KEY ("id");
ALTER TABLE "spaces" ADD PRIMARY KEY ("id");
ALTER TABLE "user_space_positions" ADD PRIMARY KEY ("id");
ALTER TABLE "_users_joined_spaces" ADD PRIMARY KEY ("A", "B");

-- 8. 重新创建外键
ALTER TABLE "spaces"
ADD CONSTRAINT "spaces_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "user_space_positions"
ADD CONSTRAINT "user_space_positions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "user_space_positions"
ADD CONSTRAINT "user_space_positions_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "_users_joined_spaces"
ADD CONSTRAINT "_users_joined_spaces_A_fkey" FOREIGN KEY ("A") REFERENCES "spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_users_joined_spaces"
ADD CONSTRAINT "_users_joined_spaces_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 9. 重建索引
CREATE INDEX "_users_joined_spaces_B_index" ON "_users_joined_spaces"("B");
CREATE UNIQUE INDEX "user_space_positions_user_id_space_id_key" ON "user_space_positions"("user_id", "space_id");
