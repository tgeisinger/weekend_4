CREATE TABLE tasks(
 id SERIAL PRIMARY KEY,
 tasks_not_completed character varying(150)
)

ALTER TABLE tasks
ADD completed_tasks character varying(60)
