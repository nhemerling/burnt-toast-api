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
  'fred',
  --password = "password"
  '$2a$12$E5jQYCepba4nS/O7rkDZ7.rEQcrtysi6..WCq7SCiBgKFI/zLlTNi'
),
(
  2,
  'dave',
  --password = "password2"
  '$2a$12$XPvYifaweFSAkt6eCXQGwON.1.fND4jpDzZgAOXRsQvJWEKEK1enu'
),
(
  3,
  'callMeMitch',
  --password = "password"
  '$2a$12$E5jQYCepba4nS/O7rkDZ7.rEQcrtysi6..WCq7SCiBgKFI/zLlTNi'
),
(
  4,
  'diane23474',
  --password = "password"
  '$2a$12$E5jQYCepba4nS/O7rkDZ7.rEQcrtysi6..WCq7SCiBgKFI/zLlTNi'
),
(
  5,
  'justJamie',
  --password = "password"
  '$2a$12$E5jQYCepba4nS/O7rkDZ7.rEQcrtysi6..WCq7SCiBgKFI/zLlTNi'
),
(
  6,
  'regd_no_profile',
  --password = "password"
  '$2a$12$E5jQYCepba4nS/O7rkDZ7.rEQcrtysi6..WCq7SCiBgKFI/zLlTNi'
);

SELECT setval('registered_user_id_seq', (SELECT max(id) FROM registered_user), true);

INSERT INTO user_profile (id, fk_user_id, full_name, email, zip, profile_desc, profile_img_url)
VALUES
(
  1,
  1,
  'Fred',
  'fred@testytesttest5678.com',
  '90210',
  'The best at everything',
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=Only+The+Best'
),
(
  2,
  3,
  'Mitchell',
  'mitch@testytesttest5678.com',
  '95431',
  'I love to help',
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=I+Love+To+Help'
),
(
  3,
  2,
  'Dave',
  'dave@testytesttest5678.com',
  '23643',
  'Help me help you',
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=Help+Me+Help+You'
),
(
  4,
  4,
  'Diane',
  'diane@testytesttest5678.com',
  '23474',
  'No More Dirt Diane - Does it dirty, leaves it clean - for all your household cleaning needs',
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=No+More+Dirt+Diane'
),
(
  5,
  5,
  'Jamie',
  'jjj@testytesttest5678.com',
  '90210',
  'How can I help?',
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=How+Can+I+Help'
);

SELECT setval('user_profile_id_seq', (SELECT max(id) FROM user_profile), true);


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
),
(
  4,
  'Computers'
),
(
  5,
  'Education'
),
(
  6,
  'Electronics'
),
(
  7,
  'Food'
),
(
  8,
  'Handmade'
),
(
  9,
  'Health'
),
(
  10,
  'Home'
),
(
  11,
  'Repair'
),
(
  12,
  'Sports'
),
(
  13,
  'Other'
);

SELECT setval('category_id_seq', (SELECT max(id) FROM category), true);


INSERT INTO skill (id, fk_category_id, skill_name, skill_desc)
VALUES
(
  1,
  1,
  'Car Painting',
  'Exterior finish painting and vinyl wrapping'
),
(
  2,
  1,
  'Bumper Repair',
  'From small scratch and dent fixes to bumper replacements'
),
(
  3,
  1,
  'Ride Share',
  'Ut voluptate elit elit pariatur quis voluptate.'
),
(
  4,
  1,
  'Tires',
  'Ullamco quis occaecat minim nisi do ipsum anim velit incididunt.'
),
(
  5,
  1,
  'Maintenance Training',
  'Cillum pariatur ex occaecat et magna minim sunt eu officia qui occaecat nostrud esse magna.'
),
(
  6,
  2,
  'Art Classes',
  'Consectetur deserunt laborum aute reprehenderit in voluptate Lorem voluptate ad ad irure incididunt eu.'
),
(
  7,
  2,
  'Commissions',
  'Nisi cupidatat commodo velit voluptate nisi laboris fugiat et minim aute.'
),
(
  8,
  3,
  'Homemade',
  'Duis labore velit dolor reprehenderit eu.'
),
(
  9,
  3,
  'Makeup',
  'A skill in Some Category'
),
(
  10,
  3,
  'Skin Care',
  'A skill in Some Category'
),
(
  11,
  4,
  'Web Design',
  'Designing web site graphic elements including layout, color scheme, images, and user interface elements'
),
(
  12,
  4,
  'Hardware Fix',
  'A skill in Some Category'
),
(
  13,
  4,
  'Software Setup',
  'A skill in Some Category'
),
(
  14,
  4,
  'Web Development',
  'Writing code to covert a site design/idea into a functioning website'
),
(
  15,
  5,
  'Language Learning',
  'A skill in Some Category'
),
(
  16,
  5,
  'Tutorials',
  'A skill in Some Category'
),
(
  17,
  5,
  'Tutoring',
  'A skill in Some Category'
),
(
  18,
  6,
  'How to',
  'A skill in Some Category'
),
(
  19,
  6,
  'Quick Fix',
  'A skill in Some Category'
),
(
  20,
  7,
  'Diet',
  'A skill in Some Category'
),
(
  21,
  7,
  'Produce',
  'A skill in Some Category'
),
(
  22,
  7,
  'Home Cook',
  'A skill in Some Category'
),
(
  23,
  7,
  'Meal Prep',
  'A skill in Some Category'
),
(
  24,
  8,
  'Blacksmith',
  'A skill in Some Category'
),
(
  25,
  8,
  'Knitting',
  'A skill in Some Category'
),
(
  26,
  8,
  'Leather Craft',
  'A skill in Some Category'
),
(
  27,
  8,
  'Woodworking',
  'A skill in Some Category'
),
(
  28,
  9,
  'Excercise',
  'A skill in Some Category'
),
(
  29,
  9,
  'Healing',
  'A skill in Some Category'
),
(
  30,
  9,
  'Hugs',
  'A skill in Some Category'
),
(
  31,
  9,
  'Sound Baths',
  'A skill in Some Category'
),
(
  32,
  9,
  'Weightlifting',
  'A skill in Some Category'
),
(
  33,
  10,
  'Decor',
  'A skill in Some Category'
),
(
  34,
  10,
  'Painting',
  'A skill in Some Category'
),
(
  35,
  10,
  'Repair',
  'A skill in Some Category'
),
(
  36,
  10,
  'Roofing',
  'A skill in Some Category'
),
(
  37,
  11,
  'Computers',
  'A skill in Some Category'
),
(
  38,
  11,
  'Fences',
  'A skill in Some Category'
),
(
  39,
  11,
  'Hearts',
  'A skill in Some Category'
),
(
  40,
  12,
  'Improving form',
  'A skill in Some Category'
),
(
  41,
  12,
  'Improving Score',
  'A skill in Some Category'
),
(
  42,
  12,
  'Team',
  'A skill in Some Category'
),
(
  43,
  13,
  'Active Listening',
  'A skill in Some Category'
),
(
  44,
  13,
  'Plus One',
  'A skill in Some Category'
),
(
  45,
  13,
  'Dance Partner',
  'A skill in Some Category'
);

SELECT setval('skill_id_seq', (SELECT max(id) FROM skill), true);


INSERT INTO link_user_skill(id, fk_user_id, fk_skill_id, user_skill_type, primary_img_url, primary_description)
VALUES
(
  1,
  1,
  1,
  'PROVIDER',
  'https://via.placeholder.com/400.png/0000FF/FFFFFF?text=Some+Service',
  'The best at this'
),
(
  2,
  1,
  5,
  'PROVIDER',
  'https://via.placeholder.com/400.png/00FF00/000000?text=Some+Service',
  'The best at this'
),
(
  3,
  1,
  6,
  'SEEKER',
  null,
  null
),
(
  4,
  1,
  2,
  'SEEKER',
  null,
  null
),
(
  5,
  4,
  10,
  'PROVIDER',
  null,
  null
),
(
  6,
  4,
  15,
  'PROVIDER',
  null,
  null
),
(
  7,
  4,
  1,
  'PROVIDER',
  null,
  null
),
(
  8,
  4,
  20,
  'PROVIDER',
  null,
  null
);

SELECT setval('link_user_skill_id_seq', (SELECT max(id) FROM link_user_skill), true);


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

SELECT setval('skill_detail_id_seq', (SELECT max(id) FROM skill_detail), true);


INSERT INTO review (fk_link_user_skill_id, fk_user_id_review_provider, rating, review_text)
VALUES 
(
  1,
  2,
  1,
  'not the best, probably the worst'
);

COMMIT;