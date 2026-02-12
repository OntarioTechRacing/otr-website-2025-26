-- Seed data for History table
INSERT INTO "History" (year, name, nickname, image, highlight, specs, "order") VALUES
(2024, 'OTR 24', NULL, '/history/OTR-24.jpg', 'Latest Build', '["Motor - Emrax 208 HV", "Steel Tube Space Frame", "Material: 4130 Chromoly", "Torsional stiffness: 1366 Nm/deg", "Batteries - 384 x Samsung 40T Li-Ion 21700 cells", "Telemetry: ECU - Dana TM4 Neuro 200"]', 1),
(2022, 'OTR 22''', 'Zippy', '/history/OTR-22.png', '31st Place', '["Placed 31st out of 100+ teams", "Steel Tube Space Frame", "Material: 4130 Chromoly", "Torsional stiffness: 1366 Nm/deg", "4 modules - 396x Li-Ion 21700 cells", "Front & Rear Push Rod"]', 2),
(2020, 'OTR 20''', 'Gappy', '/history/OTR-20.jpg', NULL, '["Improved chassis, modified suspension system", "Battery has a single pack with 4 modules, containing 396 Li-Ion 21700 cells", "Emrax 208 Motor", "Power output peaks at 80kW", "Torque output peaks at 140Nm", "Suspension uses a push rod system for both front and rear"]', 3),
(2019, 'UOIT 19''', 'Eileen', '/history/UOIT-19.jpg', 'First EV', '["First finished and running electric vehicle", "Battery has a single pack with 4 modules, containing 396 Li-Ion 21700 cells", "Emrax 208 Motor", "Power output peaks at 80kW"]', 4),
(2018, 'UOIT 18'' - Prototype', NULL, '/history/UOIT-18.jpg', 'EV Transition', '["Transition from a traditional combustion engine to an electric powertrain.", "Jump toward sustainable energy solutions.", "Chassis is a steel tubular space frame"]', 5),
(2013, 'F13', NULL, '/history/F2013.png', NULL, '["Competitive Lap Times", "Lost power due to a part falling out", "Single Cylinder Kawasaki KFX450R", "Inboard Rear Brakes"]', 6),
(2011, 'F11', NULL, '/history/F2011.png', NULL, '["Single Cylinder Kawasaki KFX450R", "10\" Wheels", "Pull Rod Suspension (bottom mount)", "Inboard Rear Brakes", "Light weight and cost-effective"]', 7),
(2010, 'F2010', NULL, '/history/F2010.jpg', NULL, '["Carbon Fiber/Aluminum", "Steel Tube Rear Frame Section", "Stock Suzuki GSXR 600", "Full Aerodynamic Package", "13\" wheels"]', 8),
(2008, 'F2008', NULL, '/history/F2008.jpg', NULL, '["Similar to 2007", "Much lighter", "Improved Geometry", "Weighed 448lbs"]', 9),
(2007, 'F2007', NULL, '/history/F2007.jpg', 'Rookie of Year', '["Carbon Fiber/Aluminum", "Rookie of the Year Winner", "Weighed 546lbs"]', 10);

-- Seed data for Sponsors table
INSERT INTO "Sponsors" (name, logo, url, tier, "order") VALUES
-- Diamond
('Ontario Tech University', '/sponsor_logos/otu-logo.png', 'https://ontariotechu.ca/', 'diamond', 1),
('ACE', '/sponsor_logos/ACE_logo.png', 'https://ontariotechu.ca/about/campus-buildings/north-oshawa/ace.php', 'diamond', 2),
-- Platinum
('Multimatic', '/sponsor_logos/multimatic_Logo.png', 'https://www.multimatic.com/', 'platinum', 1),
('Source PMM', '/sponsor_logos/source_pmm.png', 'https://www.sourcepmm.com/', 'platinum', 2),
-- Gold
('Batemo', '/sponsor_logos/batemo_Logo_gold.png', 'https://www.batemo.com/', 'gold', 1),
('Cadence', '/sponsor_logos/cadence_Logo_gold.png', 'https://www.cadence.com/en_US/home.html', 'gold', 2),
('Lemo', '/sponsor_logos/lemo_Logo_gold.png', 'https://www.lemo.com/en', 'gold', 3),
('Michigan Scientific', '/sponsor_logos/Michiganwhite_Logo_gold.png', 'https://www.michsci.com/', 'gold', 4),
('ESAB', '/sponsor_logos/esab_Logo_gold.png', 'https://esab.com/ca/nam_en/', 'gold', 5),
('Mach2', '/sponsor_logos/Mach2_Logo_gold.png', 'https://www.mach2waterjet.ca/', 'gold', 6),
-- Silver
('VI-Grade', '/sponsor_logos/vi-grade_Logo_silver.png', 'https://www.vi-grade.com/', 'silver', 1),
('Sunstone', '/sponsor_logos/Sunstone_Logo_silver.png', 'https://www.sunstonewelders.com/', 'silver', 2),
('Gene Haas Foundation', '/sponsor_logos/Genehas_Logo_silver.png', 'https://www.ghaasfoundation.org/', 'silver', 3),
('Tasking', '/sponsor_logos/tasking_Logo_silver.png', 'https://www.tasking.com/', 'silver', 4),
('Swagelok', '/sponsor_logos/swagelok_Logo_silver.png', 'https://www.swagelok.com/en', 'silver', 5),
('Tailscale', '/sponsor_logos/tailscale_Logo_silver.png', 'https://tailscale.com/', 'silver', 6),
-- Bronze
('MTB', '/sponsor_logos/mtb_Logo_bronze.png', 'https://mtbtransitsolutions.com/', 'bronze', 1),
('Kvaser', '/sponsor_logos/kvaser_Logo_bronze.png', 'https://kvaser.com/', 'bronze', 2),
('Rapid Harness', '/sponsor_logos/rapidHarness_Logo_bronze.png', 'https://rapidharness.com/', 'bronze', 3),
('Fiberglass Unlimited', '/sponsor_logos/fiberglass_Unlimited_Logo_bronze.png', 'https://www.fiberglassunlimited.ca/', 'bronze', 4),
('PCB Libraries', '/sponsor_logos/PCB_Libraries_Logo_bronze.png', 'https://www.pcblibraries.com/', 'bronze', 5),
('Bender', '/sponsor_logos/bender_Logo_bronze.png', 'https://www.bender.de/en/', 'bronze', 6),
('Marple', '/sponsor_logos/marple_Logo_bronze.png', 'https://www.marpledata.com/', 'bronze', 7),
('Guayaki', '/sponsor_logos/guyaki_Logo_bronze.png', 'https://guayaki.com/', 'bronze', 8),
('Altair', '/sponsor_logos/altair_logo_bronze.png', 'https://altair.com/', 'bronze', 9),
('Dana TM4', '/sponsor_logos/dana_Logo_bronze.png', 'https://www.danatm4.com/', 'bronze', 10),
('STEER Group', '/sponsor_logos/steer_group_Logo_bronze.png', 'https://engineering.ontariotechu.ca/steer/index.php', 'bronze', 11),
-- General
('UA Local 401', '/sponsor_logos/united401_Logo_general.png', 'https://www.ualocal401.ca/', 'general', 1),
('DigiKey', '/sponsor_logos/digikey_Logo_general.png', 'https://www.digikey.ca/', 'general', 2);

-- Seed data for Departments table
INSERT INTO "Departments" (name, description, image, link, "order") VALUES
('Marketing', 'The Marketing team builds and maintains the Ontario Tech Racing website and supporting digital systems, delivering tools and features that enhance team operations, vehicle insights, and community engagement.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 1),
('Finance', 'The Finance team manages budgets, financial planning, and resource allocation to support Ontario Tech Racing''s operations and growth.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 2),
('Sponsorship', 'The Sponsorship team develops and maintains partnerships with sponsors, securing funding and resources essential for team success.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 3),
('Logistics', 'The Logistics team coordinates events, travel, and operational planning to ensure smooth team activities and competition participation.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 4),
('Communications', 'The Communications team manages public relations, social media, and team messaging to build community engagement and awareness.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 5),
('Analysis', 'The Analysis team uses data-driven insights to optimize vehicle performance, track metrics, and inform engineering decisions.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 6),
('Composites', 'The Composites team designs and manufactures lightweight, high-strength composite structures for the vehicle body and components.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 7),
('Embedded Software', 'The Embedded Software team develops firmware and control systems for vehicle electronics, ensuring reliable and efficient operation.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 8),
('HV Systems', 'The HV Systems team designs and manages high-voltage electrical systems, ensuring safety and optimal power delivery.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 9),
('Drivetrain & Braking', 'The Drivetrain & Braking team designs and optimizes powertrain components and braking systems for maximum performance and reliability.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 10),
('Hardware & Electronics', 'The Hardware & Electronics team designs and integrates electronic components, PCBs, and electrical systems for vehicle control and monitoring.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 11),
('Manufacturing', 'The Manufacturing team transforms designs into reality through precision machining, fabrication, and assembly of vehicle components.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 12),
('Software', 'The Web Software team builds and maintains the Ontario Tech Racing website and supporting digital systems, delivering tools and features that enhance team operations, vehicle insights, and community engagement.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 13),
('Suspension', 'The Suspension team designs and optimizes suspension geometry and components to maximize handling, stability, and performance.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 14),
('Vehicle Dynamics', 'The Vehicle Dynamics team analyzes and optimizes the overall vehicle behavior, handling characteristics, and performance metrics.', '/join-us/placeholder.png', 'https://linktr.ee/ontariotechracing', 15);

-- Seed data for CarSubsystems table
INSERT INTO "CarSubsystems" (title, description, specs, "order") VALUES
('Manufacturing', 'Designed for strength and weight efficiency, the chassis provides the backbone of the vehicle while ensuring safety and performance.', '["4130 chromoly", "Torsional stiffness 1366 Nm/l", "Weight 39x"]', 1),
('Suspension', 'Adjustability is key. Our suspension team focuses on refining geometry, optimizing anti-dive/anti-squat, and enhancing tunability for different track conditions.', '["Coilover (Red) = 9.75 lb/sq of nominal travel", "225 front/front and rear spring stiffness", "Adjustable Anti-dive/Anti-Squat"]', 2),
('Drive Train & Braking', 'We design the systems that get power to the wheels and bring the car to a stop. From fine-tuned brakes that deliver confident control, to a drivetrain built for smooth, responsive acceleration.', '["Emrax 208 HV Motor", "Max current 180 Amps", "Total voltage 400V"]', 3),
('Hardware & Electronics', 'Responsible for designing, building, and integrating critical systems such as the battery management system (BMS), power distribution, control units, and sensor networks. From high-voltage safety to efficient energy delivery, the department ensures every electronic component works seamlessly to optimize performance, reliability, and safety on the track', '[]', 4),
('Aerodynamics', 'The Aerodynamics department focuses on designing and optimizing the body of the electric car to minimize drag and maximize efficiency and stability. Using tools like CFD simulations and wind tunnel testing, the team develops wings, diffusers, and bodywork that enhance downforce and improve handling at high speeds.', '[]', 5),
('Our Sponsors', 'Our business team secures vital sponsorships, providing the financial support and industry partnerships that make this project possible.', '[]', 6);
