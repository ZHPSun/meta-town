-- 允许 Supabase 用户访问 `public` schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 允许所有用户访问 `public` schema 里的所有表
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon, authenticated;

-- 允许所有用户访问 `public` schema 里的所有存储过程
GRANT EXECUTE ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

-- 允许所有用户访问 `public` schema 里的所有序列
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 让未来的表、新建存储过程和序列也能被访问
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public 
GRANT EXECUTE ON ROUTINES TO anon, authenticated;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public 
GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated;

-- 确保 `auth` schema 存在，以防 Prisma 迁移时找不到它
CREATE SCHEMA IF NOT EXISTS auth;

DO $$
BEGIN
-- 尝试创建 `auth.id()` 函数
  CREATE FUNCTION auth.uid()
  RETURNS uuid 
  LANGUAGE SQL
  AS 'SELECT gen_random_uuid();';

EXCEPTION
-- 如果函数已存在，则忽略错误，防止迁移失败
  WHEN duplicate_function 
  THEN NULL;
END; $$;
