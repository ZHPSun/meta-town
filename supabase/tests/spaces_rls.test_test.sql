BEGIN;
create extension if not exists pgtap with schema extensions;
SELECT plan(1);
insert into auth.users (id, email) values
	('123e4567-e89b-12d3-a456-426614174000', 'user1@test.com'),
	('987fcdeb-51a2-43d7-9012-345678901234', 'user2@test.com');
insert into public.users (id, auth_id,display_name) values
    ('123e4567-e89b-12d3-a456-4266141740u1', '123e4567-e89b-12d3-a456-426614174000', 'user1'),
    ('987fcdeb-51a2-43d7-9012-3456789012u2', '987fcdeb-51a2-43d7-9012-345678901234', 'user2');
insert into public.spaces (id, owner_id, name) values
    ('7654a321-e89b-12d3-a456-4266141740s1', '123e4567-e89b-12d3-a456-4266141740u1', 'space1'),
    ('7654a321-e89b-12d3-a456-4266141740s2', '987fcdeb-51a2-43d7-9012-3456789012u2', 'space2'),
    ('7654a321-e89b-12d3-a456-4266141740s3', '123e4567-e89b-12d3-a456-4266141740u1', 'space3');
insert into public._users_joined_spaces ("A", "B") values
    ('7654a321-e89b-12d3-a456-4266141740s1', '123e4567-e89b-12d3-a456-4266141740u1'),
    ('7654a321-e89b-12d3-a456-4266141740s2', '123e4567-e89b-12d3-a456-4266141740u1'),
    ('7654a321-e89b-12d3-a456-4266141740s3', '987fcdeb-51a2-43d7-9012-3456789012u2');



--as user1
set local role authenticated;
set local request.jwt.claim.sub = '123e4567-e89b-12d3-a456-426614174000';
-- Test: user1 can view their own spaces and spaces they are members of
SELECT request_eq(
    'select count(*) from spaces',
    ARRAY[3::bigint],
    'user1 can view their own spaces and spaces they are members of which are 3'
);
-- Examples: https://pgtap.org/documentation.html

SELECT * FROM finish();
ROLLBACK;
