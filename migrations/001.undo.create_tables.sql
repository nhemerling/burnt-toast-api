DROP INDEX IF EXISTS idx_review_user_id CASCADE;
DROP INDEX IF EXISTS idx_review_link_user_skill_id CASCADE;
DROP TABLE IF EXISTS review CASCADE;

DROP INDEX IF EXISTS idx_skill_detail_link_user_skill_id CASCADE;
DROP TABLE IF EXISTS skill_detail CASCADE;

DROP INDEX IF EXISTS idx_link_user_skill_skill_id CASCADE;
DROP INDEX IF EXISTS idx_link_user_skill_user_id CASCADE;
DROP TABLE IF EXISTS link_user_skill CASCADE;


DROP TYPE IF EXISTS skill_type CASCADE;

DROP INDEX IF EXISTS idx_skill_category_id CASCADE;
DROP TABLE IF EXISTS skill CASCADE;

DROP TABLE IF EXISTS category CASCADE;

DROP INDEX IF EXISTS idx_user_zip CASCADE;
DROP TABLE IF EXISTS user_profile CASCADE;
DROP TABLE IF EXISTS registered_user CASCADE;




/*

DROP INDEX IF EXISTS idx_user_deck_link_user_id CASCADE;
DROP TABLE IF EXISTS user_deck_link;

DROP INDEX IF EXISTS idx_deck_flashcard_link_deck_id CASCADE;
DROP TABLE IF EXISTS deck_flashcard_link CASCADE;

DROP TABLE IF EXISTS deck CASCADE;

DROP TABLE IF EXISTS flashcard CASCADE;

*/