/* Vaccination */
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Citywest', 1, '2022-03-13 20:29:00.000000', 'PFIZER_BIONTECH', '2022-04-03 21:29:00.000000', NULL);
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Croke Park', 2, '2022-03-13 20:29:00.000000', 'PFIZER_BIONTECH', '2022-04-03 21:29:00.000000', 'PFIZER_BIONTECH');
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Croke Park', 0, '2022-03-14 20:29:00.000000', NULL, NULL, NULL);
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Citywest', 1, '2022-03-14 20:29:00.000000', 'MODERNA', '2022-04-04 21:29:00.000000', NULL);
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Citywest', 0, '2022-03-14 20:29:00.000000', NULL, NULL, NULL);
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Citywest', 2, '2022-03-15 20:29:00.000000', 'MODERNA', '2022-04-05 21:29:00.000000', 'PFIZER_BIONTECH');
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Swords', 1, '2022-03-15 20:29:00.000000', 'PFIZER_BIONTECH', '2022-04-05 21:29:00.000000', NULL);
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Swords', 1, '2022-03-15 20:29:00.000000', 'PFIZER_BIONTECH', '2022-04-05 21:29:00.000000', NULL);
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Swords', 1, '2022-03-16 20:29:00.000000', 'MODERNA', '2022-04-06 21:29:00.000000', NULL);
INSERT INTO vaccinations(centre, doses_received, first_appointment, first_vaccine_type, second_appointment, second_vaccine_type)
VALUES ('Citywest', 1, '2022-03-16 20:29:00.000000', 'MODERNA', '2022-04-06 21:29:00.000000', NULL);

/* Users */
/* Admin */
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1989-02-15', 'admin@ucd.ie', 'UCD', 'MALE', 'Admin', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874795969', '1234568AB', 'ROLE_ADMIN', NULL);
/* Normal Users */
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1979-02-15', 'jane.doe@ucd.ie', 'Jane', 'FEMALE', 'Doe', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0824795969', '1234569AB', 'ROLE_USER', 1);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1989-06-15', 'jonna.nelson@ucd.ie', 'Jonna', 'FEMALE', 'Nelson', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0871795969', '1234570AB', 'ROLE_USER', 2);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1957-07-15', 'daniel.miller@ucd.ie', 'Daniel', 'MALE', 'Miller', 'United Kingdom', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0873795969', '1234571AB', 'ROLE_USER', 3);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1968-12-15', 'cinthia.henderson@ucd.ie', 'Cinthia', 'FEMALE', 'Henderson', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874795969', '1234572AB', 'ROLE_USER', 4);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1999-11-15', 'david.pendleton@ucd.ie', 'David', 'MALE', 'Pendleton', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874795969', '1234573AB', 'ROLE_USER', 5);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1968-10-15', 'cameron.bryant@ucd.ie', 'Cameron', 'MALE', 'Bryant', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874785969', '1234574AB', 'ROLE_USER', 6);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1979-09-15', 'willa.johnson@ucd.ie', 'Willa', 'FEMALE', 'Johnson', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874795969', '1234575AB', 'ROLE_USER', 7);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '2001-08-15', 'derrick.evans@ucd.ie', 'Derrick', 'MALE', 'Evans', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874795669', '1234576AB', 'ROLE_USER', 8);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1999-03-15', 'amanda.smith@ucd.ie', 'Amanda', 'FEMALE', 'Smith', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874795569', '1234577AB', 'ROLE_USER', 9);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1990-04-15', 'charlotte.krumm@ucd.ie', 'Charlotte', 'FEMALE', 'Krumm', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874495969', '1234578AB', 'ROLE_USER', 10);
INSERT INTO users (address, date_of_birth, email, first_name, gender, last_name, nationality, password, phone_no, ppsn, user_role, vaccination_id)
VALUES ('UCD, Dublin 4, Co. Dublin, Ireland', '1998-04-20', 'jason.tee@ucd.ie', 'Jason', 'MALE', 'Tee', 'Ireland', '$2a$10$bJivBMGDSjuIoeAza/e9LOMAJN2D8vk.w4CGCtkOxwOhiTF.Tlwkq', '0874495969', '1234579AB', 'ROLE_USER', NULL);
