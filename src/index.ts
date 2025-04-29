import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

interface Customer {
  cpf: string;
  name: string;
  id: string;
  statement: Statement[];
}

interface Statement {
  amount: number;
  created_at: Date;
  type: 'credit' | 'debit';
  description?: string;
}

const customers: Customer[] = [];

// Rota de exemplo - Criar conta
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
});

app.listen(3333, () => {
  console.log("Server is running on port 3333 🚀");
});