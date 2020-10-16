BEGIN;

TRUNCATE
"review",
"skill_detail",
"link_user_skill",
"skill",
"category",
"user_profile",
"registered_user"
 RESTART IDENTITY CASCADE;

INSERT INTO registered_user (id, username, hashed_pass)
VALUES 
(
  1,
  'test',
  --password = "password"
  '$2a$12$E5jQYCepba4nS/O7rkDZ7.rEQcrtysi6..WCq7SCiBgKFI/zLlTNi'
),
(
  2,
  'test2',
  --password = "password2"
  '$2a$12$XPvYifaweFSAkt6eCXQGwON.1.fND4jpDzZgAOXRsQvJWEKEK1enu'
);

INSERT INTO user_profile (id, fk_user_id, full_name, email, zip, profile_desc, profile_img_url)
VALUES
(
  1,
  2,
  'User Two',
  'user2@testytesttest.com',
  '90210',
  'The best at everything',
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=Only+The+Best'
);

INSERT INTO category (id, category_name) 
VALUES
(
  1,
  'Automotive'
),
(
  2,
  'Art'
),
(
  3,
  'Beauty'
);

INSERT INTO skill (id, fk_category_id, skill_name, skill_desc)
VALUES
(
  1,
  1,
  'Car Painting',
  'Exterior design'
),
(
  2,
  1,
  'Bumper Repair',
  'Minor bumer issues and dents'
),
(
  3,
  2,
  'Commissions',
  'Realistic and comic sketches'
),
(
  4,
  2,
  'Model',
  'Life model for art parties'
),
(
  5,
  3,
  'Homemade',
  'Homemade beauty prooducts and remedies'
),
(
  6,
  2,
  'Makeup',
  'Skilled artist for wedding, party makeup'
);

INSERT INTO link_user_skill(id, fk_user_id, fk_skill_id, user_skill_type, primary_img_url, primary_description)
VALUES
(
  1,
  2,
  1,
  'PROVIDER',
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=Some+Service',
  'The best at this'
),
(
  2,
  2,
  5,
  'PROVIDER',
  'https://via.placeholder.com/400.png/00FF00/000000?text=Some+Service',
  'The best at this'
),
(
  3,
  2,
  6,
  'SEEKER',
  null,
  null
),
(
  4,
  2,
  2,
  'SEEKER',
  null,
  null
);

INSERT INTO skill_detail (id, fk_link_user_skill_id, detail_img_url, details_description)
VALUES (
  1,
  1,
  'https://via.placeholder.com/400.png/FF0000/000000?text=BEST',
  'The best photo of me being the best at this'
),
(
  2,
  1,
  'https://via.placeholder.com/400.png/00FF00/000000?text=BEST',
  'Another best photo of me being the best at this'
),
(
  3,
  1,
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=BEST',
  'Again, the best'
),
(
  4,
  1,
  'https://via.placeholder.com/400.png/FF0000/FFFFFF?text=BEST',
  'BEST'
),
(
  5,
  2,
  'https://via.placeholder.com/400.png/00FF00/000000?text=BEST',
  'the best'
),
(
  6,
  2,
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=BEST',
  'you guessed it - still the best'
);

INSERT INTO review (fk_link_user_skill_id, fk_user_id_review_provider, rating, review_text)
VALUES 
(
  1,
  2,
  1,
  'not the best, probably the worst'
);

COMMIT;