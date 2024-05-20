INSERT INTO
    course_entity (
        id_course,
        created_date,
        description,
        finish_date,
        last_modified_date,
        name,
        price,
        start_date,
        url_img
    )
VALUES (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'This is an introductory course to web development.',
        '2024-09-30',
        CURRENT_TIMESTAMP,
        'Web Development Fundamentals',
        199.99,
        '2024-06-01',
        'https://www.example.com/web_dev_fundamentals.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Learn the basics of programming with Python.',
        '2024-08-31',
        CURRENT_TIMESTAMP,
        'Python Programming for Beginners',
        149.99,
        '2024-07-05',
        'https://www.example.com/python_beginners.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Master the art of data analysis with Excel.',
        '2024-10-31',
        CURRENT_TIMESTAMP,
        'Data Analysis with Excel',
        129.99,
        '2024-08-10',
        'https://www.example.com/excel_data_analysis.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Create stunning graphics and designs with Adobe Photoshop.',
        '2024-11-30',
        CURRENT_TIMESTAMP,
        'Adobe Photoshop for Beginners',
        199.99,
        '2024-09-15',
        'https://www.example.com/photoshop_beginners.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Learn how to build responsive websites with HTML, CSS, and JavaScript.',
        '2024-12-31',
        CURRENT_TIMESTAMP,
        'Front-End Web Development',
        249.99,
        '2024-10-01',
        'https://www.example.com/front_end_web_dev.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Delve into the world of machine learning and artificial intelligence.',
        '2024-11-30',
        CURRENT_TIMESTAMP,
        'Machine Learning Fundamentals',
        299.99,
        '2024-11-15',
        'https://www.example.com/machine_learning_fundamentals.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Learn how to create interactive data visualizations with Tableau.',
        '2024-12-31',
        CURRENT_TIMESTAMP,
        'Data Visualization with Tableau',
        199.99,
        '2024-12-01',
        'https://www.example.com/tableau_data_visualization.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Master the art of storytelling with data.',
        '2025-01-31',
        CURRENT_TIMESTAMP,
        'Data Storytelling',
        149.99,
        '2025-01-10',
        'https://www.example.com/data_storytelling.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Learn how to build and manage secure networks.',
        '2025-02-28',
        CURRENT_TIMESTAMP,
        'Cybersecurity Fundamentals',
        249.99,
        '2025-02-15',
        'https://www.example.com/cybersecurity_fundamentals.jpg'
    ),
    (
        NEXTVAL('course_entity_id_course_seq'),
        CURRENT_TIMESTAMP,
        'Master the art of project management with Agile methodologies.',
        '2025-03-31',
        CURRENT_TIMESTAMP,
        'Agile Project Management',
        199.99,
        '2025-03-01',
        'https://www.example.com/agile_project_management.jpg'
    );