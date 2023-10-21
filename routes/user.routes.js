const User = require("../models/User.model");
const router = require("express").Router();

router.get("/user/:id", (req, res) => {
    const { id } = req.params;

    User.findById(id)

      .then((oneUser) => {
        res.json(oneUser);
      })
      .catch((err) => {
        res.json(err);
      });
  });



router.put("/user/:id/edit", (req,res)=>{
    const userId = req.params.id;
    const updatedUserData = req.body; // Dados editados enviados do cliente

    User.findByIdAndUpdate(userId, updatedUserData, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        });
})



module.exports = router;