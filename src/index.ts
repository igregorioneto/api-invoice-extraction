import { createServer } from "./server";

const { app, port } = createServer();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});