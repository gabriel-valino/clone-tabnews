function status(req, res) {
  res
    .status(200)
    .json({ chave: "alunos do curso.dev são pessoas acima da média!" });
}

export default status;
