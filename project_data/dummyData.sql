-- insert into users(name, password, age) values('Jhong-Sian', '$2a$12$7wxtaaPBDg2wUme3uQpZcuE/FSM3chm6np4kutmGAx8Cddj9hGFEu', 20); 
-- insert into users(name, password, age) values('Yun-Fan', '$2a$12$fXeShI1Q2N.rc5J0stHs8eb1iZaCULB6/J3EgFCtgWwUAeMLoQnFu', 20); 
-- insert into users(name, password, age) values('Yu-Wei', '$2a$12$FHzyY.2AvIKF6/qXnZZOOOZdlcU6liJmyqfqvzx513vwm561mP5we', 20); 
-- insert into users(name, password, age) values('Sheng-Da', '$2a$12$vLSO5IsTvJ0sKyWqDivfOOJ74MPqOjRYxQJjYs2F/o529Ap8hr6gS', 20); 

-- insert into sensors(sensor_type) values('acc');
-- insert into sensors(sensor_type) values('gyro');

-- drop procedure if exists dummy_sensor_data_insert;

-- DELIMITER $$
-- CREATE PROCEDURE dummy_sensor_data_insert(IN count INT)
-- BEGIN 
--    DECLARE i INT;
--    DECLARE user_id_value INT;
--    DECLARE x_axis_value DOUBLE;
--    DECLARE y_axis_value DOUBLE;
--    DECLARE z_axis_value DOUBLE;
--    SET i = 0;
--    
-- 	 label:LOOP -- 迴圈開始
--         IF i >= count THEN 
--             LEAVE label;  -- 判斷條件成立就結束迴圈 
--         END IF;
--         
--         forUserIDValue:LOOP -- check if user id value > 0
-- 			SET user_id_value = FLOOR(RAND() * 5);
--             IF user_id_value > 0 THEN
-- 				LEAVE forUserIDValue;
-- 			END IF;
--         END LOOP forUserIDValue;
--         
-- 		SET x_axis_value = RAND() * 20;
--         SET y_axis_value = RAND() * 20;
--         SET z_axis_value = RAND() * 20;
-- 		insert into sensor_data(sensor_id, user_id, instant, x_axis, y_axis, z_axis) values(1, user_id_value, timestamp(NOW()), x_axis_value, y_axis_value, z_axis_value);
--         
--         -- DO SLEEP(0.3); 
--         SET i = i + 1;        
--    END LOOP label;  -- 迴圈结束   
-- END$$
-- DELIMITER ;
-- -- 新增假資料
-- call dummy_sensor_data_insert(1000);


select * from users; 
select * from sensors; 
select * from sensor_data limit 3000;






