db.createUser(
  {
    user: "cliente",
    pwd: "cliente",
    roles: [{ role: "read", db: "consultorio" }]
  }
)