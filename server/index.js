import dotenv from "dotenv";
import express from "express";
import pkg from 'pg';
const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'alam',
    database: 'HR',
    port: 5432
});

const port = process.env.PORT || 3002;
const app = express();
app.use(express.json());
app.listen(port, () => { console.log(`Server listening on port ${port}`) });
const index = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        status: 200,
        message: "Welcome to my web"
    })
}

// Regions

const getRegions = (req, res) => {
    pool.query('select * from regions', (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json(results.rows);
    })
}

const getRegion = (req, res) => {
    const { id } = req.params;
    pool.query('select * from regions where region_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json(results.rows);
    });
}

const insertRegion = (req, res) => {
    const { name } = req.body;
    pool.query('insert into regions (region_name) values ($1)', [name],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateRegion = (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    pool.query('update regions set region_name = $1 where region_id = $2', [name, id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const deleteRegion = (req, res) => {
    const { id } = req.params;
    pool.query(`delete from regions where region_id = ${id}`,
    [],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
}

// Countries
const getCountries = (req, res) => {
    pool.query('select * from countries', (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json(results.rows);
    })
}

const getCountry = (req, res) => {
    const { id } = req.params;
    pool.query('select * from countries where country_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json(results.rows);
    });
}

const insertCountry = (req, res) => {
    const { country_name, country_id, region_id } = req.body;
    pool.query('insert into countries (country_id, country_name, region_id) values ($1, $2, $3)', [country_id, country_name, region_id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateCountry = (req, res) => {
    const { id } = req.params;
    const { country_name, region_id } = req.body;
    pool.query('update countries set country_name = $1, region_id = $3 where country_id = $2', [country_name, id, region_id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const deleteCountry = (req, res) => {
    const { id } = req.params;
    pool.query(`delete from countries where country_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
}

// Locations
const getLocations = (req, res) => {
    pool.query('select * from locations', (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows});
    })
}

const getLocation = (req, res) => {
    const { id } = req.params;
    pool.query('select * from locations where location_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows[0]});
    });
}

const insertLocation = (req, res) => {
    const { location_id, street_address, postal_code, city, country_id, state_province } = req.body;
    pool.query('insert into locations (location_id, street_address, postal_code, city, country_id, state_province) values ($1, $2, $3, $4, $5, $6)', [location_id, street_address, postal_code, city, country_id, state_province],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateLocation = (req, res) => {
    const { id } = req.params;
    const { street_address, postal_code, city, country_id, state_province } = req.body;
    pool.query('update locations set street_address= $1, postal_code=$2, city=$3, country_id=$4, state_province=$5 where location_id = $6', [street_address, postal_code, city, country_id, state_province, id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const deleteLocation = (req, res) => {
    const { id } = req.params;
    pool.query(`delete from locations where location_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
}

// Departments
const getDepartments = (req, res) => {
    pool.query('select * from departments', (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows});
    })
}

const getDepartment = (req, res) => {
    const { id } = req.params;
    pool.query('select * from departments where department_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows[0]});
    });
}

const insertDepartment = (req, res) => {
    const { department_id, department_name, manager_id, location_id } = req.body;
    pool.query('insert into departments (department_id, department_name, manager_id, location_id) values ($1, $2, $3, $4)', [department_id, department_name, manager_id, location_id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateDepartment = (req, res) => {
    const { id } = req.params;
    const { department_name, manager_id, location_id } = req.body;
    pool.query('update departments set department_name=$1, manager_id=$2, location_id=$3 where department_id = $4', [department_name, manager_id, location_id, id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const deleteDepartment = (req, res) => {
    const { id } = req.params;
    pool.query(`delete from departments where department_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
}

// Jobs
const getJobs = (req, res) => {
    pool.query('select * from jobs', (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows});
    })
}

const getJob = (req, res) => {
    const { id } = req.params;
    pool.query('select * from jobs where job_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows[0]});
    });
}

const insertJob = (req, res) => {
    const { job_id, job_title, min_salary, max_salary } = req.body;
    pool.query('insert into jobs (job_id, job_title, min_salary, max_salary) values ($1, $2, $3, $4)', [job_id, job_title, min_salary, max_salary],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateJob = (req, res) => {
    const { id } = req.params;
    const { job_title, min_salary, max_salary } = req.body;
    pool.query('update jobs set job_title=$1, min_salary=$2, max_salary=$3 where job_id = $4', [job_title, min_salary, max_salary, id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const deleteJob = (req, res) => {
    const { id } = req.params;
    pool.query(`delete from jobs where job_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
}

// JobHistories
const getJobHistories = (req, res) => {
    pool.query('select * from job_history', (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows});
    })
}

const getJobHistory = (req, res) => {
    const { id } = req.params;
    pool.query('select * from job_history where employee_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows[0]});
    });
}

const insertJobHistory = (req, res) => {
    const { employee_id, start_date, end_date, job_id, department_id } = req.body;
    pool.query('insert into job_history (employee_id, start_date, end_date, job_id, department_id) values ($1, $2, $3, $4, $5)', [employee_id, start_date, end_date, job_id, department_id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateJobHistory = (req, res) => {
    const { id } = req.params;
    const { start_date, end_date, job_id, department_id } = req.body;
    pool.query('update job_history set start_date=$1, end_date=$2, job_id=$3, department_id=$4 where employee_id = $5', [start_date, end_date, job_id, department_id, id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const deleteJobHistory = (req, res) => {
    const { id } = req.params;
    pool.query(`delete from job_history where employee_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
}

// Employees
const getEmployees = (req, res) => {
    pool.query('select * from employees', (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows});
    })
}

const getEmployee = (req, res) => {
    const { id } = req.params;
    pool.query('select * from employees where employee_id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount == 0) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.status(200).json({data: results.rows[0]});
    });
}

const insertEmployee = (req, res) => {
    const { employee_id, first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id, xemp_id } = req.body;
    pool.query('insert into employees (employee_id, first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id, xemp_id) values ($1, $2, $3, $4, $5,  $6,  $7,  $8,  $9,  $10,  $11,  $12)', [employee_id, first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id, xemp_id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const updateEmployee = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id, xemp_id } = req.body;
    pool.query('update employees set first_name=$1, last_name=$2, email=$3, phone_number=$4, hire_date=$5, salary=$6, commission_pct=$7, job_id=$8, manager_id=$9, department_id=$10, xemp_id=$11 where employee_id = $12', [first_name, last_name, email, phone_number, hire_date, salary, commission_pct, job_id, manager_id, department_id, xemp_id, id],
        (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const deleteEmployee = (req, res) => {
    const { id } = req.params;
    pool.query(`delete from employees where employee_id = $1`,
    [id],
    (error,result) => {
        if (error) {
            throw error
        }
        res.json(result.rowCount)
    })
}


app.get('/', index);

app.get('/regions', getRegions);
app.get('/regions/:id', getRegion);
app.post('/regions', insertRegion);
app.put('/regions/:id', updateRegion);
app.delete('/regions/:id', deleteRegion);

app.get('/countries', getCountries);
app.get('/countries/:id', getCountry);
app.post('/countries', insertCountry);
app.put('/countries/:id', updateCountry);
app.delete('/countries/:id', deleteCountry);

app.get('/locations', getLocations);
app.get('/locations/:id', getLocation);
app.post('/locations', insertLocation);
app.put('/locations/:id', updateLocation);
app.delete('/locations/:id', deleteLocation);

app.get('/departments', getDepartments);
app.get('/departments/:id', getDepartment);
app.post('/departments', insertDepartment);
app.put('/departments/:id', updateDepartment);
app.delete('/departments/:id', deleteDepartment);

app.get('/jobs', getJobs);
app.get('/jobs/:id', getJob);
app.post('/jobs', insertJob);
app.put('/jobs/:id', updateJob);
app.delete('/jobs/:id', deleteJob);

app.get('/job_histories', getJobHistories);
app.get('/job_histories/:id', getJobHistory);
app.post('/job_histories', insertJobHistory);
app.put('/job_histories/:id', updateJobHistory);
app.delete('/job_histories/:id', deleteJobHistory);

app.get('/employees', getEmployees);
app.get('/employees/:id', getEmployee);
app.post('/employees', insertEmployee);
app.put('/employees/:id', updateEmployee);
app.delete('/employees/:id', deleteEmployee);
