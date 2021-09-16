const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Breed, Temperament } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      altura: el.height.metric,
      peso: el.weight.metric,
      anosVida: el.life_span,
      image: el.image.url,
      temperament: el.temperament,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      // mediante los atributos
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRazas = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let razasAll = await getAllRazas();
  if (name) {
    let raza = await razasAll.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    raza.length
      ? res.status(200).send(raza)
      : res.status(404).send("No esta la raza");
  } else {
    res.status(200).send(razasAll);
  }
});

router.get("/dogs/:id", async (req, res) => {
  const id = req.params.id;
  let razasAll = await getAllRazas();
  if (id) {
    let raza = await razasAll.filter(
      (el) => el.id.toString() === id.toString()
    );
    raza.length
      ? res.status(200).send(raza)
      : res.status(404).send("No existe el id ingresado");
  }
});

router.get("/temperament", async (req, res) => {
  const temApi = await axios.get("https://api.thedogapi.com/v1/breeds");
  const temperament = temApi.data.map((el) => el.temperament);
  const tempFil = temperament.filter((el) => el !== undefined);
  const tempArray = tempFil.map((el) => el.split(", "));
  const t = tempArray.flat();
  t.forEach((el) => {
    Temperament.findOrCreate({
      where: { name: el },
    });
  });
  const alltemp = await Temperament.findAll();
  res.send(alltemp);
});

router.post("/dogs", async (req, res) => {
  const { name, altura, peso, anosVida, temperamento, image, createdInDb } =
    req.body;
  let razacreada = await Breed.create({
    name,
    altura,
    peso,
    anosVida,
    image,
    createdInDb,
  });

  let temperamentoDb = await Temperament.findAll({
    where: { name: temperamento },
  });
  //add viene de sequelize
  razacreada.addTemperament(temperamentoDb);
  res.send("Raza creada con exito");
});
module.exports = router;
