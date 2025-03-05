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
