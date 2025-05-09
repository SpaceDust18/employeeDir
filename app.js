import express from "express"
import employees from "./db/employees.js"

const app = express()


//It helps to write most specific route first and go in order of specificity to avoid errors durring the next error test. 

app.route('/employees/random').get((req, res) => {
    if (!employees || employees.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    const randomIndex = Math.floor(Math.random() * employees.length);
    const employee = employees[randomIndex];
   
    res.status(200).json(employee);
});

app.route('/employees/:id').get((req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id)

    if (employee) {
        res.status(200).json(employee)
    } else {
        res.status(404).json({ error: 'Employee not found' });
    }
});

app.route('/employees').get((req, res) => {
    res.send(employees)
})

app.route('/').get((req, res) => {
    res.send("Hello employees!")
})
 
export default app